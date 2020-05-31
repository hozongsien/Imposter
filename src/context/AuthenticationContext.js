import { createContext } from 'react';

const AuthenticationContext = createContext({
  userId: null,
  email: null,
  token: null,
  login: (userId, email, token, tokenExpiration) => {},
  logout: () => {},
});

export default AuthenticationContext;
