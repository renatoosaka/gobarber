import React from 'react';
import { render } from '@testing-library/react-native';

import SignIn from '../../pages/Signin';

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe('SignIn Page', () => {
  it('should contains e-mail and password inputs', async () => {
    const { getByPlaceholderText } = render(<SignIn />);

    expect(getByPlaceholderText('E-mail')).toBeTruthy();
    expect(getByPlaceholderText('Senha')).toBeTruthy();
  });
});
