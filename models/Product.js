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
        validate: {
            validator: function(value) {
                return value > 0;
            },
            message: 'price must be greater than 0'
        }
    },
    category: {
        type: String, 
        required: [true, 'product category required']
    },
    inStock: {
        type: Boolean,
        default: trusted
    },
    tags: {
        type: Boolean,
        default: true
    },
    tags: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}); 

const Product = mongoose.model('Product', productSchema);

module.exports = Product;