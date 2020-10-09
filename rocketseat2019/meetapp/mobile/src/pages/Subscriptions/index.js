import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {withNavigationFocus} from 'react-navigation';
import PropTypes from 'prop-types';

import {Container, MeetupsList} from './styles';

import Background from '~/components/BackgroundWindow';
import Header from '~/components/Header';
import Meetup from '~/components/Meetup';

import api from '~/services/api';

function Subscriptions({isFocused}) {
  const [meetups, setMeetups] = useState([]);

  async function loadMeetups() {
    const {data} = await api.get('/subscriptions');

    setMeetups(data);
  }
  useEffect(() => {
    loadMeetups();
  }, [isFocused]);

  async function unsubscribeMeetup(meetupId) {
    try {
      await api.delete(`/subscriptions/${meetupId}`);
      Alert.alert('Inscrição', 'Inscrição cancelada com sucesso!');
      await loadMeetups();
    } catch (error) {
      Alert.alert(
        'Inscrição',
        'Ocorreu um erro no cancelamento. Tente mais tarde!'
      );
    }
  }

  function renderItem(item) {
    return (
      <Meetup
        meetup={item.meetup}
        buttonText="Cancelar inscrição"
        onPress={() => unsubscribeMeetup(item.meetup.id)}
        disabledCondition={item.meetup.past}
        disabledText="Meetup encerrado"
      />
    );
  }

  return (
    <Background>
      <Header />
      <Container>
        <MeetupsList
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => renderItem(item)}
        />
      </Container>
    </Background>
  );
}

Subscriptions.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

function SubmitIcon({tintColor}) {
  return <Icon name="local-offer" size={20} color={tintColor} />;
}

SubmitIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: SubmitIcon,
};

Subscriptions.navigationOptions.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

export default withNavigationFocus(Subscriptions);
