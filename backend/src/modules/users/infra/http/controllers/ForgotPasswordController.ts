import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendForgotEmailPasswordService from '@modules/users/services/SendForgotEmailPasswordService';

class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotEmailPassword = container.resolve(
      SendForgotEmailPasswordService,
    );

    await sendForgotEmailPassword.execute({ email });

    return response.status(204).send();
  }
}

export default ForgotPasswordController;
