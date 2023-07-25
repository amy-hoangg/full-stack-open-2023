import React from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';

import RepositoryItem from './RepositoryItem';
import RepositoryListHeader from './RepositoryListHeader';

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

const ItemSeparator = () => <View style={styles.separator} />;


class RepositoryListContainer extends React.Component {
  //method
  renderHeader = () => {
    const { onOrderByChange, orderBy, searchKeyword, onSearchKeywordChange } =
      this.props;

    return (
      <RepositoryListHeader
        onOrderByChange={onOrderByChange}
        orderBy={orderBy}
        searchKeyword={searchKeyword}
        onSearchKeywordChange={onSearchKeywordChange}
      />
    );
  };

  render() {
    const { repositories, onEndReach, onRepositoryPress } 
    = this.props;

    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <Pressable key={item.id} onPress={() => onRepositoryPress(item.id)}>
            <RepositoryItem repository={item} />
          </Pressable>
        )}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={this.renderHeader} //use renderHeader
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
        initialNumToRender={8}
      />
    );
  }
}

export default RepositoryListContainer

//a lifecycle method that is automatically called by React when the component is rendered.