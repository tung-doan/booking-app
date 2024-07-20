const express = require('express');
const app = express();
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const imagedownloader = require('image-downloader');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.JWTSECRET;
const Place = require('../model/place.js');

const uploadDir = 'uploads/';

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


router.post('/upload-by-link', async (req, res) => {
    const { Link } = req.body;
    const newname = 'photo' + Date.now() + '.jpg';
    await imagedownloader.image({
        url: Link,
        dest: process.env.PHOTODEST + newname
    })
    res.json(newname)
})

const multermiddleware = multer({ dest: 'uploads/' });
router.post('/upload', multermiddleware.array('Photos', 100), (req, res) => {
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

router.post('/places', (req, res) => {
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

router.get('/user-places', async (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, decoded) => {
        res.json(await Place.find({ owner: decoded.id }))
    })
})

router.get('/places/:id', async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return;
    }
    res.json(await Place.findById(id))
})

router.put('/places', async (req, res) => {
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

router.get('/places', async (req, res) => {
    const userdoc = await Place.find();
    if (userdoc) { res.json(await Place.find()) }
    else { res.json('no places') }
})

module.exports = router;