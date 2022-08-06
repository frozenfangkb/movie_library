import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { selectMovies } from "../../store/slices/movieSlice";
import { Movie } from "../../models/movie";

const MovieDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const movies = useAppSelector(selectMovies);
  const [selectedMovie, setSelectedMovie] = useState<Movie>({} as Movie);

  useEffect(() => {
    if (id && id !== "" && !isNaN(+id)) {
      const movie = movies.find((x) => x.id === +id);
      if (movie) {
        setSelectedMovie(movie);
      } else {
        // TODO: Call API and retrieve movie by id
      }
    }
  }, [id, movies]);

  return <div>ID is {id}</div>;
};

export default MovieDetail;
