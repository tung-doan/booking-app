const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookingSchema = new Schema({
    place: {type: Schema.Types.ObjectId, ref: 'Place', required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    checkIn: {type: Date, required: true},
    checkOut: {type: Date, required: true},
    name: {type: String, required: true},
    phone: {type: String, required: true},
    price: {type: Number, required: true},  
})

const bookingmodel = mongoose.model('Booking', BookingSchema);
module.exports = bookingmodel;