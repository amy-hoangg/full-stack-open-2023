import React from 'react';
import { View, StyleSheet} from 'react-native';
import { Searchbar } from 'react-native-paper';
import Picker from './Picker';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  headerContainer: {
    padding: 15,
  },
  searchContainer: {
    marginBottom: 15,
  },
});


const orderByOptions = [
  { label: 'Latest repositories', value: 'latest' },
  {
    label: 'Highest rated repositories',
    value: 'highestRating',
  },
  {
    label: 'Lowest rated repositories',
    value: 'lowestRating',
  },
];


const RepositoryListHeader = ({
  onOrderByChange,
  orderBy,
  searchKeyword,
  onSearchKeywordChange,
}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.searchContainer}>
        <Searchbar
          placeholder="Search repositories"
          value={searchKeyword}
          onChangeText={onSearchKeywordChange}
        />
      </View>
      <Picker
        onChange={onOrderByChange}
        value={orderBy}
        options={orderByOptions}
      />
    </View>
  );
};

export default RepositoryListHeader;