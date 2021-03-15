const togglable = (state = {}, action) => {
  switch (action.type) {
    case "ADD_TOGGLABLE":
      return {
        id: action.id,
        visibility: false,
      };
    case "SET_VISIBLE":
      if (state.id !== action.id) {
        return state;
      }
      return Object.assign({}, state, {
        visibility: !state.visibility,
      });
    default:
      return state;
  }
};

const togglableReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_TOGGLABLE":
      return [...state, togglable(undefined, action)];
    case "SET_VISIBLE":
      return state.map((t) => togglable(t, action));
    default:
      return state;
  }
};

export const addTogglable = (id) => {
  return {
    type: "ADD_TOGGLABLE",
    id,
  };
};


export const toggleVisibility = (id) => {
  return {
      type: "SET_VISIBLE",
      id
  };
};

export default togglableReducer;