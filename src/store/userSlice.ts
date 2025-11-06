// src/store/userSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { githubService } from '../services/githubService';
import { GithubUser } from '../types/github';
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (username: string) => {
    const data = await githubService.getUser(username);
    return data as GithubUser;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: { data: null as GithubUser | null, status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = 'succeeded';
    });
  }
});
export default userSlice.reducer;
