
const filterReducer = (state = '', action) => {
    switch (action.type) {
      case 'SET_FILTER':
        return action.payload;
      default:
        return state;
    }
  };
  
  export const filterChange = (filterText) => {
    return {
      type: 'SET_FILTER',
      payload: filterText,
    };
  };
  
  export default filterReducer;
  
