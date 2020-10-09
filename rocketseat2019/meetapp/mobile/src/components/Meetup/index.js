import React from 'react';
import {format, parseISO} from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import PropTypes from 'prop-types';

import {Image} from 'react-native';

import {
  Container,
  Banner,
  DetailsContainer,
  Title,
  SubmitButton,
  DisabledText,
} from './styles';
import MeetupDetail from './MeetupDetail';

export default function Meetup({
  meetup,
  buttonText,
  onPress,
  disabledCondition,
  disabledText,
}) {
  const dateFormatted = format(
    parseISO(meetup.date),
    "dd' de 'MMMM', às 'HH'h'",
    {
      locale: pt,
    }
  );

  const organizer = `Organizador: ${(meetup.organizer &&
    meetup.organizer.name) ||
    ''}`;

  const bannerUrl = meetup.banner ? meetup.banner.url : '';

  return (
    <Container>
      <Banner source={{uri: bannerUrl}} />
      <DetailsContainer>
        <Title>{meetup.title}</Title>
        <MeetupDetail icon="event" text={dateFormatted} />
        <MeetupDetail icon="place" text={meetup.location} />
        <MeetupDetail icon="person" text={organizer} />
        {disabledCondition ? (
          <DisabledText>{disabledText}</DisabledText>
        ) : meetup.past ? (
          <DisabledText>Meetup encerrado</DisabledText>
        ) : (
          <SubmitButton onPress={onPress}>{buttonText}</SubmitButton>
        )}
      </DetailsContainer>
    </Container>
  );
}

Meetup.propTypes = {
  meetup: PropTypes.shape({
    date: PropTypes.string.isRequired,
    organizer: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    banner: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }),
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    past: PropTypes.bool.isRequired,
  }).isRequired,
  buttonText: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  disabledCondition: PropTypes.bool,
  disabledText: PropTypes.string,
};

Meetup.defaultProps = {
  disabledCondition: false,
  disabledText: '',
};
