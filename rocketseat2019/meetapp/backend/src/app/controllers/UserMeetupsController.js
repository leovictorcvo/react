import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

class UserMeetupsController {
  async index(req, res) {
    const { page = 1, recordsPerPage = 10 } = req.query;
    const user_id = req.userId;

    const meetups = await Meetup.findAll({
      where: {
        user_id,
      },
      order: [['date', 'DESC']],
      limit: recordsPerPage,
      offset: (page - 1) * recordsPerPage,
      include: [
        {
          model: User,
          as: 'organizer',
          attributes: ['name', 'email'],
        },
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    return res.json(meetups);
  }
}

export default new UserMeetupsController();
