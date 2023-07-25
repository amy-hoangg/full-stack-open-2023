import {  Alert } from 'react-native';
import Button from './Button';

const DeleteReviewButton = ({ onPress, ...props }) => {
    const alertButtons = [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => onPress(),
      },
    ];
  
    const deleteWithConfirmation = () => {
      Alert.alert(
        'Delete review',
        'Are you sure you want to delete this review?',
        alertButtons,
        { cancelable: false },
      );
    };
  
    return (
      <Button onPress={deleteWithConfirmation} color="error" {...props}>
        Delete review
      </Button>
    );
  };

export default DeleteReviewButton;