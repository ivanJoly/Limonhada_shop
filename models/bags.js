const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BagSchema = Schema({
    name: String,
    slug: {
        type: String,
        unique: true,
        dropDups: true
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
        enum: ['Tote', 'Beach'],
        description: "can only be one of the enum values and is required"
    }
})

const Bag = mongoose.model('Bag', BagSchema);

Bag.createIndexes();

module.exports = Bag;