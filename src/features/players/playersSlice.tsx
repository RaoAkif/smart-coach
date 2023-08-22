import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  players: [],
  isLoading: false,
  error: null,
};

const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    setPlayers: (state, action) => {
      state.players = action.payload; // Avoid this direct assignment
      // Instead, return a new state object with the updated players array:
      return {
        ...state,
        players: action.payload,
      };
    },
  },
});

export const { setPlayers } = playersSlice.actions;

export default playersSlice.reducer;
