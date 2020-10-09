import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import SearchBar from '../components/SearchBar';
import RestaurantsList from '../components/RestaurantsList';
import useRestaurants from '../hooks/useRestaurants';

const SearchScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchApi, results, errorMessage] = useRestaurants();

  const filterResultsByPrice = price => {
    return results.filter(result => price.includes(result.price));
  };

  return (
    <View style={styles.container}>
      <SearchBar
        term={searchTerm}
        onTermChange={newTerm => setSearchTerm(newTerm)}
        onTermSubmit={() => searchApi(searchTerm)}
      />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <ScrollView showsVerticalScrollIndicator={false}>
        <RestaurantsList
          title='Cost Effective'
          results={filterResultsByPrice(['$'])}
        />
        <RestaurantsList
          title='Bit Pricier'
          results={filterResultsByPrice(['$$'])}
        />
        <RestaurantsList
          title='Big Spender'
          results={filterResultsByPrice(['$$$', '$$$$'])}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15
  }
});

export default SearchScreen;
