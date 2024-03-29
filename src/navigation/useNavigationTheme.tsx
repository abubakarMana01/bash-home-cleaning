import {DarkTheme, DefaultTheme} from '@react-navigation/native';
import {Colors} from '../constants';
import {useAppContext} from '../context';

export default function useNavigationTheme() {
  const {theme} = useAppContext();

  if (theme === 'dark') {
    return DarkTheme;
  }

  return {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: Colors.white,
    },
  };
}
