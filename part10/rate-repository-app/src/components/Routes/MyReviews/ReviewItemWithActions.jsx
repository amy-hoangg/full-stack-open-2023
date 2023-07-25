import { View, StyleSheet} from 'react-native';
import { useNavigate } from 'react-router-native';

import ReviewItem from './ReviewItem';
import Button from './Button';
import DeleteReviewButton from './DeleteReviewButton';

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
  
const ReviewItemWithActions = ({ review, onDelete }) => {
  const navigate = useNavigate();

  return (
    <View style={styles.reviewItemWrapper}>
      <ReviewItem review={review} title={review.repository.fullName} />
      <View style={styles.actionsContainer}>
        
        <Button
          style={styles.actionButton}
          onPress={() => navigate(`/repositories/${review.repository.id}`)}
        >
          View repository
        </Button>

        <DeleteReviewButton
          onPress={onDelete}
          style={[styles.actionButton, styles.lastActionButton]}
        />
      </View>
    </View>
  );
};

export default ReviewItemWithActions;