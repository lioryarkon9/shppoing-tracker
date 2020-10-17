import {
  ADD_RECEIVED_ITEM,
  REMOVE_RECEIVED_ITEM,
} from "../actions/receivedItems.actions";

const initialState = [];

function receivedItems(state = initialState, action) {
  switch (action.type) {
    case ADD_RECEIVED_ITEM: {
      return [...state, action.payload.itemId];
    }

    case REMOVE_RECEIVED_ITEM: {
      return state.filter(({ id }) => id !== action.payload.itemId);
    }
    default:
      return state;
  }
}

export default receivedItems;
