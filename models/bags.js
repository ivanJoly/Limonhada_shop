const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BagSchema = Schema({
    name: String,
    slug: {
        type: String
    },
    image_profile:{
        type: Object
    },
    images: {
        type: Array
    },
    price: Number,
    description: String,
    size:{
        type: Object
    },
    model:{
        type: [String],
        enum: ['tote', 'beach'],
        description: "can only be one of the enum values and is required"
    },
    available: {
        type: Boolean,
        default: true
    },
    stars: Number,
    facts: Array
})

const Bag = mongoose.model('Bag', BagSchema);

Bag.createIndexes();

module.exports = Bag;