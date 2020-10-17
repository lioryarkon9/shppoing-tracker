export const SET_BOUGHT_ITEM = "[bought_items] SET_BOUGHT_ITEM";

export const setBoughtItem = ({
  id,
  name,
  onlineStoreId,
  price,
  currencyId,
  deliveryEstimationDate,
}) => ({
  type: SET_BOUGHT_ITEM,
  payload: {
    id,
    name,
    onlineStoreId,
    price,
    currencyId,
    deliveryEstimationDate,
  },
});
