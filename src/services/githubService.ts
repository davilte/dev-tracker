import { api } from "../api/github";
import { GithubRepo, GithubUser } from "../types/github";

export const githubService = {
  async getUser(username: string): Promise<GithubUser> {
    try {
      const { data } = await api.get(`/users/${username}`);
      return data;
    } catch (error) {
      throw error;
    }
  },

  async getUserRepos(username: string): Promise<GithubRepo[]> {
    try {
      const { data } = await api.get(`/users/${username}/repos`);
      return data;
    } catch (error) {
      throw error;
    }
  },

  async getRepoDetails(fullName: string): Promise<GithubRepo> {
    try {
      const { data } = await api.get(`/repos/${fullName}`);
      return data;
    } catch (error) {
      throw error;
    }
  },
};
