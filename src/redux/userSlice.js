import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initUsers = () => {
  const users = localStorage.getItem('users');
  if (users) {
    return JSON.parse(users);
  } else {
    const usersInit = {
      login: '',
      data: [
        {
          id: uuidv4(),
          name: 'admin',
          email: 'admin@admin.com',
          password: 'MTIzNDU2',
        },
      ],
    };
    localStorage.setItem('users', JSON.stringify(usersInit));
    return usersInit;
  }
};

const initialState = initUsers();

const user = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateStatusLogin: (state, action) => {
      state.login = action.payload;
      // Update local storage
      let existLocal = localStorage.getItem('users');
      let obj = existLocal ? JSON.parse(existLocal) : {};
      obj.login = action.payload;
      localStorage.setItem('users', JSON.stringify(obj));
    },
    updateUser: (state, action) => {
      const updateUser = action.payload;
      const userIndex = state.data.findIndex(
        (user) => user.id === updateUser.id
      );
      if (userIndex >= 0) {
        state.data[userIndex] = updateUser;
      }
      // Update local storage
      localStorage.setItem('users', JSON.stringify(state));
    },
    addUser: (state, action) => {
      state.data.push(action.payload);
      // Update local storage
      let existLocal = localStorage.getItem('users');
      let obj = existLocal ? JSON.parse(existLocal) : {};
      obj.data.push(action.payload);
      localStorage.setItem('users', JSON.stringify(obj));
    },
  },
});

const { reducer, actions } = user;
export const { updateStatusLogin, addUser, updateUser } = actions;
export default reducer;
