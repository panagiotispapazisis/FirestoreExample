const initialState = {
  Todo: [],
};

export function TodoReducer(state = initialState, action) {
  if (action.type === "ADDTODO") {
    return {
      Todo: [
        ...state.Todo,
        {
          TodoDoc: action.payload.doc,
        },
      ],
    };
  } else {
    return state;
  }
}
