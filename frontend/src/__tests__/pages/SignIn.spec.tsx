import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';

import SignIn from '../../pages/Signin';

const mockedHistoryPush = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush,
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/auth', () => ({
  useAuth: () => ({
    signIn: jest.fn(),
  }),
}));

describe('SignIn Page', () => {
  it('should be able to signin', async () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);

    const emailField = getByPlaceholderText('E-mail');
    const passwordField = getByPlaceholderText('Senha');

    const buttonElement = getByText('Entrar');

    fireEvent.change(emailField, {
      target: {
        value: 'email@email.com',
      },
    });

    fireEvent.change(passwordField, {
      target: {
        value: '123456',
      },
    });

    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
    });
  });
});
