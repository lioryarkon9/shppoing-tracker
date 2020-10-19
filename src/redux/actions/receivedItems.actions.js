export const ADD_RECEIVED_ITEM = "[received_items] ADD_RECEIVED_ITEM";
export const REMOVE_RECEIVED_ITEM = "[received_items] REMOVE_RECEIVED_ITEM";

export const addReceivedItem = (itemId) => ({
  type: ADD_RECEIVED_ITEM,
  payload: { itemId },
});

export const removeReceievedItem = (itemId) => ({
  type: REMOVE_RECEIVED_ITEM,
  payload: { itemId },
});
