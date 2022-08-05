import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { api, APIResponse } from "../services/api";
import { Genre, GenreResponse } from "../models/genre";
import { GenreCard } from "../components/GenreCard";
import { Movie } from "../models/movie";
import axios from "axios";
import { MovieCard } from "../components/MovieCard";

interface Props {
  genres: Genre[];
}

const Categories: React.FC<Props> = (props: Props) => {
  const { genres } = props;
  const [selectedGenre, setSelectedGenre] = useState<Genre>({} as Genre);
  const [movies, setMovies] = useState<Movie[]>([]);

  const searchMoviesByGenre = async (genre: Genre) => {
    if (genre.id !== selectedGenre.id) {
      const moviesResponse = await axios.get<APIResponse<Movie>>(
        `/api/search_movie_by_genre?genre=${genre.id}`
      );
      setSelectedGenre(genre);
      setMovies(moviesResponse.data.movies ?? []);
    }
  };

  return (
    <div className="mainContainer flex flex-col gap-4">
      <h1>Explore genres </h1>
      <div className="gridContainer">
        {genres.map((genre) => (
          <div onClick={() => searchMoviesByGenre(genre)} key={genre.id}>
            <GenreCard genre={genre} />
          </div>
        ))}
      </div>
      {movies.length > 0 && (
        <>
          <h1>Movies with genre {selectedGenre.name}</h1>
          <div className="gridContainer">
            {movies.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { API_KEY } = process.env;

  const genres = await api.get<GenreResponse>(
    `genre/movie/list?api_key=${API_KEY}&language=en-US&page=1`
  );

  return {
    props: {
      genres: genres.data.genres,
    },
  };
};

export default Categories;
