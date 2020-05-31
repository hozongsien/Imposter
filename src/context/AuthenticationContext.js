import { createContext } from 'react';

const AuthenticationContext = createContext({
  token: null,
  userId: null,
  login: (token, tokenExpiration, userId) => {},
  logout: () => {},
});

export default AuthenticationContext;
