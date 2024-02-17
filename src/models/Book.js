const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    bookReview: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true
    },
    stars: {
        type: Number,
        min: [1, 'Number should be between 1 and 5'],
        max: [5, 'Number should be between 1 and 5'],
        required: true,
    },
    wishingList: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;