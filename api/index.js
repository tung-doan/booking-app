const express = require('express');
const app = express();
const cors = require('cors');
const { mongoose } = require('mongoose');
require('dotenv').config()
const cookieParser = require('cookie-parser')

app.use(express.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGOURL)

const UserRoute = require('./Routers/UserRoute.js');
const PlaceRoute = require('./Routers/PlaceRoute.js');
const BookingRoute = require('./Routers/BookingRoute.js');
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(cookieParser())
app.use(express.json());
app.use(cors(
    {
        credentials: true,
        origin: process.env.CLIENTURL
    }
));

app.get('/test', (req, res) => {
    res.json('ok');
})

app.use(UserRoute);
app.use(PlaceRoute);
app.use(BookingRoute);

app.listen(4000)