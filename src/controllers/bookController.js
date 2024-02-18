const router = require('express').Router();

const bookService = require('../services/bookService');

const { getErrorMessage } = require('../utils/errorUtils')

router.get('/create', (req, res) => {
    res.render('books/create');
});

router.post('/create', async (req, res) => {
    const bookData = req.body;
    bookData.owner = req.user._id;
    try {
        await bookService.create(bookData);
        res.redirect('books/catalog');
    } catch (error) {
        res.render('books/create', { error: getErrorMessage(error), ...bookData });
    }
});

router.get('/catalog', async (req, res) => {
    try {
        const books = await bookService.getAll().lean();
        res.render('books/catalog', { books });
    } catch (error) {
        res.redirect('/404');
    }
})


module.exports = router;