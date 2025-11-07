import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { clearSearchResults, searchUsers } from '../store/userSlice';
import { useDebouncedValue } from './useDebouncedValue';

export function useGithubSearch(query: string, minLength: number = 2) {
  const dispatch = useDispatch<AppDispatch>();
  const debouncedQuery = useDebouncedValue(query, 500);
  const { searchResults, searchStatus } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    if (debouncedQuery.trim().length >= minLength) {
      dispatch(searchUsers({ query: debouncedQuery, perPage: 10 }));
    } else {
      dispatch(clearSearchResults());
    }
  }, [debouncedQuery, dispatch, minLength]);

  return {
    searchResults,
    searchStatus,
    isLoading: searchStatus === 'loading',
  };
}

