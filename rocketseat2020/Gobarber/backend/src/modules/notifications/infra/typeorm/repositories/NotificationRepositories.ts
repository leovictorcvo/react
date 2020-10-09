import { getMongoRepository, MongoRepository } from 'typeorm';

import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

import Notification from '../schemas/Notification';

class NotificationsRepository implements INotificationRepository {
  private odmRepository: MongoRepository<Notification>;

  constructor() {
    this.odmRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create(data: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.odmRepository.create(data);
    await this.odmRepository.save(notification);
    return notification;
  }
}

export default NotificationsRepository;
