export const SET_ONLINE_STORE = "[online_stores] SET_ONLINE_STORE";

export const setOnlineStore = ({ id, name }) => ({
  type: SET_ONLINE_STORE,
  payload: { id, name },
});
