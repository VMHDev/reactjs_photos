import { configureStore } from '@reduxjs/toolkit';
import photoReducer from 'redux/photoSlice';
import categoryReducer from 'redux/categorySlice';
import userReducer from 'redux/userSlice';
import userTokenReducer from 'redux/userTokenSlice';

const rootReducer = {
  photos: photoReducer,
  categories: categoryReducer,
  users: userReducer,
  user_tokens: userTokenReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
