import { Movie } from "../../models/movie";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MovieState {
  movies: Movie[];
}

const initialState: MovieState = { movies: [] };

export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action: PayloadAction<Movie[]>) => {
      state.movies = action.payload;
    },
  },
});
