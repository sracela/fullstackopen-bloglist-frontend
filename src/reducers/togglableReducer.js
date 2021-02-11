const togglableReducer = (state = false, action) => {
  switch (action.type) {
      case "SET_VISIBLE":
          return action.visibility;
    default:
      return state;
  }
};

export const toggleVisibility = (visibility) => {
  return {
      type: "SET_VISIBLE",
      visibility
  };
};

export default togglableReducer;