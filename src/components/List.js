import React from "react";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";

import {
  boughtItemsSelector,
  onlineStoresSelector,
  receivedItemsSelector,
} from "../redux/selectors";

import theme, { SMALL_SCREEN } from "../theme";

import { ListCell } from "./commonStyled";

const List = ({ pageMode, boughtItems, onlineStores, receivedItems }) => {
  const { pathname: currentPage } = useLocation();

  const listItemsByType = { boughtItems, onlineStores, receivedItems };
  const currentListItemsType = getListItemsType({ currentPage, pageMode });

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
      <ListCell>{price}</ListCell>
      <ListCell>{deliveryEstimationDate}</ListCell>
    </ListItem>
  );

  const renderOnlineStore = ({ id, name }) => (
    <ListItem key={id}>
      <ListCell pageMode="onlineStores">{name}</ListCell>
      <ListCell pageMode="onlineStores">Calculated</ListCell>
    </ListItem>
  );

  return (
    <div>
      {Object.values(listItemsByType[currentListItemsType]).map(
        currentListItemsType === "onlineStores"
          ? renderOnlineStore
          : renderShoppingItem
      )}
    </div>
  );
};

const ListItem = styled.div`
  display: flex;

  @media ${SMALL_SCREEN} {
    flex-wrap: wrap;
    box-shadow: 0 0 2px 0;
    margin-top: 5px;
    padding: 5px;
    border-radius: ${theme.borderRadius};
  }
`;

const getListItemsType = ({ currentPage, pageMode }) => {
  if (currentPage === "/received") {
    return "receivedItems";
  }

  if (pageMode === "shoppingItems") {
    return "boughtItems";
  }

  return "onlineStores";
};

const mapStateToProps = (state) => ({
  boughtItems: boughtItemsSelector(state),
  onlineStores: onlineStoresSelector(state),
  receivedItems: receivedItemsSelector(state),
});

export default connect(mapStateToProps)(List);