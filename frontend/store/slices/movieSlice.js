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
      state.list = Array.isArray(action.payload) ? action.payload : [];
    },
    addMovie(state, action) {
      state.list.unshift(action.payload);
    },
    setSelectedMovie(state, action) {
      state.selectedMovie = action.payload;
    }
  }
});

export const { setMovies, addMovie, setSelectedMovie } = movieSlice.actions;
export default movieSlice.reducer;
