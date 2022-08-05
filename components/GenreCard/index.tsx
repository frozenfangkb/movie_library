import React from "react";
import { Genre } from "../../models/genre";
import styles from "./GenreCard.module.css";

interface Props {
  genre: Genre;
}

export const GenreCard: React.FC<Props> = (props: Props) => {
  const { genre } = props;

  return (
    <div className={styles.card} key={genre.id}>
      {genre.name}
    </div>
  );
};
