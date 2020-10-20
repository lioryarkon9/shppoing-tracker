import React from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";

import { withFormatAndCurrencyPrice } from "../utils";

import {
  receivedItemsIdsSelector,
  currencySelector,
  onlineStoresSelector,
} from "../redux/selectors";
import {
  removeReceievedItem,
  addReceivedItem,
} from "../redux/actions/receivedItems.actions";

import { ListItem, ListCell, ListItemContainer } from "./commonStyled";

const ShoppingItem = ({
  id,
  name,
  onlineStoreId,
  price,
  deliveryEstimationDate,
  receivedItemsIds,
  addReceivedItem,
  removeReceievedItem,
  currency,
  onlineStores,
}) => {
  const { pathname: currentPage } = useLocation();
  const isReceived = receivedItemsIds.includes(id);

  if (currentPage === "/bought" && isReceived) {
    return null;
  }

  const formatPrice = withFormatAndCurrencyPrice(currency.id);

  const receivedButtonConfig = {
    label: isReceived ? "Un-receive" : "Receive",
    action: isReceived ? removeReceievedItem : addReceivedItem,
  };

  return (
    <ListItemContainer>
      <ListItem>
        <ListCell>{name}</ListCell>
        <ListCell>{onlineStores[onlineStoreId].name}</ListCell>
        <ListCell>{formatPrice(price)}</ListCell>
        <ListCell>{new Date(deliveryEstimationDate).toDateString()}</ListCell>
      </ListItem>

      <Received>
        <button onClick={() => receivedButtonConfig.action(id)}>
          {receivedButtonConfig.label}
        </button>
      </Received>
    </ListItemContainer>
  );
};

const Received = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const mapStateToProps = (state) => ({
  receivedItemsIds: receivedItemsIdsSelector(state),
  currency: currencySelector(state),
  onlineStores: onlineStoresSelector(state),
});

export default connect(mapStateToProps, {
  addReceivedItem,
  removeReceievedItem,
})(ShoppingItem);
