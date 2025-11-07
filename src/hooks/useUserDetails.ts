import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchUser } from '../store/userSlice';

export function useUserDetails(username: string | undefined) {
  const dispatch = useDispatch<AppDispatch>();
  const { data: user, status } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (username) {
      dispatch(fetchUser(username));
    }
  }, [username, dispatch]);

  return {
    user,
    isLoading: status === 'loading',
    isError: status === 'failed',
    isSuccess: status === 'succeeded',
  };
}

