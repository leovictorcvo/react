import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const RestaurantDetail = ({ restaurant }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: restaurant.image_url }} />
      <Text style={styles.name}>{restaurant.name}</Text>
      <Text style={styles.review}>
        {restaurant.rating} Stars, {restaurant.review_count} Reviews
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 10
  },
  image: {
    width: 250,
    height: 120,
    borderRadius: 4,
    marginBottom: 5
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  review: {
    fontSize: 12,
    color: '#999'
  }
});

export default RestaurantDetail;
