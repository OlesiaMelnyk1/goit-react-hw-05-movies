import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from 'service/api';
import { MoviesList } from 'components/MoviesList/MoviesList';
import { Loader } from 'components/Loader/Loader';
import css from './MovieDetails.module.css';

function Home() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const getMovies = async () => {
      setIsLoading(true);
      try {
        setIsLoading(true);
        const {
          data: { results: movies },
        } = await fetchTrendingMovies();
        setMovies(movies);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getMovies();
  }, []);

  return (
    <section>
      <h2 className={css.trending}>Trending...</h2>
      {isLoading && <Loader />}
      {error && <p>Sorry, an error occurred! Please try again later!</p>}
      <MoviesList movies={movies}></MoviesList>
    </section>
  );
}

export default Home;
