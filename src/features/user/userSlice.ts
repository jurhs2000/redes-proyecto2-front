import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface UserState {
  value: {
    username: string;
    room: string;
  };
  status: 'not connected' | 'connecting' | 'connected' | 'failed';
}

const initialState: UserState = {
  value: {
    username: '',
    room: '',
  },
  status: 'not connected',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ username: string, room: string }>) => {
      state.value = {
        username: action.payload.username,
        room: action.payload.room,
      };
      state.status = 'connected';
      console.log('login', state.value);
    },
    logout: (state) => {
      state.value = {
        username: '',
        room: '',
      };
      state.status = 'not connected';
      console.log('logout', state);
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;