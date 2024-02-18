const Book = require('../models/Book');

exports.create = (bookData) => Book.create(bookData);

exports.edit = (bookId, bookData) => Book.findByIdAndUpdate(bookId, bookData, { runValidators: true });

exports.delete = (bookId) => Book.findByIdAndDelete(bookId);

exports.getAll = () => Book.find();

exports.getOne = (bookId) => Book.findById(bookId);

exports.read = (bookId, userId) => Book.findByIdAndUpdate(bookId, { $push: { wishingList: userId } });