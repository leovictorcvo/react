import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

import yelp from '../api/yelp';

const RestaurantDetailScreen = ({ navigation }) => {
  const restaurantId = navigation.getParam('id');
  const [restaurant, setRestaurant] = useState(null);

  const getRestaurant = async id => {
    const { data } = await yelp.get(`/${id}`);
    setRestaurant(data);
  };

  useEffect(() => {
    getRestaurant(restaurantId);
  }, []);

  if (!restaurant) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{restaurant.name}</Text>
      {restaurant.location.display_address.map(addr => (
        <Text key={addr} style={styles.address}>
          {addr}
        </Text>
      ))}
      <Text style={styles.phone}>Phone: {restaurant.display_phone}</Text>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={restaurant.photos}
        keyExtractor={photo => photo}
        renderItem={({ item }) => {
          return <Image style={styles.image} source={{ uri: item }} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 15
  },
  address: {
    fontSize: 15,
    color: '#777'
  },
  phone: {
    marginVertical: 10
  },
  image: {
    height: 200,
    width: 300,
    borderRadius: 4,
    marginRight: 10
  }
});

RestaurantDetailScreen.navigationOptions = {
  title: ''
};

export default RestaurantDetailScreen;
