import { useEffect, useState } from 'react';
import { useParams, useLocation, Link, Outlet } from 'react-router-dom';
import { fetchMovieDetails } from 'service/api';
import { MovieDetails } from 'components/MovieItem/MovieItem';
import { Loader } from 'components/Loader/Loader';
import css from './MovieDetails.module.css';

function MovieDetailsPage() {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const location = useLocation();
  const { id } = useParams();

  useEffect(() => {
    const getMovieById = async () => {
      try {
        setIsLoading(true);
        const movie = await fetchMovieDetails(id);
        setMovie(movie);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieById(id);
  }, [id]);

  return (
    <section>
      {isLoading && <Loader />}
      {error && <p>Sorry, an error occurred! Please try again later!</p>}
      <>
        <div className={css.backButton}>
          <Link
            className={css.backButtonLink}
            to={location?.state?.from ?? '/'}
          >
            Go back
          </Link>
        </div>
        <MovieDetails
          posterPath={movie.poster_path}
          title={movie.original_title}
          voteAverage={movie.vote_average}
          overview={movie.overview}
          genres={movie.genres}
        />
        <div>
          <h3 className={css.additionalInfo}>Additional information</h3>
          <ul className={css.listLinkReview}>
            <li>
              <Link
                className={css.linkReview}
                to="cast"
                state={{ from: location?.state?.from ?? '/' }}
              >
                Cast
              </Link>
            </li>
            <li>
              <Link
                className={css.linkReview}
                to="reviews"
                state={{ from: location?.state?.from ?? '/' }}
              >
                Reviews
              </Link>
            </li>
          </ul>
          <Outlet />
        </div>
      </>
    </section>
  );
}

export default MovieDetailsPage;
