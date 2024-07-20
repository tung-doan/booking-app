const express = require('express');
const app = express();
const router = express.Router();
const User = require('../model/user');
var bcrypt = require('bcryptjs');
var bcryptsalt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.JWTSECRET;


router.post('/register', async (req, res) => {
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


router.post('/login', async (req, res) => {
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

router.get('/profile', (req, res) => {
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


router.post('/logout', (req, res) => {
    res.cookie('token', '').json(true)
})

module.exports = router;