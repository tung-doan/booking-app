const mongoose = require('mongoose');
const { Schema } = mongoose;

const PlaceSchema = new Schema({
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
    title: String,
    address: String,
    photos: [String],
    description: String,
    perks: [String],
    extraInfo: String,
    checkIn: String,
    checkOut: String,
    maxGuests: Number,
    price: Number
})

const placemodel = mongoose.model('Place', PlaceSchema);
module.exports = placemodel;