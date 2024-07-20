const express = require('express');
const app = express();
const router = express.Router();
require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWTSECRET;
const Booking = require('../model/booking.js');

router.post('/booking', async (req, res) => {
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

router.get('/bookings', async (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, decoded) => {
        if (err) throw err;
        res.json(await Booking.find({ user: decoded.id }).populate('place'))
    })
})

router.delete('/bookings/:id', async (req, res) => {
    const {id} = req.params;
    await Booking.findByIdAndDelete(id)
    res.json(await Booking.find().populate('place'))
})

module.exports = router;