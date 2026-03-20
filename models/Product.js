const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'PRoduct name required']
    },
    description: {
        type: String,
        required: [true, 'product description required']
    },
    price: {
        type: Number,
        required: [true, 'price required'],
        
    }
})