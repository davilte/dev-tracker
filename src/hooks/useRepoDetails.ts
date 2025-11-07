import { useEffect, useState } from 'react';
import { githubService } from '../services/githubService';
import { GithubRepo } from '../types/github';

export function useRepoDetails(fullName: string | undefined) {
  const [repo, setRepo] = useState<GithubRepo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!fullName) {
      setIsLoading(false);
      return;
    }

    const repoFullName = fullName;

    async function fetchRepoDetails() {
      setIsLoading(true);
      setIsError(false);
      try {
        const repoData = await githubService.getRepoDetails(repoFullName);
        setRepo(repoData);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRepoDetails();
  }, [fullName]);

  return {
    repo,
    isLoading,
    isError,
  };
}

