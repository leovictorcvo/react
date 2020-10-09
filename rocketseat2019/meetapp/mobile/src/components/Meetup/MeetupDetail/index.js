import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {Container, Description} from './styles';

function MeetupDetail({icon, text}) {
  return (
    <Container>
      <Icon name={icon} size={14} color="#999" />
      <Description>{text}</Description>
    </Container>
  );
}

MeetupDetail.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
};

MeetupDetail.defaultProps = {
  icon: null,
  text: 'a',
};

export default MeetupDetail;
