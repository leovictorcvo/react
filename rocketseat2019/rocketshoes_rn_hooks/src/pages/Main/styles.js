import styled from 'styled-components/native';
import {FlatList} from 'react-native';

export const Container = styled.View`
  padding: 30px;
  background-color: #141420;
`;
export const ProductList = styled(FlatList)``;

export const Product = styled.View`
  background: #fff;
  margin: 15px;
  padding: 10px;
  border-radius: 4px;
  width: 220px;
`;

export const ProductImage = styled.Image`
  height: 200px;
  width: 200px;
`;

export const ProductTitle = styled.Text`
  font-size: 16px;
  color: #333;
`;

export const ProductPrice = styled.Text`
  margin: 14px 0;
  font-size: 21px;
  font-weight: bold;
  color: #000;
`;

export const AddButton = styled.TouchableOpacity`
  background: #715fc1;
  border-radius: 4px;
  flex-direction: row;
  margin-top: auto;
  align-items: center;
`;

export const AmoutContainer = styled.View`
  background: rgba(0, 0, 0, 0.2);
  justify-content: center;
  align-items: center;
  padding: 12px;
`;

export const AmountText = styled.Text`
  font-size: 14px;
  color: #fff;
`;
export const ButtonText = styled.Text`
  flex: 1;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
`;
