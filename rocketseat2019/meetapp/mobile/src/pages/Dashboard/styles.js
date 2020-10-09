import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const DateContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  padding: 15px;
`;

export const SelectDateButton = styled.TouchableOpacity`
  height: 30px;
  width: 30px;
  background: transparent;
`;

export const MeetupsList = styled.FlatList.attrs({
  showVerticalScrollIndicator: false,
})`
  margin-top: 10px;
  padding: 0 20px;
`;
