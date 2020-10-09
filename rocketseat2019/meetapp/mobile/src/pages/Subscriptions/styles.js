import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const MeetupsList = styled.FlatList.attrs({
  showVerticalScrollIndicator: false,
})`
  margin-top: 30px;
  padding: 0 20px;
`;
