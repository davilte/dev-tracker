import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchUserRepos, setSortOrder } from '../store/reposSlice';

type SortOrder = "stars_desc" | "stars_asc" | "name_asc" | "name_desc";

export function useRepos(username: string | undefined) {
  const dispatch = useDispatch<AppDispatch>();
  const { data: repos, status, sortOrder } = useSelector((state: RootState) => state.repos);

  useEffect(() => {
    if (username) {
      dispatch(fetchUserRepos(username));
    }
  }, [username, dispatch]);

  function handleSortChange(order: SortOrder) {
    dispatch(setSortOrder(order));
  }

  return {
    repos,
    isLoading: status === 'loading',
    isError: status === 'failed',
    isSuccess: status === 'succeeded',
    sortOrder,
    handleSortChange,
  };
}

