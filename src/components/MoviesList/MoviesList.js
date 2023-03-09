import { Link, useLocation } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import css from './MoviesList.module.css';
import poster from '../images/cinemaPoster.jpg';

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

export const MoviesList = ({ movies }) => {
  const location = useLocation();
  return (
    <ul className={css.movieList}>
      {movies.map(movie => {
        return (
          <li key={movie.id}>
            <Link
              to={`/movies/${movie.id}`}
              state={{ from: location }}
              className={css.movieListLink}
            >
              <img
                src={
                  movie.poster_path
                    ? `${IMG_URL + movie.poster_path}`
                    : `${poster}`
                }
                alt={movie.title}
                className={css.listImg}
              />

              <div className={css.movieListTitle}>{movie.title}</div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.array.isRequired,
};
