import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const initCookies = () => ({
  login: cookies.get('login') ? cookies.get('login') : null,
});
const initialState = initCookies();

const user_cookies = createSlice({
  name: 'cookies',
  initialState,
  reducers: {
    addLogin: (state, action) => {
      state.login = action.payload;
      // Update cookie
      cookies.set('login', JSON.stringify(action.payload), {
        path: '/',
        maxAge: 3600,
      });
    },
    removeLogin: (state, action) => {
      state.login = action.payload;
      // Update cookie
      cookies.remove('login', { path: '/' });
    },
  },
});

const { reducer, actions } = user_cookies;
export const { addLogin, removeLogin } = actions;
export default reducer;
