interface IAppContext {
  theme: 'light' | 'dark';
  setTheme: React.Dispatch<React.SetStateAction<IAppContext['theme']>>;
  user: TUser | null;
  setUser: React.Dispatch<React.SetStateAction<IAppContext['user'] | null>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<IAppContext['token']>>;
}

type TUser = {
  firstName: string;
  lastName: string;
  email: string;
  _id: string;
};
