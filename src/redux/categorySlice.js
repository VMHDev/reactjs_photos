import { createSlice } from '@reduxjs/toolkit';
import { addToLocalStorageArray } from "utils/helper";

const initCategories = () => {
  const categories = localStorage.getItem('categories');
  if (categories) {
    return JSON.parse(categories);
  } else {
    const categoriesInit = [
      {
        id: 1,
        name: 'Technology',
      },
      {
        id: 2,
        name: 'Education',
      },
      {
        id: 3,
        name: 'Nature',
      },
      {
        id: 4,
        name: 'Animals',
      },
      {
        id: 5,
        name: 'Styles',
      },
      {
        id: 6,
        name: 'Others',
      }
    ];
    localStorage.setItem('categories', JSON.stringify(categoriesInit));
    return categoriesInit;
  }
};

const initialState = initCategories();

const photo = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.push(action.payload);
      addToLocalStorageArray('categories', action.payload);
    },
    removeCategory: (state, action) => {
      console.log('removeCategory', state, action);
    },
    updateCategory: (state, action) => {
      console.log('updateCategory', state, action);
    },
  },
});

const { reducer, actions } = photo;
export const { addCategory, removeCategory, updateCategory } = actions;
export default reducer;
