import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { api, APIResponse } from "../services/api";
import { Genre, GenreResponse } from "../models/genre";
import { GenreCard } from "../components/GenreCard";
import { Movie } from "../models/movie";
import axios from "axios";
import { MovieCard } from "../components/MovieCard";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectMovies, setMovies } from "../store/slices/movieSlice";
import { useRouter } from "next/router";

interface Props {
  genres: Genre[];
}

const Genres: React.FC<Props> = (props: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const movies = useAppSelector(selectMovies);
  const { genres } = props;
  const [selectedGenre, setSelectedGenre] = useState<Genre>({} as Genre);
  const [movieList, setMovieList] = useState<Movie[]>([]);

  const searchMoviesByGenre = async (genre: Genre) => {
    if (genre.id !== selectedGenre.id) {
      const moviesResponse = await axios.get<APIResponse<Movie>>(
        `/api/search_movie_by_genre?genre=${genre.id}`
      );
      setSelectedGenre(genre);
      dispatch(setMovies(moviesResponse.data.movies ?? []));
      setMovieList(moviesResponse.data.movies ?? []);
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
      {movieList.length > 0 && (
        <>
          <h1>Movies with genre {selectedGenre.name}</h1>
          <div className="gridContainer">
            {movieList.map((movie) => (
              <div
                onClick={() => router.push(`movie_detail/${movie.id}`)}
                key={movie.id}
                className="cursor-pointer"
              >
                <MovieCard movie={movie} />
              </div>
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

export default Genres;
