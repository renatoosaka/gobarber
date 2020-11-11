import React from 'react';

import GlobalStyles from './styles/global';

import AppProvider from './hooks';

import SignIn from './pages/Signin';
import SignUp from './pages/Signup';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />

      <AppProvider>
        <SignIn />
      </AppProvider>
    </>
  );
};

export default App;
