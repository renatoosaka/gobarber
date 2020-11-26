import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointments: ListProviderAppointmentsService;

describe('ListProviderAppointments', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the appointments on a specific day from provider', async () => {
    const listAppointments = await Promise.all(
      Array.from({ length: 10 }, (_, index) =>
        fakeAppointmentsRepository.create({
          date: new Date(2020, 4, 20, index + 8),
          user_id: 'user',
          provider_id: 'provider',
        }),
      ),
    );

    const appointments = await listProviderAppointments.execute({
      day: 20,
      month: 5,
      year: 2020,
      provider_id: 'provider',
    });

    expect(appointments).toEqual(listAppointments);
  });
});
