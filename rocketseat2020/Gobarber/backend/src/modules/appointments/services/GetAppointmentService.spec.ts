import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import { getHours } from 'date-fns';
import FakeCacheProvider from '@shared/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentService from './CreateAppointmentService';
import GetAppointmentService from './GetAppointmentService';

describe('GetAppointment', () => {
  it('should be able to list stored appointments', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const fakeNotificationsRepository = new FakeNotificationsRepository();
    const fakeCacheProvider = new FakeCacheProvider();
    const getAppointmentService = new GetAppointmentService(
      fakeAppointmentRepository,
    );
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository,
      fakeNotificationsRepository,
      fakeCacheProvider,
    );

    let result = await getAppointmentService.execute();

    expect(result?.length).toBe(0);

    const fromTwoHours = new Date().setHours(getHours(Date.now()) + 2);
    await createAppointmentService.execute({
      date: new Date(fromTwoHours),
      user_id: 'user2',
      provider_id: '123456',
    });

    result = await getAppointmentService.execute();

    expect(result?.length).toBe(1);
  });
});
