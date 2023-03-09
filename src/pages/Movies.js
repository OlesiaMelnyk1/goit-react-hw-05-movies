import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchMovieByQuery } from 'service/api';
import { MovieSearch } from 'components/Searchbar/Searchbar';
import { MoviesList } from 'components/MoviesList/MoviesList';
import { Loader } from 'components/Loader/Loader';

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const query = searchParams.get('query');
    if (!query) return;
    const getMovieByQuery = async () => {
      try {
        setIsLoading(true);
        const { results } = await fetchMovieByQuery(query);
        setMovies(results);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieByQuery();
  }, [searchParams]);

  const handleSubmit = query => {
    setSearchParams({ query });
  };

  return (
    <section>
      <MovieSearch onSubmit={handleSubmit} />
      {isLoading && <Loader />}
      {error && <p>Sorry, an error occurred! Please try again later!</p>}
      {movies.length > 0 && <MoviesList movies={movies} />}
    </section>
  );
}

export default MoviesPage;
