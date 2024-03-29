import {useContext, createContext, useState, useEffect} from 'react';
import {ActivityIndicator, Appearance, StatusBar, View} from 'react-native';
import React from 'react';
import {Colors} from '../constants';
import {getUserInfo} from '../utils';
import {useAuthToken} from '../hooks';
import {NoInternetView} from '../components';
import {useNetInfo} from '@react-native-community/netinfo';

const AppContext = createContext({} as IAppContext);

interface IAppProvider {
  children: React.ReactNode;
}

export default function AppProvider({children}: IAppProvider) {
  const netInfo = useNetInfo();
  const [user, setUser] = useState<IAppContext['user']>(null);
  const [token, setToken] = useState('');
  const [theme, setTheme] = useState(Appearance.getColorScheme()!);
  const {getToken} = useAuthToken();
  const [isLoading, setIsLoading] = useState(true);

  Appearance.addChangeListener(scheme => {
    setTheme(scheme.colorScheme!);
  });

  async function persistAuthState() {
    const savedToken = await getToken();
    setToken(savedToken!);
    if (!savedToken) {
      return setIsLoading(false);
    }

    try {
      const {data} = await getUserInfo(savedToken);
      setUser(data);
    } catch (ex) {
      console.log(ex);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    persistAuthState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {/* <StatusBar
          barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
          backgroundColor={theme === 'light' ? Colors.dark : Colors.white}
        /> */}
        <ActivityIndicator
          size="large"
          color={theme === 'dark' ? Colors.blue : Colors.darkBlue}
        />
      </View>
    );
  }

  if (!netInfo.isConnected) {
    return <NoInternetView />;
  }

  return (
    <AppContext.Provider
      value={{theme, setTheme, user, setUser, token, setToken}}>
      {/* {theme === 'light' ? (
        <StatusBar
          barStyle={token ? 'light-content' : 'dark-content'}
          backgroundColor={token ? Colors.dark : Colors.white}
        />
      ) : (
        <StatusBar barStyle="light-content" backgroundColor={Colors.dark} />
      )} */}

      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  return useContext(AppContext);
};
