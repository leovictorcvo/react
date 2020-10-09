import * as Yup from 'yup';
import { isBefore, parseISO } from 'date-fns';

import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

import MeetupCreateService from '../services/MeetupCreateService';
import MeetupUpdateService from '../services/MeetupUpdateService';

class MeetupController {
  async index(req, res) {
    const meetup = await Meetup.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'organizer',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    if (!meetup) {
      return res.status(404).json({ error: 'Not found' });
    }

    return res.json(meetup);
  }

  async store(req, res) {
    const user_id = req.userId;

    try {
      const meetup = await MeetupCreateService.run({ ...req.body, user_id });

      return res.json(meetup);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
  }

  async update(req, res) {
    const user_id = req.userId;

    try {
      const meetup = await MeetupUpdateService.run({
        ...req.body,
        user_id,
        id: req.params.id,
      });

      return res.json(meetup);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
  }

  async delete(req, res) {
    const user_id = req.userId;

    const meetup = await Meetup.findByPk(req.params.id);

    if (!meetup) {
      return res.status(404).json({ error: 'Not found' });
    }

    if (meetup.user_id !== user_id) {
      return res
        .status(403)
        .json({ error: 'You can only cancel yours meetups' });
    }

    if (meetup.past) {
      return res
        .status(400)
        .json({ error: 'You can only cancel upcoming meetups' });
    }

    await meetup.destroy();

    return res.send();
  }
}

export default new MeetupController();
