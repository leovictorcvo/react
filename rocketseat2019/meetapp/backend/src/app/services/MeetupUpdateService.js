import * as Yup from 'yup';
import { isBefore, parseISO } from 'date-fns';

import Meetup from '../models/Meetup';
import File from '../models/File';
import User from '../models/User';

class MeetupUpdateService {
  async run(data) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      description: Yup.string(),
      location: Yup.string(),
      date: Yup.date(),
      user_id: Yup.number().required(),
      banner: Yup.object().shape({
        id: Yup.number(),
        name: Yup.string(),
        path: Yup.string(),
      }),
    });

    if (!(await schema.isValid(data))) {
      throw new Error('Validation fails');
    }

    const { banner, ...meetup } = data;

    const savedMeetup = await Meetup.findByPk(meetup.id);

    if (!savedMeetup) {
      throw new Error('Meetup Not found');
    }

    if (meetup.user_id !== savedMeetup.user_id) {
      throw new Error('You can only change yours meetups');
    }

    if (meetup.date && isBefore(parseISO(meetup.date), new Date())) {
      throw new Error('Meetup date should not be in the past');
    }

    if (savedMeetup.past) {
      throw new Error('You can only update upcoming meetups');
    }

    try {
      const transaction = await Meetup.sequelize.transaction();

      await savedMeetup.update(meetup, { transaction });

      if (banner) {
        banner.meetup_id = savedMeetup.id;
        if (banner.id) {
          const bannerSaved = await File.findByPk(banner.id);
          await bannerSaved.update(banner, { transaction });
        } else {
          await File.create(banner, { transaction });
        }
      }

      await transaction.commit();

      return await Meetup.findByPk(savedMeetup.id, {
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
    } catch (error) {
      if (transaction) {
        await transaction.rollback();
      }

      throw new Error(
        'An error ocurred when updating meetup. Try again later!'
      );
    }
  }
}

export default new MeetupUpdateService();
