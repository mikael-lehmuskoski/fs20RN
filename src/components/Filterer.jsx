import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useDebouncedCallback } from 'use-debounce';

import SortOrderPickerThing from './SortOrderPickerThing';

const styles = StyleSheet.create({
  searchBarContainer: {
    
  },
  searchBar: {
    margin: 15,
    marginBottom: 5,
    padding: 5,
    borderWidth: 1,
    borderWithColor: "black",
    borderRadius: 5,
    fontSize: 20,
  },
});

const Filterer = ({ handleSort, sortOptions, orderBy, orderDirection, defaultOrder, defaultDirection, handleSearch }) => {
  const [ search, setSearch ] = useState("");

  const debounced = useDebouncedCallback(
    (value) => {
      handleSearch(value);
    },
    500
  );

  return (
    <View>
      <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchBar}
            onChange={(e) => { 
              setSearch(e.target.value);
              debounced.callback(e.target.value);
            }}
            value={search}
          />
      </View>
      <View style={styles.sortOrderPickerThingContainer}>
        <SortOrderPickerThing 
          style={styles.sortOrderPickerThing}
          handleSort={handleSort} 
          sortOptions={sortOptions} 
          orderBy={orderBy || defaultOrder} 
          orderDirection={orderDirection || defaultDirection } 
        />
      </View>
    </View>
  );
};

export default Filterer;