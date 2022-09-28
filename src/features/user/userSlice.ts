import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface UserState {
  value: {
    username: string;
    room: string;
  };
  status: 'not joined' | 'joined';
}

const initialState: UserState = {
  value: {
    username: '',
    room: '',
  },
  status: 'not joined',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addRoom: (state, action: PayloadAction<{ username: string, room: string }>) => {
      state.value = {
        username: action.payload.username,
        room: action.payload.room,
      };
      state.status = 'joined';
    },
    removeRoom: (state) => {
      state.value = {
        username: '',
        room: ''
      };
      state.status = 'not joined';
    },
  },
});

export const { addRoom, removeRoom } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;