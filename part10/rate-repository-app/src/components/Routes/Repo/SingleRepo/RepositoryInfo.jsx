import { StyleSheet, View } from 'react-native';

import RepositoryItem from '../AllRepo/RepositoryItem';


const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  reviewItem: {
    padding: 15,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {
  return (
    <>
      <RepositoryItem 
      repository={repository} 
      showGithubLink />
      <ItemSeparator />
    </>
  );
};

export default RepositoryInfo