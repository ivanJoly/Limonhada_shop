const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BagSchema = Schema({
    name: String,
    slug: String,
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
        enum: ['Tote', 'Beach'],
        description: "can only be one of the enum values and is required"
    }
})

module.exports = mongoose.model('Bag', BagSchema);