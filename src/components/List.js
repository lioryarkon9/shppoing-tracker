import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";

import {
  boughtItemsWithProperCurrencySelector,
  onlineStoresSelector,
  receivedItemsSelector,
  receivedItemsIdsSelector,
  sumOrdersByStoreSelector,
  currencySelector,
} from "../redux/selectors";

import {
  addReceivedItem,
  removeReceievedItem,
} from "../redux/actions/receivedItems.actions";

import { withFormatAndCurrencyPrice } from "../utils";

import { ListCell, ListItem } from "./commonStyled";
import AddShoppingItemWidget from "./AddShoppingItemWidget";

const List = ({
  pageMode,
  boughtItems,
  onlineStores,
  receivedItems,
  receivedItemsIds,
  sumOrdersByStore,
  isAddingShoppingItem,
  currency,
  addReceivedItem,
  removeReceievedItem,
  closeAddShoppingItemWidget,
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
  }) => {
    if (currentPage === "/bought" && receivedItemsIds.includes(id)) {
      return null;
    }

    const receivedButtonConfig = {
      label: receivedItemsIds.includes(id) ? "Un-receive" : "Receive",
      action: receivedItemsIds.includes(id)
        ? removeReceievedItem
        : addReceivedItem,
    };

    return (
      <Fragment key={id}>
        <ListItem>
          <ListCell>{name}</ListCell>
          <ListCell>{onlineStores[onlineStoreId].name}</ListCell>
          <ListCell>{formatPrice(price)}</ListCell>
          <ListCell>{deliveryEstimationDate}</ListCell>
        </ListItem>
        <Received>
          <button onClick={() => receivedButtonConfig.action(id)}>
            {receivedButtonConfig.label}
          </button>
        </Received>
      </Fragment>
    );
  };

  const renderOnlineStore = ({ id, sumOrders }) => (
    <ListItem key={id}>
      <ListCell pageMode="onlineStores">{onlineStores[id].name}</ListCell>
      <ListCell pageMode="onlineStores">{formatPrice(sumOrders)}</ListCell>
    </ListItem>
  );

  return (
    <div>
      {isAddingShoppingItem && (
        <AddShoppingItemWidget closeWidget={closeAddShoppingItemWidget} />
      )}

      {Object.values(listItemsByType[currentListItemsType]).map(
        currentListItemsType === "sumOrdersByStore"
          ? renderOnlineStore
          : renderShoppingItem
      )}
    </div>
  );
};

const Received = styled.div`
  display: flex;
  justify-content: flex-end;
`;

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
  receivedItemsIds: receivedItemsIdsSelector(state),
  sumOrdersByStore: sumOrdersByStoreSelector(state),
  currency: currencySelector(state),
});

export default connect(mapStateToProps, {
  addReceivedItem,
  removeReceievedItem,
})(List);
