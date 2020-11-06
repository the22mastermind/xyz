import React, {createContext, useReducer} from 'react';
import reducer from './reducer';

const initialState = {
  data: {},
};

export const DataContext = createContext(initialState);
export const DataProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  function addDonation(items) {
    dispatch({
      type: 'ADD_DONATION',
      payload: items,
    });
  }

  return (
    <DataContext.Provider
      value={{
        data: state.data,
        addDonation: addDonation,
      }}>
      {children}
    </DataContext.Provider>
  );
};
