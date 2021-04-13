import { createSlice } from '@reduxjs/toolkit';

const InitCategories = () => {
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

const initialState = InitCategories();

const photo = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action) => {
      console.log('addCategory', state, action);
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
