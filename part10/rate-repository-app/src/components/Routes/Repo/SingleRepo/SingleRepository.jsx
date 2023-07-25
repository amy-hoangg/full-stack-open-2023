import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { FlatList, StyleSheet, View } from 'react-native';

import { GET_REPOSITORY } from '../graphql/queries';
import ReviewItem from './ReviewItem';
import RepositoryInfo from './RepositoryInfo';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  reviewItem: {
    padding: 15,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { id } = useParams();
  const variables = { id, reviewsFirst: 3 };

  const { data, loading, fetchMore } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables,
  });

  const repository = data?.repository;

  const handleFetchMore = () => {
    const canFetchMore = !loading && repository?.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        ...variables,
        reviewsAfter: repository.reviews.pageInfo.endCursor,
      },
    });
  };

  const reviewNodes = repository
    ? repository.reviews.edges.map(({ node }) => node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => (
        <ReviewItem 
        style={styles.reviewItem} 
        review={item} />
      )}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() =>
        repository 
        ? <RepositoryInfo repository={repository} /> 
        : null
      }
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={handleFetchMore}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;