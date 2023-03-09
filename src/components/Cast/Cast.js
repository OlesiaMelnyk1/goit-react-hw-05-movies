import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieActors } from 'service/api';
import PropTypes from 'prop-types';
import { Loader } from 'components/Loader/Loader';
import css from './Cast.module.css';

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const Cast = () => {
  const [actors, setActors] = useState([]);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const getMovieActors = async () => {
      try {
        setIsLoading(true);
        const { cast } = await fetchMovieActors(id);
        setActors(cast);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieActors(id);
  }, [id]);

  return (
    <>
      {isLoading && <Loader />}
      {error && <p>Sorry, an error occurred! Please try again later!</p>}
      <ul className={css.castList}>
        {isLoading && <Loader />}
        {error && <p>Sorry, an error occurred! Please try again later!</p>}
        {actors.length > 0 &&
          actors.map(cast => {
            const { profile_path, name, character, id } = cast;
            return (
              <li key={id} className={css.castContainer}>
                {Boolean(profile_path) && (
                  <img
                    className={css.castImg}
                    src={`${IMG_URL + profile_path}`}
                    alt={name}
                  />
                )}
                <h4 className={css.castName}>{name}</h4>
                <p className={css.castCharacter}>Character: {character}</p>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default Cast;

Cast.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  actors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      profile_path: PropTypes.string.isRequired,
      character: PropTypes.string.isRequired,
    })
  ),
};
