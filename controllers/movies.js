const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError(400)');
const ForbiddenError = require('../errors/ForbiddenError(403)');
const NotFoundError = require('../errors/NotFoundError(404)');
const ServerError = require('../errors/InternalServerError(500)');

const {
  SUCCESS_OK,
} = require('../errors/errorStatus');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .orFail(new Error('NotFound'))
    .then((movies) => res.status(SUCCESS_OK).send(movies))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Переданы некорректные данные');
      }
      throw new ServerError('На сервере произошла ошибка');
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.status(SUCCESS_OK).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные при создании карточки с фильмом');
      }
      throw new ServerError('На сервере произошла ошибка');
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new Error('NotFound'))
    .then((movie) => {
      if (movie.owner._id.toString() === req.user._id) {
        Movie.findByIdAndRemove(req.params.movieId)
          .then(() => res.status(SUCCESS_OK).send({ message: 'Фильм успешно удален' }));
      } else {
        throw new Error('AccessError');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Переданы некорректные данные при удалении карточки с фильмом');
      }
      if (err.message === 'NotFound') {
        throw new NotFoundError('Фильм с указанным _id не найден');
      }
      if (err.message === 'AccessError') {
        throw new ForbiddenError('Вы пытаетесь удалить чужой фильм');
      }
      throw new ServerError('На сервере произошла ошибка');
    })
    .catch(next);
};
