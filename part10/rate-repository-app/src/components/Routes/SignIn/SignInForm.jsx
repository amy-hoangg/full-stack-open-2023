import { StyleSheet, View } from 'react-native';

import Button from '../../BaseComponents/Button';
import FormikTextInput from '../../BaseComponents/FormikTextInput';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  fieldContainer: {
    marginBottom: 15,
  },
});


const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <FormikTextInput name="username" placeholder="Username" />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput
          name="password"
          placeholder="Password"
          secureTextEntry
        />
      </View>
      <Button onPress={onSubmit}>Sign in</Button>
    </View>
  );
};

export default SignInForm;