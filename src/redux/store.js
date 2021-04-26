import { configureStore } from '@reduxjs/toolkit';
import appReducer from 'redux/appSlice';
import photoReducer from 'redux/photoSlice';
import categoryReducer from 'redux/categorySlice';
import userReducer from 'redux/userSlice';
import userTokenReducer from 'redux/userTokenSlice';

const rootReducer = {
  app: appReducer,
  photos: photoReducer,
  categories: categoryReducer,
  users: userReducer,
  user_tokens: userTokenReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
