// src/redux/slices/userSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  name: string;
  email: string;
  contactInfo: string;
  // Add other fields as needed
}

const initialState: UserState = {
  name: '',
  email: '',
  contactInfo: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<UserState>) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.contactInfo = action.payload.contactInfo;
    },
    updateUserInfo(state, action: PayloadAction<Partial<UserState>>) {
      state = { ...state, ...action.payload }; // Update the fields
    },
  },
});

export const { setUserInfo, updateUserInfo } = userSlice.actions;
export default userSlice.reducer;
