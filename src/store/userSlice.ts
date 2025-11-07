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

export const searchUsers = createAsyncThunk(
  'user/searchUsers',
  async ({ query, perPage = 5 }: { query: string; perPage?: number }) => {
    const users = await githubService.searchUsers(query, perPage);
    return users;
  }
);

interface UserState {
  data: GithubUser | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  searchResults: GithubUser[];
  searchStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    status: 'idle',
    searchResults: [],
    searchStatus: 'idle',
  } as UserState,
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.searchStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = 'failed';
        state.data = null;
      })
      .addCase(searchUsers.pending, (state) => {
        state.searchStatus = 'loading';
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.searchResults = action.payload;
        state.searchStatus = 'succeeded';
      })
      .addCase(searchUsers.rejected, (state) => {
        state.searchStatus = 'failed';
      });
  },
});

export const { clearSearchResults } = userSlice.actions;
export default userSlice.reducer;
