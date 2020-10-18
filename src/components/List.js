import React from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";

import {
  boughtItemsWithProperCurrencySelector,
  onlineStoresSelector,
  receivedItemsSelector,
  sumOrdersByStoreSelector,
  currencySelector,
} from "../redux/selectors";

import { withFormatAndCurrencyPrice } from "../utils";

import { ListCell, ListItem } from "./commonStyled";
import AddShoppingItemWidget from "./AddShoppingItemWidget";

const List = ({
  pageMode,
  boughtItems,
  onlineStores,
  receivedItems,
  sumOrdersByStore,
  isAddingShoppingItem,
  currency,
}) => {
  const { pathname: currentPage } = useLocation();

  const listItemsByType = { boughtItems, receivedItems, sumOrdersByStore };
  const currentListItemsType = getListItemsType({ currentPage, pageMode });

  const formatPrice = withFormatAndCurrencyPrice(currency.id);

  const renderShoppingItem = ({
    id,
    name,
    onlineStoreId,
    price,
    deliveryEstimationDate,
  }) => (
    <ListItem key={id}>
      <ListCell>{name}</ListCell>
      <ListCell>{onlineStores[onlineStoreId].name}</ListCell>
      <ListCell>{formatPrice(price)}</ListCell>
      <ListCell>{deliveryEstimationDate}</ListCell>
    </ListItem>
  );

  const renderOnlineStore = ({ id, sumOrders }) => (
    <ListItem key={id}>
      <ListCell pageMode="onlineStores">{onlineStores[id].name}</ListCell>
      <ListCell pageMode="onlineStores">{formatPrice(sumOrders)}</ListCell>
    </ListItem>
  );

  return (
    <div>
      {isAddingShoppingItem && <AddShoppingItemWidget />}

      {listItemsByType[currentListItemsType].map(
        currentListItemsType === "sumOrdersByStore"
          ? renderOnlineStore
          : renderShoppingItem
      )}
    </div>
  );
};

const getListItemsType = ({ currentPage, pageMode }) => {
  if (currentPage === "/received") {
    return "receivedItems";
  }

  if (pageMode === "shoppingItems") {
    return "boughtItems";
  }

  return "sumOrdersByStore";
};

const mapStateToProps = (state) => ({
  boughtItems: boughtItemsWithProperCurrencySelector(state),
  onlineStores: onlineStoresSelector(state),
  receivedItems: receivedItemsSelector(state),
  sumOrdersByStore: sumOrdersByStoreSelector(state),
  currency: currencySelector(state),
});

export default connect(mapStateToProps)(List);
