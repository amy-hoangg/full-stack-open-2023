import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

//custom hook
//retrieve a list of repos
//handling pagination
const useRepositories = (variables) => {
  //varibles used in query 
  const { 
    data, //response data from graphql query
    loading, //boolean whether the query is in progress
    fetchMore, //function provided by apollo client to fetch more data for pagination
    ...result //additional info about query result, such as error or network status
  } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  //define to handle pagination
  const handleFetchMore = () => {
    const canFetchMore = !loading //whether more data can be fetched based on the loading status
    && data?.repositories.pageInfo.hasNextPage; //there is a data + nextPage con ko

    if (!canFetchMore) {
      return;
    }
    
    //if there is more data -> new varibles to requestthe next set of data after the current end cursor
    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  return {
    repositories: data?.repositories, //it will be undefined if the query is still loading or if there is an error
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepositories;


