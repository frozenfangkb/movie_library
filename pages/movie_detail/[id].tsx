import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { selectMovies } from "../../store/slices/movieSlice";
import { MovieDetail } from "../../models/movieDetail";
import { NextPage } from "next";
import axios from "axios";

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
      const mov = await axios.get<MovieDetail>(`/api/get_movie?id=${id}`);
      setSelectedMovie(mov.data);
    }
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div>
      <code>
        <pre>{JSON.stringify(selectedMovie, null, 2)}</pre>
      </code>
    </div>
  );
};

MovieDetail.getInitialProps = async (context): Promise<Props> => {
  return {
    id: context.query.id as string,
  };
};

export default MovieDetail;
