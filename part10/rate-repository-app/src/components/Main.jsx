import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList from '../components/Routes/Repo/AllRepo/RepositoryList'
import AppBar from './AppBar/AppBar';
import SignIn from './Routes/SignIn/SignIn';
import SingleRepository from './Routes/Repo/SingleRepo/SingleRepository';
import CreateReview from './Routes/CreateReview/CreateReview';
import SignUp from './Routes/SignUp/SignUp';
import MyReviews from './Routes/MyReviews/MyReviews';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.mainBackground,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="sign-in" element={<SignIn />} exact />
        <Route path="repositories/:id" element={<SingleRepository />} exact />
        <Route path="create-review" element={<CreateReview />} exact />
        <Route path="sign-up" element={<SignUp />} exact />
        <Route path="my-reviews" element={<MyReviews />} exact />
        <Route path="*" element={<Navigate to="/" replace />} /> 
      </Routes>
    </View>
  );
};
//path="*" is a wildcard that return to undefined ot non matching route 

export default Main;