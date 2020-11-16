const reducer = (state, action) => {
  switch (action.type) {
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
