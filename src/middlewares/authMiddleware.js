const jwt = require('../lib/jwt');
const ENV = require('../utils/constants');

const bookService = require('../services/bookService')

exports.auth = async (req, res, next) => {
    const token = req.cookies['auth'];

    if (!token) {
      return next();
    }

    try {
        const decodedToken = await jwt.verify(token, ENV.SECRET);
        req.user = decodedToken;
        res.locals.user = decodedToken;
        res.locals.isAuth = true;
        return next();

    } catch (error) {
        res.clearCookie('auth');
        res.redirect('/auth/login');
    }
}

exports.isAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/404');
    }

    next();
};

//CHANGE SERVICE, NAME AND ID
exports.isOwner = async (req, res, next) => {
    const book = await bookService.getOne(req.params.bookId);

    if (book.owner == req.user?._id) {
        return next();
    }

    return res.redirect('/404');
};

exports.isGuest = (req, res, next) => {
    if (req.user) {
        return res.redirect('/404')
    }

    return next();
};

exports.isRed = async(req,res,next) =>{
    const book = await bookService.getOne(req.params.bookId).populate('wishingList')

   const isRed = book.wishingList.some(x=> x._id == req.user?._id);

   if (isRed) {
         return res.redirect('/404')
   }

   return next();
}