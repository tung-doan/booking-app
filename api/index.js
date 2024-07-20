const express = require('express');
const app = express();
const cors = require('cors');
const { mongoose } = require('mongoose');
require('dotenv').config()
var bcrypt = require('bcryptjs');
var bcryptsalt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const jwtSecret = 'ohsdfoajdoifjaodjfaojfoad'
const cookieParser = require('cookie-parser')
const multer = require('multer')
const fs = require('fs')
const User = require('./model/user.js');
const Place = require('./model/place.js');
const Booking = require('./model/booking.js');
app.use(express.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGOURL)
const imagedownloader = require('image-downloader')
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(cookieParser())
app.use(express.json());
app.use(cors(
    {
        credentials: true,
        origin: 'http://localhost:5173'
    }
));

app.get('/test', (req, res) => {
    res.json('ok');
})
//DNIUCBSPgEx9Qgmf
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ $or: [{ name: name }, { email: email }] })

        if (existingUser) {
            if (existingUser.name === name) { return res.status(422).json('name already exists') }
            else if (existingUser.email === email) { return res.status(422).json('email already exists') }
            return res.status(422).json('user already exists')
        }
        else {
            const userdoc = await User.create({
                name,
                email,
                password: bcrypt.hashSync(password, bcryptsalt)
            })
            res.json(userdoc)
        }
    } catch (err) {
        res.status(422).json(err)
    }
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const UserDoc = await User.findOne({ email: email })
    if (UserDoc) {
        if (bcrypt.compareSync(password, UserDoc.password)) {
            jwt.sign({ email: UserDoc.email, id: UserDoc._id }, jwtSecret, {}, (err, token) => {
                res.cookie('token', token).json(UserDoc)
            })
        }
        else {
            res.status(422).json('incorrect email or password')
        }
    }

})

app.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, decoded) => {
            if (err) throw err;
            const { name, email, _id } = await User.findById(decoded.id)
            res.json({ name, email, _id })
        })
    }
    else {
        res.json(null)
    }

})

app.post('/upload-by-link', async (req, res) => {
    const { Link } = req.body;
    const newname = 'photo' + Date.now() + '.jpg';
    await imagedownloader.image({
        url: Link,
        dest: __dirname + '/uploads/' + newname
    })
    res.json(newname)
})

const multermiddleware = multer({ dest: 'uploads/' });
app.post('/upload', multermiddleware.array('Photos', 100), (req, res) => {
    const uploadedfiles = []
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
     
        const part = originalname.split('.');
        const tail = part[part.length - 1];
        const updatedpath = path + '.' + tail;
        fs.renameSync(path, updatedpath)
        uploadedfiles.push(updatedpath.replace('uploads\\', ''))
    }
    res.json(uploadedfiles)
})

app.post('/places', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, decoded) => {
            const { Title, Address, AddPhoto, Description, ExtraInfo, Perk, CheckIn, CheckOut, MaxGuests, price } = req.body;
            const userinfo = await Place.create({
                owner: decoded.id,
                title: Title,
                address: Address,
                photos: AddPhoto,
                description: Description,
                perks: Perk,
                extraInfo: ExtraInfo,
                checkIn: CheckIn,
                checkOut: CheckOut,
                maxGuests: MaxGuests,
                price: price
            })
            res.json(userinfo)
        })
    }
    else {
        res.status(422).json('not logged in')
    }
})

app.get('/user-places', async (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, decoded) => {
        res.json(await Place.find({ owner: decoded.id }))
    })
})

app.get('/places/:id', async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return;
    }
    res.json(await Place.findById(id))
})

app.put('/places', async (req, res) => {
    const { token } = req.cookies;
    const { id, Title, Address, AddPhoto, Description, ExtraInfo, Perk, CheckIn, CheckOut, MaxGuests, price } = req.body;
    const userinfo = await Place.findById(id);
    jwt.verify(token, jwtSecret, {}, async (err, decoded) => {
        if (decoded.id === userinfo.owner.toString()) {
            userinfo.set({
                title: Title,
                address: Address,
                photos: AddPhoto,
                description: Description,
                perks: Perk,
                extraInfo: ExtraInfo,
                checkIn: CheckIn,
                checkOut: CheckOut,
                maxGuests: MaxGuests,
                price: price
            })
            await userinfo.save();
            res.json(userinfo)
        }
        else {
            res.status(422).json('not authorized')
        }
    })
})

app.get('/places', async (req, res) => {
    const userdoc = await Place.find();
    if (userdoc) { res.json(await Place.find()) }
    else { res.json('no places') }
})

app.post('/booking', async (req, res) => {
    const { token } = req.cookies;
    let userid;
    jwt.verify(token, jwtSecret, {}, async (err, decoded) => {
        userid = decoded.id;
    })
    
    const { place, checkIn, checkOut, name, phone, price } = req.body;
    console.log(price)
    await Booking.create({
        place: place,
        checkIn: checkIn,
        checkOut: checkOut,
        name: name,
        phone: phone,
        price: price,
        user: userid
    }).then(data => {
        res.json(data)
    }).catch(err => {
        res.status(422).json(err)
    })
})

app.get('/bookings', async (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, decoded) => {
        if (err) throw err;
        res.json(await Booking.find({ user: decoded.id }).populate('place'))
    })
})

app.delete('/bookings/:id', async (req, res) => {
    const {id} = req.params;
    await Booking.findByIdAndDelete(id)
    res.json(await Booking.find().populate('place'))
})

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true)
})

app.listen(4000)