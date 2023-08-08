import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export const useRightNavigationHeader = (headerRight: () => JSX.Element) => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: headerRight,
      animationEnabled: true,
    });
  }, [navigation, headerRight]);
};
