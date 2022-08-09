import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { selectMovies } from "../../store/slices/movieSlice";
import { MovieDetail } from "../../models/movieDetail";
import { NextPage } from "next";
import axios from "axios";
import { APIResponse } from "../../services/api";
import { Loading } from "../../components/Loading";

interface Props {
  id: string;
}

const MovieDetail: NextPage<Props> = (props: Props) => {
  const { id } = props;
  const movies = useAppSelector(selectMovies);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetail>(
    {} as MovieDetail
  );

  const getMovie = async (): Promise<void> => {
    if (id && id !== "") {
      const mov = await axios.get<APIResponse<MovieDetail>>(
        `/api/get_movie?id=${id}`
      );
      if (mov.data.movie) {
        setSelectedMovie(mov.data.movie);
      }
    }
  };

  useEffect(() => {
    getMovie();
  }, []);

  if (Object.keys(selectedMovie).length === 0) {
    return <Loading />;
  }

  return (
    <div className="fullContainer">
      <div className="grid grid-cols-12 gap-4 w-full h-full">
        <div className="relative bg-transparent col-span-4 flex items-center justify-center">
          <img
            className="poster"
            src={`https://image.tmdb.org/t/p/original${selectedMovie.poster_path}`}
            alt={selectedMovie.overview}
          />
        </div>
        <div className="flex flex-col gap-4 py-4 px-8 shadow-2xl col-span-8 bg-white">
          <div className="flex items-center justify-center">
            <h1>{selectedMovie.title}</h1>
          </div>
          <span className="flex flex-col gap-2">
            <b>Description:</b> <span>{selectedMovie.overview}</span>
          </span>
          <span>
            <b>Homepage: </b>
            <a href={selectedMovie.homepage} target="_blank" rel="noreferrer">
              {selectedMovie.homepage}
            </a>
          </span>
          <span>
            <b>Produced by: </b>
            {selectedMovie.production_companies.map((x) => x.name).join(", ")}
          </span>
          <span>
            <b>Produced in: </b>
            {selectedMovie.production_countries.map((x) => x.name).join(", ")}
          </span>
          <span>
            <b>Release date: </b>
            {selectedMovie.release_date}
          </span>
          <span>
            <b>Status: </b>
            {selectedMovie.status}
          </span>
          <span>
            <b>Revenue: </b>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(selectedMovie.revenue)}
          </span>
        </div>
      </div>
    </div>
  );
};

MovieDetail.getInitialProps = async (context): Promise<Props> => {
  return {
    id: context.query.id as string,
  };
};

export default MovieDetail;
