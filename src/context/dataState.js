import React, {createContext, useReducer} from 'react';
import reducer from './reducer';

const initialState = {
  data: {},
  message: {},
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

  function showMessage(data) {
    dispatch({
      type: 'SHOW_MESSAGE',
      payload: data,
    });
  }

  return (
    <DataContext.Provider
      value={{
        data: state.data,
        addDonation: addDonation,
        message: state.message,
        showMessage: showMessage,
      }}>
      {children}
    </DataContext.Provider>
  );
};
