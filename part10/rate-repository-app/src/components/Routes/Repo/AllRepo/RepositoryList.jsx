import React, { useState } from 'react';
import { useNavigate } from 'react-router-native';
import { useDebounce } from 'use-debounce';

import useRepositories from '../hooks/useRepositories';
import RepositoryListContainer from './RepositoryListContainer';

const variablesByOrderBy = {
  latest: {
    orderBy: 'CREATED_AT',
    orderDirection: 'DESC',
  },
  highestRating: {
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'DESC',
  },
  lowestRating: {
    orderBy: 'RATING_AVERAGE',
    orderDirection: 'ASC',
  },
};

const RepositoryList = () => {
  const navigate = useNavigate();
  const [orderBy, setOrderBy] = useState('latest');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

  const { repositories, fetchMore } = useRepositories({
    first: 8,
    ...variablesByOrderBy[orderBy],
    searchKeyword: debouncedSearchKeyword,
  });

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      orderBy={orderBy}
      onOrderByChange={(newOrderBy) => {
        setOrderBy(newOrderBy);
      }}
      onEndReach={onEndReach}
      searchKeyword={searchKeyword}
      onSearchKeywordChange={(keyword) => setSearchKeyword(keyword)}
      onRepositoryPress={(id) => {
        navigate(`/repositories/${id}`);
      }}
    />
  );
};

export default RepositoryList;