import * as types from '../actions/action-types';

export const initialState = {
  visibilityFilter: 'SHOW_ALL',
  order: 'ASC',
  entities: []
};

  // increment id for the todo entities
let nextTodoID = 1;

export default (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_TODO:
        // set and increment the next todo id
      action.payload.id = nextTodoID++;
      return {
        ...state,
        entities: [...state.entities, action.payload],
      };

    case types.SET_VISIBILITY_FILTER:
      return {
        ...state,
        visibilityFilter: action.payload
      };

    case types.SET_TODO_ORDER:
      return {
        ...state,
        order: action.payload
      };

    case types.TOGGLE_TODO_DONE:
      return {
        ...state,
        entities: state.entities.map(entity =>
          (entity.id === action.payload)
            ? Object.assign({}, entity, {
                done: !entity.done
              })
            : entity
        )
      };

    default:
      return state;
  }
};
