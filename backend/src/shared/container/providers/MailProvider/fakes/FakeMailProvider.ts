import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

class FakeMailProvider implements IMailProvider {
  private messages: ISendMailDTO[] = [];

  public async sendMail(message: ISendMailDTO): Promise<void> {
    this.messages.push(message);

    return Promise.resolve(undefined);
  }
}

export default FakeMailProvider;
