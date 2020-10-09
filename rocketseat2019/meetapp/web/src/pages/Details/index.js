import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdEdit, MdDeleteForever, MdEvent, MdPlace } from 'react-icons/md';
import PropTypes from 'prop-types';

import {
  Container,
  ActionContainer,
  EditButton,
  Banner,
  CancelButton,
  LocationSchedule,
} from './styles';

import {
  getMeetupRequest,
  editMeetupRequest,
  cancelMeetupRequest,
} from '~/store/modules/meetup/actions';

export default function Details({ match }) {
  const meetup = useSelector(state => state.meetup.meetup);
  const user = useSelector(state => state.user.profile);
  const dispatch = useDispatch();
  const { id } = match.params;
  const canEditDelete =
    meetup.organizer && user.id === meetup.organizer.id && !meetup.past;
  useEffect(() => {
    dispatch(getMeetupRequest(id));
  }, [dispatch, id]);

  function handleEditMeetup() {
    dispatch(editMeetupRequest(meetup));
  }

  function handleCancelMeetup() {
    dispatch(cancelMeetupRequest(id));
  }

  return (
    <Container>
      <header>
        <strong>{meetup.title}</strong>
        <ActionContainer>
          <EditButton onClick={handleEditMeetup} canEdit={canEditDelete}>
            <MdEdit size={20} color="#fff" />
            <span>Editar</span>
          </EditButton>
          <CancelButton onClick={handleCancelMeetup} canDelete={canEditDelete}>
            <MdDeleteForever size={20} color="#fff" />
            <span>Cancelar</span>
          </CancelButton>
        </ActionContainer>
      </header>
      <Banner
        src={(meetup.banner && meetup.banner.url) || ''}
        alt={meetup.title}
      />
      <pre>{meetup.description}</pre>
      <LocationSchedule>
        <div>
          <MdEvent size={20} color="#fff" />
          <span>{meetup.formattedDate}</span>
        </div>
        <div>
          <MdPlace size={20} color="#fff" />
          <span>{meetup.location}</span>
        </div>
      </LocationSchedule>
    </Container>
  );
}

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
