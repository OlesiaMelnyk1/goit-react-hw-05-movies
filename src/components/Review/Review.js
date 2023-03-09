import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from 'service/api';
import { Loader } from 'components/Loader/Loader';
import css from './Review.module.css';

const Reviews = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getMovieReviews = async () => {
      try {
        setIsLoading(true);
        const { results } = await fetchMovieReviews(id);
        setReviews(results);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieReviews(id);
  }, [id]);

  return (
    <>
      {isLoading && <Loader />}
      {error && <p>Sorry, an error occurred! Please try again later!</p>}
      <ul className={css.reviewContainer}>
        {reviews.map(({ author, content, id }) => {
          return (
            <li className={css.reviewList} key={id}>
              <p>{author}</p>
              <p className={css.reviewContent}>{content}</p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Reviews;
