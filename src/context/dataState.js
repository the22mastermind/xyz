import React, {createContext, useReducer} from 'react';
import reducer from './reducer';

const initialState = {
  message: {},
};

export const DataContext = createContext(initialState);
export const DataProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  function showMessage(data) {
    dispatch({
      type: 'SHOW_MESSAGE',
      payload: data,
    });
  }

  return (
    <DataContext.Provider
      value={{
        message: state.message,
        showMessage: showMessage,
      }}>
      {children}
    </DataContext.Provider>
  );
};
