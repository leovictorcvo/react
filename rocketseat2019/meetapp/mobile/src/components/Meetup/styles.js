import styled from 'styled-components/native';
import Button from '../Button';

export const Container = styled.View`
  flex: 1;
  background: #fff;
  border-radius: 4px;
  margin-bottom: 20px;
  overflow: hidden;
`;

export const Banner = styled.Image`
  height: 150px;
  background: #ccc;
`;

export const DetailsContainer = styled.View`
  padding: 10px 20px;
`;

export const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

export const SubmitButton = styled(Button)`
  margin: 10px 0;
`;

export const DisabledText = styled.Text`
  margin: 10px 0;
  font-size: 20px;
  font-weight: bold;
  color: #f94d6a;
  text-align: center;
`;
