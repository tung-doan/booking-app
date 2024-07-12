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

const User = require('./model/user.js');
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
            res.status(422).json('wrong password')
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

app.post('/logout', (req, res) => {
    res.cookie('token', '').json(true)
})

app.listen(4000)