import { Movie } from "../../models/movie";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";

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

export const { setMovies } = movieSlice.actions;

export const selectMovies = (state: RootState) => state.movies.movies;

export default movieSlice.reducer;
