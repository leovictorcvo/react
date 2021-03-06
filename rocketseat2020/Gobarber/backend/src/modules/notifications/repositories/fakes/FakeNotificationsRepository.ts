import { ObjectID } from 'mongodb';

import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

import Notification from '../../infra/typeorm/schemas/Notification';

export default class FakeNotificationsRepository
  implements INotificationRepository {
  private notifications: Notification[] = [];

  public async create(data: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();
    Object.assign(notification, { ...data, id: new ObjectID() });
    this.notifications.push(notification);
    return notification;
  }
}
