import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { api, MovieDBResponse } from "../services/api";
import { Movie } from "../models/movie";
import { MovieCard } from "../components/MovieCard";
import { useRouter } from "next/router";

interface Props {
  latestMovies: Movie[];
}

const Home: NextPage<Props> = (props: Props) => {
  const router = useRouter();
  const { latestMovies } = props;

  return (
    <div>
      <Head>
        <title>Movie Library</title>
      </Head>
      <div className="mainContainer flex flex-col gap-4">
        <h1>Explore popular movies</h1>
        <div className="itemsContainer">
          {latestMovies.map((movie) => (
            <div
              className="cursor-pointer"
              onClick={() => router.push(`movie_detail/${movie.id}`)}
              key={movie.id}
            >
              <MovieCard movie={movie} />
            </div>
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
