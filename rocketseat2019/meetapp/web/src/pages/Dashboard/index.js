import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MdAddCircleOutline, MdChevronRight } from 'react-icons/md';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { utcToZonedTime } from 'date-fns-tz';

import api from '~/services/api';
import history from '~/services/history';
import { Container, Meetup, Title, When } from './styles';
import { createMeetupRequest } from '~/store/modules/meetup/actions';

export default function Dashboard() {
  const [meetups, setMeetups] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('/meetups');

      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const data = response.data.map(meetup => {
        const localDate = utcToZonedTime(parseISO(meetup.date), timezone);
        const formattedDate = format(localDate, "dd 'de' MMMM', às 'HH'h'", {
          locale: pt,
        });
        return {
          id: meetup.id,
          title: meetup.title,
          date: formattedDate,
          past: meetup.past,
        };
      });
      setMeetups(data);
    }

    loadMeetups();
  }, []);

  function handleDetailNavigation(id) {
    history.push(`/details/${id}`);
  }

  function handleCreateMeetup() {
    dispatch(createMeetupRequest());
  }

  return (
    <Container>
      <header>
        <strong>Meus meetups</strong>
        <button type="button" onClick={handleCreateMeetup}>
          <MdAddCircleOutline size={20} color="#fff" />
          <span>Novo meetup</span>
        </button>
      </header>

      <ul>
        {meetups.map(meetup => (
          <Meetup key={meetup.id} past={meetup.past}>
            <Title>{meetup.title}</Title>
            <When>
              <span>{meetup.date}</span>
              <button
                type="button"
                onClick={() => handleDetailNavigation(meetup.id)}
              >
                <MdChevronRight size={24} color="#fff" />
              </button>
            </When>
          </Meetup>
        ))}
      </ul>
    </Container>
  );
}
