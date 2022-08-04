import React from "react";
import { Movie } from "../../models/movie";
import styles from "./MovieCard.module.css";

interface Props {
  movie: Movie;
}

export const MovieCard: React.FC<Props> = (props: Props) => {
  const { movie } = props;

  return (
    <div className={styles.card}>
      <span className={styles.title}>{movie.title}</span>
      <img
        className={styles.poster}
        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
        alt={movie.overview}
      />
      <div className={styles.gradient} />
    </div>
  );
};
