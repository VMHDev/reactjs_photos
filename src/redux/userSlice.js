import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { addToLocalStorageArray } from 'utils/helper';

const initUsers = () => {
  const users = localStorage.getItem('users');
  if (users) {
    return JSON.parse(users);
  } else {
    const usersInit = [
      {
        id: uuidv4(),
        name: 'admin',
        email: 'admin@admin.com',
        password: 'MTIzNDU2',
      },
    ];
    localStorage.setItem('users', JSON.stringify(usersInit));
    return usersInit;
  }
};

const initialState = initUsers();

const user = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
      addToLocalStorageArray('users', action.payload);
    },
  },
});

const { reducer, actions } = user;
export const { addUser } = actions;
export default reducer;
