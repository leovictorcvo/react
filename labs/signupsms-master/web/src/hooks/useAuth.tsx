import React, { createContext, useCallback, useState, useContext } from 'react';

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  user: object;
  signIn(signInData: AuthState): void;
  signOut(): void;
};

type AuthState = {
  user: object;
  token: string;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState(() => {
    const token = localStorage.getItem('@SignUpSMS:token');
    const user = localStorage.getItem('@SignUpSMS:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback((signInData: AuthState) => {
    localStorage.setItem('@SignUpSMS:token', signInData.token);
    localStorage.setItem('@SignUpSMS:user', JSON.stringify(signInData.user));
    setData(signInData);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@SignUpSMS:token');
    localStorage.removeItem('@SignUpSMS:user');
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
