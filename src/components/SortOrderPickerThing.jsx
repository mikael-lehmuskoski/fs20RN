import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  sortOrderPickerThingContainer: {
    padding: 15,
    paddingTop: 5,
  },
  sortOrderPickerThing: {
    borderWidth: 1,
    borderWithColor: "black",
    borderRadius: 5,
    fontSize: 20,
  }
});

const optionPoolGenerator = (sortOptions) => {
  const arr = [];
  sortOptions.orderBy.map((orderBy) => {
    arr.push(
      ...sortOptions.orderDirection.map(orderDirection => { 
        return {
          key: `${orderBy.label}${orderDirection.label}`,
          label: `${orderBy.label}${orderDirection.label}`,
          value: JSON.stringify({ 
            orderBy: orderBy.value,
            orderDirection: orderDirection.value
          })
        };
      })
    );
  });
  return arr;
};

const SortOrderPickerThing = ({ handleSort, sortOptions, orderBy, orderDirection }) => {
  return (
    <View style={styles.sortOrderPickerThingContainer}>
      <RNPickerSelect
        style={styles.sortOrderPickerThing}
        onValueChange={(value) => handleSort(value)}
        items={optionPoolGenerator(sortOptions)}
        itemKey={`${orderBy.label}${orderDirection.label}`}
        value={`${orderBy.label}${orderDirection.label}`}
      />
    </View>
  );
};

export default SortOrderPickerThing;