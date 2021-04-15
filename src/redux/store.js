import { configureStore } from '@reduxjs/toolkit';
import photoReducer from 'redux/photoSlice';
import categoryReducer from 'redux/categorySlice';
import userReducer from 'redux/userSlice';

const rootReducer = {
  photos: photoReducer,
  categories: categoryReducer,
  user: userReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
