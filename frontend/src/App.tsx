import React from 'react';

import GlobalStyles from './styles/global';

import { AuthProvider } from './hooks/AuthContext';

import ToastContainer from './components/ToastContainer';

import SignIn from './pages/Signin';
import SignUp from './pages/Signup';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />

      <AuthProvider>
        <SignIn />
      </AuthProvider>

      <ToastContainer />
    </>
  );
};

export default App;
