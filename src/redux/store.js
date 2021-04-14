import { configureStore } from '@reduxjs/toolkit';
import photoReducer from 'redux/photoSlice';
import categoryReducer from 'redux/categorySlice';

const rootReducer = {
  photos: photoReducer,
  categories: categoryReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
