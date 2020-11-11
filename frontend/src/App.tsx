import React from 'react';

import GlobalStyles from './styles/global';

import { AuthProvider } from './context/AuthContext';

import SignIn from './pages/Signin';
import SignUp from './pages/Signup';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <AuthProvider>
        <SignIn />
      </AuthProvider>
    </>
  );
};

export default App;
