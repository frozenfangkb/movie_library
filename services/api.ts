import axios from "axios";

export interface MovieDBResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});
