import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';

import theme from '../../theme';
import Text from '../BaseComponents/Text';

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

const AppBarTab = ({ children, to, ...props }) => {
  const content = (
    <View style={styles.tabContainer} {...props}>
      <Text fontWeight="bold" style={styles.tabText}>
        {children}
      </Text>
    </View>
  );

  return to 
  ? (<Link to={to} {...props}>{content}</Link>) 
  : (<Pressable {...props}>{content}</Pressable>);
};

export default AppBarTab