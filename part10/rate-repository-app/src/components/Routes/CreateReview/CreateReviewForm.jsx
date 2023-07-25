import { StyleSheet, View } from 'react-native';

import Button from './Button';
import FormikTextInput from './FormikTextInput';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  fieldContainer: {
    marginBottom: 15,
  },
});


const CreateReviewForm = ({ onSubmit }) => {
    return (
      <View style={styles.container}>
        <View style={styles.fieldContainer}>
          <FormikTextInput placeholder="Repository owner name" name="ownerName" />
        </View>
  
        <View style={styles.fieldContainer}>
          <FormikTextInput placeholder="Repository name" name="repositoryName" />
        </View>
  
        <View style={styles.fieldContainer}>
          <FormikTextInput
            placeholder="Rating between 0 and 100"
            keyboardType="numeric"
            name="rating"
          />
        </View>
  
        <View style={styles.fieldContainer}>
          <FormikTextInput placeholder="Review" name="text" multiline />
        </View>
  
        <Button onPress={onSubmit}>Create a review</Button>
      </View>
    );
  };

export default CreateReviewForm;