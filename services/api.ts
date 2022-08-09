import axios from "axios";
import { Movie } from "../models/movie";
import { MovieDetail } from "../models/movieDetail";

export interface MovieDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface APIResponse<T> {
  movies?: T[];
  error?: string;
  movie?: MovieDetail;
}

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});
