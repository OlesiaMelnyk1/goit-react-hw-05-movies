import { PropTypes } from 'prop-types';
import css from './MovieItem.module.css';

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

export const MovieDetails = ({
  title,
  posterPath,
  overview,
  voteAverage,
  genres = [],
}) => {
  const allGenres = genres.map(genre => genre.name).join(', ');

  return (
    <div className={css.aboutMovieWrap}>
      <div className={css.pictureWrap}>
        {posterPath && <img src={`${IMG_URL + posterPath}`} alt={title} />}
      </div>
      <div className={css.movieAbout}>
        <h2 className={css.movieTitle}>{title}</h2>
        <p className={css.movieScore}>
          User score: {Math.round(voteAverage * 10)}%
        </p>
        <h3>Overview</h3>
        <p className={css.movieDescription}>{overview}</p>
        <h3>Genres</h3>
        <p className={css.movieDescription}>{allGenres}</p>
      </div>
    </div>
  );
};

MovieDetails.propTypes = {
  title: PropTypes.string,
  posterPath: PropTypes.string,
  overview: PropTypes.string,
  voteAverage: PropTypes.number,
  genres: PropTypes.arrayOf(PropTypes.any),
};
