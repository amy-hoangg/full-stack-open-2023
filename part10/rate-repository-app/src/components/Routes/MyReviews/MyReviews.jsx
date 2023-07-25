import { FlatList, View, StyleSheet} from 'react-native';
import { useMutation } from '@apollo/client';
import useCurrentUser from '../hooks/useCurrentUser';
import { DELETE_REVIEW } from '../graphql/mutations';
import ReviewItemWithActions from './ReviewItemWithActions';

const styles = StyleSheet.create({
  reviewItemWrapper: {
    padding: 15,
    backgroundColor: 'white',
  },
  separator: {
    height: 10,
  },
  actionsContainer: {
    marginTop: 15,
    flexDirection: 'row',
  },
  actionButton: {
    flexGrow: 1,
    marginRight: 15,
  },
  lastActionButton: {
    marginRight: 0,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { currentUser, refetch } = useCurrentUser({
    includeReviews: true,
  });

  const [deleteReview] = useMutation(DELETE_REVIEW);
  const reviewEdges = currentUser?.reviews.edges ?? [];
  const reviewNodes = reviewEdges.map(({ node }) => node);

  const onDelete = async (id) => {
    await deleteReview({ variables: { id } });
    refetch();
  };

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => (
        <ReviewItemWithActions
          review={item}
          onDelete={() => onDelete(item.id)}
        />
      )}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default MyReviews;