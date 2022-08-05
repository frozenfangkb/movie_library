// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Movie } from "../../models/movie";
import { api, MovieDBResponse } from "../../services/api";

type Data = {
  error?: string;
  movies?: Movie[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const query = req.query.genre;

  if (!query) {
    res.status(400).send({ error: "Bad request" });
  }

  const { API_KEY } = process.env;

  const movies = await api.get<MovieDBResponse<Movie>>(
    `/discover/movie?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&with_genres=${query}`
  );

  res.json({ movies: movies.data.results });
}
