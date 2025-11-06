export interface GithubUser {
    login: string;
    name?: string;
    avatar_url: string;
    email?: string;
    bio?: string;
    followers: number;
    following: number;
  }
  
  export interface GithubRepo {
    id: number;
    name: string;
    full_name: string;
    description?: string;
    stargazers_count: number;
    forks_count: number;
    language?: string;
    html_url: string;
  }
  