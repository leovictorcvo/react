import Notification from '../schemas/notification';

class NotificationController {
  async index(req, res) {
    const notifications = await Notification.find({
      organizer: req.userId,
    })
      .sort({ createAt: 'desc' })
      .limit(20);

    return res.json(notifications);
  }

  async update(req, res) {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );

    return res.json(notification);
  }
}

export default new NotificationController();
