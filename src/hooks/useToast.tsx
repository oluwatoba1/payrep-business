import { useCallback } from 'react';
import { useAppDispatch } from '../store/hooks';
import { createToastRequest } from '../store/slices/appSlice';

export default function useToast() {
  const dispatch = useAppDispatch();

  const showToast = useCallback(
    (
      type: 'success' | 'warning' | 'danger',
      message: string,
      duration: number = 4000,
    ) => {
      dispatch(createToastRequest({ type, message, duration }));
    },
    [dispatch],
  );

  return {
    showToast,
  };
}
