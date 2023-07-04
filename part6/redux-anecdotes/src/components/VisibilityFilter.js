import { filterChange } from '../reducers/filterReducer';
import { useDispatch } from 'react-redux';

const VisibilityFilter = () => {
  const dispatch = useDispatch();

  const handleFilterChange = (event) => {
    const filterValue = event.target.value;
    dispatch(filterChange(filterValue));//filter change o day la mot action creator
  };

  return (
    <div>
      filter
      <input 
        name="filter"
        onChange={handleFilterChange}
      />
    </div>
  );
};

export default VisibilityFilter;
