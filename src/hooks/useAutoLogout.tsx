import {useEffect, useState} from 'react';
import {PanResponder} from 'react-native';
import {differenceInSeconds} from 'date-fns';

import {setCredentials} from '@store/slices/authSlice';
import {useAppDispatch, useAppSelector} from '@store/hooks';

export default function useAutoLogout() {
  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.auth.credentials.token);

  const [count, setCount] = useState<number>(0);
  const [lastInteraction, setLastInteraction] = useState<Date>(new Date());

  const COUNTDOWN = 300;

  const resetLogoutCountdown = (): boolean => {
    setLastInteraction(new Date());
    setCount(0);
    return false;
  };

  const checkLastActivity = () => {
    if (differenceInSeconds(new Date(), lastInteraction) >= COUNTDOWN) {
      dispatch(
        setCredentials({
          token: null,
          user_id: null,
        }),
      );
      setLastInteraction(new Date());
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: resetLogoutCountdown,
    onMoveShouldSetPanResponder: resetLogoutCountdown,
    onStartShouldSetPanResponderCapture: () => false,
    onMoveShouldSetPanResponderCapture: () => false,
    onPanResponderTerminationRequest: () => true,
    onShouldBlockNativeResponder: () => false,
  });

  useEffect(() => {
    let interval: any = null;
    if (token) {
      interval = setInterval(() => {
        setCount(count + 1);
      }, 1000);
      checkLastActivity();
    }
    return () => {
      clearInterval(interval);
    };
  }, [token, count]);

  return {panResponder};
}
