import styled from 'styled-components/native';
import {FlatList} from 'react-native';

export const Container = styled.View`
  background-color: #141420;
  padding: 20px;
`;

export const CartContainer = styled.View`
  flex: 1 auto;
  height: 100%;
  background-color: #fff;
  border-radius: 4px;
  padding: 10px;
  justify-content: space-between;
`;

export const CartList = styled(FlatList)`
  flex: 6;
`;

export const Product = styled.View`
  flex: 1 0;
  margin-bottom: 5px;
`;

export const ProductDetail = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

export const ProductImage = styled.Image`
  height: 80px;
  width: 80px;
`;

export const ProductDescription = styled.View`
  flex: 1;
`;

export const ProductText = styled.Text`
  font-size: 14px;
  color: #333;
`;

export const ProductPrice = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #000;
`;

export const AmountPriceContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #eee;
  padding: 7px;
`;

export const AmountContainer = styled.View`
  flex: 1 auto;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 7px 15px;
`;

export const IncrementDecrementButton = styled.TouchableOpacity``;

export const AmountText = styled.Text`
  font-size: 14px;
  color: #666;
  margin: 0 10px;
`;

export const PriceText = styled.Text`
  font-size: 16px;
  color: #000;
  font-weight: bold;
`;

export const SummaryContainer = styled.View`
  flex: 2;
  flex-wrap: wrap;
`;

export const PriceContainer = styled.View`
  flex: 1;
  align-items: center;
`;

export const TotalText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #999;
`;

export const TotalPriceText = styled.Text`
  font-size: 30px;
  font-weight: bold;
  color: #000;
`;

export const FinishButton = styled.TouchableOpacity`
  background: #715fc1;
  border-radius: 4px;
  flex-direction: row;
  margin-top: 15px;
  align-items: center;
  padding: 13px 0;
`;

export const ButtonText = styled.Text`
  flex: 1;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
`;

export const EmptyContainer = styled.View`
  height: 100%;
  flex: 1 auto;
  justify-content: center;
  align-items: center;
`;

export const EmptyText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #7159c1;
`;
