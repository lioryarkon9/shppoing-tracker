import generateGuid from "uuid-random";

import { SET_ONLINE_STORE } from "../actions/onlineStores.actions";

import { mockOnlineStores } from "../mocks/onlineStores.mocks";

// const initialState = {};

function onlineStoresReducer(state = mockOnlineStores, action) {
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
