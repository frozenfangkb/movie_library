import React from "react";
import { GetServerSideProps } from "next";
import { api } from "../services/api";
import { Genre, GenreResponse } from "../models/genre";
import { GenreCard } from "../components/GenreCard";

interface Props {
  genres: Genre[];
}

const Categories: React.FC<Props> = (props: Props) => {
  const { genres } = props;

  return (
    <div className="mainContainer flex flex-col gap-4">
      <h1>Explore categories</h1>
      <div className="gridContainer">
        {genres.map((genre) => (
          <GenreCard genre={genre} key={genre.id} />
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { API_KEY } = process.env;

  const genres = await api.get<GenreResponse>(
    `genre/movie/list?api_key=${API_KEY}&language=en-US&page=1`
  );
  console.log(genres.data.genres);
  return {
    props: {
      genres: genres.data.genres,
    },
  };
};

export default Categories;
