import * as Yup from 'yup';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Op } from 'sequelize';

import Meetup from '../models/Meetup';
import Subscription from '../models/Subscription';
import User from '../models/User';
import File from '../models/File';

import Notification from '../schemas/notification';

import SubscriptionMailJob from '../jobs/SubscriptionMailJob';

import Queue from '../../lib/queue';

class SubscriptionController {
  async index(req, res) {
    const meetups = await Subscription.findAll({
      where: { user_id: req.userId },
      attributes: ['id'],
      include: [
        {
          model: Meetup,
          as: 'meetup',
          required: true,
          where: { date: { [Op.gt]: new Date() } },
          attributes: ['id', 'title', 'location', 'date', 'past'],
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
        },
      ],
    });

    return res.json(meetups);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      meetup_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { meetup_id } = req.body;
    const { userId: user_id } = req;

    const meetup = await Meetup.findByPk(meetup_id, {
      include: [
        {
          model: User,
          as: 'organizer',
          attributes: ['name', 'email'],
        },
      ],
    });

    if (meetup.user_id === user_id) {
      return res
        .status(400)
        .json({ error: "You can't subscribe to one of yours meetups." });
    }

    if (meetup.past) {
      return res.status(400).json({ error: 'This meetup has finished.' });
    }

    const checkIfIsSubscribed = await Subscription.findOne({
      where: { user_id, meetup_id },
    });

    if (checkIfIsSubscribed) {
      return res
        .status(400)
        .json({ error: 'You are already subscribed to this meetup.' });
    }

    const anotherMeetupAtSameTime = await Subscription.findOne({
      where: {
        user_id,
      },
      include: [
        {
          model: Meetup,
          as: 'meetup',
          required: true,
          where: { date: meetup.date },
        },
      ],
    });

    if (anotherMeetupAtSameTime) {
      return res.status(400).json({
        error: 'You are already subscribed to a meetup at the same time.',
      });
    }

    const subscription = await Subscription.create({
      user_id,
      meetup_id,
    });

    const subscriber = await User.findByPk(user_id);
    const meetupFormatedDate = format(meetup.date, 'dd/MM/yyyy H:mm', {
      locale: pt,
    });

    const subscriptionFormatedDate = format(
      subscription.createdAt,
      'dd/MM/yyyy H:mm',
      { locale: pt }
    );

    await Notification.create({
      content: `New subscription to your meetup '${meetup.title}' at ${meetupFormatedDate}`,
      organizer: meetup.user_id,
      subscriber: `${subscriber.name} <${subscriber.email}>`,
    });

    await Queue.add(SubscriptionMailJob.key, {
      meetup,
      subscriber,
      meetupFormatedDate,
      subscriptionFormatedDate,
    });

    return res.json(subscription);
  }

  async delete(req, res) {
    const { id: meetup_id } = req.params;
    const { userId: user_id } = req;

    const meetup = await Meetup.findByPk(meetup_id, {
      include: [
        {
          model: User,
          as: 'organizer',
          attributes: ['name', 'email'],
        },
      ],
    });

    if (meetup.past) {
      return res.status(400).json({ error: 'This meetup has finished.' });
    }

    const subscription = await Subscription.findOne({
      where: { user_id, meetup_id },
    });

    if (!subscription) {
      return res
        .status(400)
        .json({ error: 'You are not subscribed to this meetup.' });
    }

    await subscription.destroy();

    const subscriber = await User.findByPk(user_id);
    const meetupFormatedDate = format(meetup.date, 'dd/MM/yyyy H:mm', {
      locale: pt,
    });

    const subscriptionFormatedDate = format(
      subscription.createdAt,
      'dd/MM/yyyy H:mm',
      { locale: pt }
    );

    await Notification.create({
      content: `A subscription to your meetup '${meetup.title}' at ${meetupFormatedDate} was cancelled!`,
      organizer: meetup.user_id,
      subscriber: `${subscriber.name} <${subscriber.email}>`,
    });

    await Queue.add(SubscriptionMailJob.key, {
      meetup,
      subscriber,
      meetupFormatedDate,
      subscriptionFormatedDate,
    });

    return res.send();
  }
}

export default new SubscriptionController();
