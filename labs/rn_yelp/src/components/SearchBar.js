import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const SearchBar = ({ term, onTermChange, onTermSubmit }) => {
  return (
    <View style={styles.container}>
      <Feather name='search' style={styles.searchIcon} />
      <TextInput
        style={styles.input}
        placeholder='search'
        autoCapitalize='none'
        autoCorrect={false}
        value={term}
        onChangeText={onTermChange}
        onEndEditing={onTermSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f0eeee',
    borderRadius: 5,
    height: 50,
    marginBottom: 10
  },
  searchIcon: {
    fontSize: 30,
    alignSelf: 'center',
    marginHorizontal: 15
  },
  input: {
    flex: 1,
    fontSize: 18
  }
});

export default SearchBar;
