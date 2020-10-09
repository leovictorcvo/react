import * as Yup from 'yup';
import { isBefore, parseISO } from 'date-fns';

import Meetup from '../models/Meetup';
import File from '../models/File';
import User from '../models/User';

class MeetupCreateService {
  async run(data) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      location: Yup.string().required(),
      date: Yup.date().required(),
      user_id: Yup.number().required(),
      banner: Yup.object()
        .shape({
          id: Yup.number().required(),
          name: Yup.string().required(),
          path: Yup.string().required(),
        })
        .required(),
    });

    if (!(await schema.isValid(data))) {
      throw new Error('Validation fails');
    }

    const { banner, ...meetup } = data;

    if (isBefore(parseISO(meetup.date), new Date())) {
      throw new Error('Meetup date should not be in the past');
    }

    try {
      const transaction = await Meetup.sequelize.transaction();

      const savedMeetup = await Meetup.create(meetup, { transaction });
      await File.create(
        {
          ...banner,
          meetup_id: savedMeetup.id,
        },
        { transaction }
      );

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
      console.log('error', error);
      if (transaction) {
        await transaction.rollback();
      }

      throw new Error(
        'An error ocurred during meetup creation. Try again later!'
      );
    }
  }
}

export default new MeetupCreateService();
