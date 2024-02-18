const Book = require('../models/Book');

exports.create = (bookData) => Book.create(bookData);

exports.delete = (bookId) => Book.findByIdAndDelete(bookId);

exports.getAll = () => Book.find();

exports.getOne = (bookId) => Book.findById(bookId);

exports.read = (bookId, userId) => Book.findByIdAndUpdate(bookId, { $push: { wishingList: userId } });