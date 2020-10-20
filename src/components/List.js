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

import { withFormatAndCurrencyPrice, byDeliveryEstimationDate } from "../utils";

import { ListCell, ListItem, ListItemContainer } from "./commonStyled";
import AddShoppingItemWidget from "./AddShoppingItemWidget";
import ShoppingItem from "./ShoppingItem";

const List = ({
  pageMode,
  boughtItems,
  onlineStores,
  receivedItems,
  sumOrdersByStore,
  isAddingShoppingItem,
  currency,
  closeAddShoppingItemWidget,
}) => {
  const { pathname: currentPage } = useLocation();

  const listItemsByType = {
    boughtItems: Object.values(boughtItems).sort(byDeliveryEstimationDate),
    receivedItems: receivedItems.sort(byDeliveryEstimationDate),
    sumOrdersByStore,
  };
  const currentListItemsType = getListItemsType({ currentPage, pageMode });

  const formatPrice = withFormatAndCurrencyPrice(currency.id);

  const renderOnlineStore = ({ id, sumOrders }) => (
    <ListItemContainer key={id}>
      <ListItem>
        <ListCell pageMode="onlineStores">{onlineStores[id].name}</ListCell>
        <ListCell pageMode="onlineStores">{formatPrice(sumOrders)}</ListCell>
      </ListItem>
    </ListItemContainer>
  );

  return (
    <div>
      {currentPage === "/bought" &&
        pageMode === "shoppingItems" &&
        isAddingShoppingItem && (
          <ListItemContainer>
            <AddShoppingItemWidget closeWidget={closeAddShoppingItemWidget} />
          </ListItemContainer>
        )}

      {Object.values(listItemsByType[currentListItemsType]).map(
        currentListItemsType === "sumOrdersByStore"
          ? renderOnlineStore
          : (shoppingItem) => (
              <ShoppingItem
                key={shoppingItem.id}
                id={shoppingItem.id}
                name={shoppingItem.name}
                onlineStoreId={shoppingItem.onlineStoreId}
                price={shoppingItem.price}
                deliveryEstimationDate={shoppingItem.deliveryEstimationDate}
                pageMode={pageMode}
              />
            )
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
