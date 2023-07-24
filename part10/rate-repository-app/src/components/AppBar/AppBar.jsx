import { View, ScrollView, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { useApolloClient, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-native';

import theme from '../../theme';
import { useAuthStorage } from '../../hooks/useAuthStorage';
import { GET_CURRENT_USER } from '../../graphql/queries';


import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
  },
  scrollView: {
    flexDirection: 'row',
  },
  tabTouchable: {
    flexGrow: 0,
  },
  tabContainer: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    color: 'white',
  },
});

const AppBar = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const navigate = useNavigate();

  const { data } = useQuery(GET_CURRENT_USER);
  const currentUser = data?.me;

  const onSignOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate('/');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} horizontal>
        <AppBarTab to="/">Repositories</AppBarTab>
        {currentUser 
        ? (<AppBarTab onPress={onSignOut}>Sign out</AppBarTab>) 
        : (<AppBarTab to="/sign-in">Sign in</AppBarTab>)
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;