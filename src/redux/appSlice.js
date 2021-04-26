import { createSlice } from '@reduxjs/toolkit';

const app = createSlice({
  name: 'app',
  initialState: {
    modalOk: {},
  },
  reducers: {
    showModalOk(state, action) {
      state.modalOk = action.payload;
    },
  },
});

const { reducer, actions } = app;
export const { showModalOk } = actions;
export default reducer;
