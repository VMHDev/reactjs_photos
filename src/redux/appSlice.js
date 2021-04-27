import { createSlice } from '@reduxjs/toolkit';

const app = createSlice({
  name: 'app',
  initialState: {
    isShowLoading: false,
    modalOk: {},
  },
  reducers: {
    showLoading(state, action) {
      state.isShowLoading = action.payload;
    },
    showModalOk(state, action) {
      state.modalOk = action.payload;
    },
  },
});

const { reducer, actions } = app;
export const { showLoading, showModalOk } = actions;
export default reducer;
