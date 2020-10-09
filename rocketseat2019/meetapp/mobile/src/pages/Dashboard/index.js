import React, {useState, useCallback, useEffect} from 'react';
import {Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {addDays, subDays} from 'date-fns';
import {withNavigationFocus} from 'react-navigation';
import PropTypes from 'prop-types';

import {
  Container,
  DateContainer,
  SelectDateButton,
  MeetupsList,
} from './styles';

import Background from '~/components/BackgroundWindow';
import Header from '~/components/Header';
import DateInput from '~/components/DateInput';
import Meetup from '~/components/Meetup';

import api from '~/services/api';

function Dashboard({isFocused}) {
  const [date, setDate] = useState(new Date());
  const [meetups, setMeetups] = useState([]);

  function decreaseDate() {
    setDate(subDays(date, 1));
  }

  function increaseDate() {
    setDate(addDays(date, 1));
  }

  const loadMeetups = useCallback(async () => {
    const {data} = await api.get('/dailyMeetups', {
      params: {
        date: date.getTime(),
      },
    });

    setMeetups(data);
  }, [date]);

  useEffect(() => {
    loadMeetups();
  }, [isFocused, loadMeetups]);

  async function subscribeMeetup(meetupId) {
    try {
      await api.post('/subscriptions', {meetup_id: meetupId});
      loadMeetups();
      Alert.alert('Inscrição', 'Inscrição realizada com sucesso!');
    } catch (error) {
      Alert.alert(
        'Inscrição',
        'Ocorreu um erro na inscrição. Tente mais tarde!'
      );
    }
  }

  function renderItem(item) {
    return (
      <Meetup
        meetup={item}
        buttonText="Realizar inscrição"
        onPress={() => subscribeMeetup(item.id)}
        disabledCondition={item.Subscriptions.length > 0}
        disabledText="Já inscrito"
      />
    );
  }

  return (
    <Background>
      <Header />
      <Container>
        <DateContainer>
          <SelectDateButton onPress={decreaseDate}>
            <Icon name="chevron-left" size={30} color="#fff" />
          </SelectDateButton>
          <DateInput date={date} onChange={setDate} />
          <SelectDateButton onPress={increaseDate}>
            <Icon name="chevron-right" size={30} color="#fff" />
          </SelectDateButton>
        </DateContainer>
        <MeetupsList
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => renderItem(item)}
        />
      </Container>
    </Background>
  );
}

Dashboard.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

function SubmitIcon({tintColor}) {
  return <Icon name="person" size={20} color={tintColor} />;
}

SubmitIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: SubmitIcon,
};

export default withNavigationFocus(Dashboard);
