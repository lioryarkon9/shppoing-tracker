import generateGuid from "uuid-random";

import { SET_ONLINE_STORE } from "../actions/onlineStores.actions";

const initialState = {
  "a20187f6-43e4-4699-b72c-950f48fc397c": {
    id: "a20187f6-43e4-4699-b72c-950f48fc397c",
    name: "Jerry and sons",
  },
  "ce5db757-8bb8-4c12-8c0a-72ae4618f95f": {
    id: "ce5db757-8bb8-4c12-8c0a-72ae4618f95f",
    name: "All-Star Electrics",
  },
  "986207ec-3f46-4593-8b74-a6af1f003e57": {
    id: "986207ec-3f46-4593-8b74-a6af1f003e57",
    name: "Amazon"
  },
  "680734b9-d376-43f7-b036-b5123da5342d": {
    id: "680734b9-d376-43f7-b036-b5123da5342d",
    name: "ebay"
  }
};

function onlineStoresReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ONLINE_STORE: {
      const { id: payloadId, name } = action.payload;
      const onlineStoreId = payloadId ? payloadId : generateGuid();

      return { ...state, [onlineStoreId]: { id: onlineStoreId, name } };
    }

    default:
      return state;
  }
}

export default onlineStoresReducer;
