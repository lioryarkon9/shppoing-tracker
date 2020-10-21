import generateGuid from "uuid-random";

import { SET_BOUGHT_ITEM } from "../actions/boughtItems.actions";

const initialState = {};

function boughtItemsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_BOUGHT_ITEM: {
      const { id: payloadId } = action.payload;
      const boughtItemId = payloadId ? payloadId : generateGuid();

      return {
        ...state,
        [boughtItemId]: {
          ...action.payload,
          id: boughtItemId,
        },
      };
    }
    default:
      return state;
  }
}

export default boughtItemsReducer;
