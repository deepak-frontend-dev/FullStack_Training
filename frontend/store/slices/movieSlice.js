import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  selectedMovie: null
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies(state, action) {
      state.list = action.payload;
    },
    addMovie(state, action) {
      state.list.push(action.payload);
    },
    setSelectedMovie(state, action) {
      state.selectedMovie = action.payload;
    }
  }
});

export const { setMovies, addMovie, setSelectedMovie } = movieSlice.actions;
export default movieSlice.reducer;
