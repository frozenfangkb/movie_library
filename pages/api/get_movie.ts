// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { api } from "../../services/api";
import { MovieDetail } from "../../models/movieDetail";

type Data = {
  error?: string;
  movie?: MovieDetail;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const id = req.query.id;

  if (!id) {
    res.status(400).send({ error: "Bad request" });
  }

  const { API_KEY } = process.env;

  const movies = await api.get<MovieDetail>(
    `/movie/${id}?api_key=${API_KEY}&language=en-US`
  );

  res.json({ movie: movies.data });
}
