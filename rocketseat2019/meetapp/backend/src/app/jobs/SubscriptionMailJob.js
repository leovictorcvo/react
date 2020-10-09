import Mail from '../../lib/Mail';

class SubscriptionMailJob {
  get key() {
    return 'SubscriptionMail';
  }

  async handle({ data }) {
    const {
      meetup,
      subscriber,
      meetupFormatedDate,
      subscriptionFormatedDate,
    } = data;
    await Mail.sendMail({
      to: `${meetup.organizer.name} <${meetup.organizer.email}>`,
      subject: 'New subscription',
      template: 'subscription',
      context: {
        organizer: meetup.organizer.name,
        subscriber: `${subscriber.name} <${subscriber.email}>`,
        meetup: meetup.title,
        meetupDate: meetupFormatedDate,
        subscriptionDate: subscriptionFormatedDate,
      },
    });
  }
}

export default new SubscriptionMailJob();
