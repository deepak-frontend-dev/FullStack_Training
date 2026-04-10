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
    appendMovies(state, action) {
      const newMovies = Array.isArray(action.payload) ? action.payload : [];
      // To avoid duplicates if the same movie is fetched again
      const existingIds = new Set(state.list.map(m => m.id));
      const uniqueNewMovies = newMovies.filter(m => !existingIds.has(m.id));
      state.list = [...state.list, ...uniqueNewMovies];
    },
    setSelectedMovie(state, action) {
      state.selectedMovie = action.payload;
    }
  }
});

export const { setMovies, addMovie, appendMovies, setSelectedMovie } = movieSlice.actions;
export default movieSlice.reducer;
