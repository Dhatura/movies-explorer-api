const router = require('express').Router();

const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateSignin, validateSignup } = require('../middlewares/validations');
const NotFoundError = require('../errors/NotFoundError(404)');

const usersRoutes = require('./users');
const moviesRoutes = require('./movies');

router.post('/signup', validateSignup, createUser);
router.post('/signin', validateSignin, login);

router.use('/users', auth, usersRoutes);
router.use('/movies', auth, moviesRoutes);

router.use('/*', () => {
  throw new NotFoundError('Cтраница не найдена');
});

module.exports = router;
