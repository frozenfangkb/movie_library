import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { api, MovieDBResponse } from "../services/api";
import { Movie } from "../models/movie";
import { MovieCard } from "../components/MovieCard";

interface Props {
  latestMovies: Movie[];
}

const Home: NextPage<Props> = (props: Props) => {
  const { latestMovies } = props;

  return (
    <div>
      <Head>
        <title>Movie Library</title>
      </Head>
      <div className="mainContainer flex flex-col gap-4">
        <h1>Explore popular movies</h1>
        <div className="w-full bg-white shadow-2xl rounded-md py-4 px-8 flex gap-4 overflow-x-scroll">
          {latestMovies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { API_KEY } = process.env;

  const latestMovies = await api.get<MovieDBResponse<Movie>>(
    `movie/popular?api_key=${API_KEY}&language=en-US&page=1`
  );

  return {
    props: {
      latestMovies: latestMovies.data.results,
    },
  };
};

export default Home;
