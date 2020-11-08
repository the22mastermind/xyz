const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_DONATION':
      return {
        ...state,
        data: action.payload,
      };
    case 'SHOW_MESSAGE':
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
