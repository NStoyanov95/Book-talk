const router = require('express').Router();

const userService = require('../services/userService');
const bookService = require('../services/bookService');

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/404', (req, res) => {
    res.render('404')
});

router.get('/:userId/profile', async (req, res) => {
    const user = await userService.getOne(req.params.userId).lean();
    const whishList = await bookService.getWishList(req.params.userId).lean();
    res.render('profile', { user, whishList });
})

module.exports = router;