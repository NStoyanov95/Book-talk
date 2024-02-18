const router = require('express').Router();

const bookService = require('../services/bookService');

const { getErrorMessage } = require('../utils/errorUtils');

const { isAuth, isGuest, isOwner } = require('../middlewares/authMiddleware')

router.get('/create', isAuth,(req, res) => {
    res.render('books/create');
});

router.post('/create',isAuth, async (req, res) => {
    const bookData = req.body;
    bookData.owner = req.user._id;
    try {
        await bookService.create(bookData);
        res.redirect('/books/catalog');
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
});

router.get('/:bookId/details', async (req, res) => {
    try {
        const book = await bookService.getOne(req.params.bookId).lean().populate('wishingList');
        const isUser = req.user;
        const isOwner = book.owner == req.user?._id;
        const isInWishList = book.wishingList.some(x => x._id == req.user?._id);
        res.render('books/details', { book, isUser, isOwner, isInWishList });
    } catch (error) {
        res.redirect('/404');
    }
});

router.get('/:bookId/read',isAuth, async (req, res) => {
    try {
        await bookService.read(req.params.bookId, req.user._id);
        res.redirect(`/books/${req.params.bookId}/details`);
    } catch (error) {
        res.redirect('/404');
    }
});

router.get('/:bookId/delete',isAuth, isOwner, async (req, res) => {
    try {
        await bookService.delete(req.params.bookId);
        res.redirect('/books/catalog');
    } catch (error) {
        res.redirect('/404');
    }
});

router.get('/:bookId/edit',isAuth, isOwner, async (req, res) => {
    try {
        const book = await bookService.getOne(req.params.bookId).lean();
        res.render('books/edit', { book });
    } catch (error) {

    }
});

router.post('/:bookId/edit',isAuth,isOwner, async (req, res) => {
    const book = req.body

    try {
        await bookService.edit(req.params.bookId, book);
        res.redirect(`/books/${req.params.bookId}/details`);
    } catch (error) {
        res.render('books/edit', { error: getErrorMessage(error), book })
    }
})

module.exports = router;