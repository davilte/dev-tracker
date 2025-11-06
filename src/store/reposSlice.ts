// src/store/reposSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { githubService } from "../services/githubService";
import { GithubRepo } from "../types/github";

export const fetchUserRepos = createAsyncThunk(
  "repos/fetchUserRepos",
  async (username: string) => {
    const repos = await githubService.getUserRepos(username);
    return repos as GithubRepo[];
  }
);

type SortOrder = "stars_desc" | "stars_asc" | "name_asc" | "name_desc";

interface ReposState {
  data: GithubRepo[];
  status: "idle" | "loading" | "succeeded" | "failed";
  sortOrder: SortOrder;
}

const initialState: ReposState = {
  data: [],
  status: "idle",
  sortOrder: "stars_desc",
};

const reposSlice = createSlice({
  name: "repos",
  initialState,
  reducers: {
    setSortOrder(state, action: PayloadAction<SortOrder>) {
      state.sortOrder = action.payload;
      state.data = sortRepos(state.data, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserRepos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserRepos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = sortRepos(action.payload, state.sortOrder);
      })
      .addCase(fetchUserRepos.rejected, (state) => {
        state.status = "failed";
      });
  },
});

function sortRepos(repos: GithubRepo[], order: SortOrder) {
  const sorted = [...repos];
  switch (order) {
    case "stars_asc":
      return sorted.sort((a, b) => a.stargazers_count - b.stargazers_count);
    case "name_asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "name_desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    default: // "stars_desc"
      return sorted.sort((a, b) => b.stargazers_count - a.stargazers_count);
  }
}

export const { setSortOrder } = reposSlice.actions;
export default reposSlice.reducer;
