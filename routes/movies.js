const router = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { validateCreateMovie, validateMovieId } = require('../middlewares/validations');

router.get('/', getMovies);

router.post('/', validateCreateMovie, createMovie);

router.delete('/:movieId', validateMovieId, deleteMovie);

module.exports = router;
