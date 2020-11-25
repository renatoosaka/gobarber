import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProviderService from '@modules/appointments/services/ListProviderService';

let fakeUsersRepository: FakeUsersRepository;
let listProvider: ListProviderService;

describe('ListProvider', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    listProvider = new ListProviderService(fakeUsersRepository);
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'email@email.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'John tre',
      email: 'email2@email.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'John Qua',
      email: 'email3@email.com',
      password: '123456',
    });

    const providers = await listProvider.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
