import React, { useState } from "react";
import Dropdown from "react-dropdown";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import styled from "styled-components";

import "react-dropdown/style.css";
import "react-datepicker/dist/react-datepicker.css";

import { SMALL_SCREEN } from "../theme";

import {
  onlineStoresSelector,
  currentCurrencySelector,
} from "../redux/selectors";
import { setBoughtItem } from "../redux/actions/boughtItems.actions";

import { ListItem, ListCell } from "./commonStyled";

const AddShoppingItemWidget = ({
  onlineStores,
  currentCurrency,
  setBoughtItem,
}) => {
  const [name, setName] = useState("");
  const [onlineStoreId, setOnlineStoreId] = useState("");
  const [price, setPrice] = useState("");
  const [deliveryEstimationDate, setDeliveryEstimationDate] = useState("");

  const confirmShoppingItem = () => {
    setBoughtItem({
      name,
      onlineStoreId,
      price,
      currencyId: currentCurrency.id,
      deliveryEstimationDate,
    });
  };

  return (
    <>
      <ListItem>
        <ListCell>
          <input
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
            placeholder="New Item Name"
          />
        </ListCell>
        <ListCell>
          <Dropdown
            value={onlineStoreId}
            options={Object.values(onlineStores).map(({ id, name }) => ({
              value: id,
              label: name,
            }))}
            onChange={({ value }) => setOnlineStoreId(value)}
            placeholder="Store bought from"
          />
        </ListCell>
        <ListCell>
          <input
            type="number"
            value={price}
            onChange={(event) => setPrice(event.currentTarget.value)}
            placeholder="Item's Price"
          />
        </ListCell>
        <ListCell>
          <DatePicker
            placeholderText="Due to arrive on"
            value={deliveryEstimationDate}
            selected={
              deliveryEstimationDate
                ? new Date(deliveryEstimationDate)
                : new Date()
            }
            onChange={(selectedDate) =>
              setDeliveryEstimationDate(selectedDate.toJSON())
            }
            minDate={new Date()}
          />
        </ListCell>
      </ListItem>

      <Confirm>
        <button onClick={confirmShoppingItem}>Confirm</button>
      </Confirm>
    </>
  );
};

const Confirm = styled.div`
  text-align: center;

  @media ${SMALL_SCREEN} {
    width: 100%;
  }
`;

const mapStateToProps = (state) => ({
  onlineStores: onlineStoresSelector(state),
  currentCurrency: currentCurrencySelector(state),
});

export default connect(mapStateToProps, { setBoughtItem })(
  AddShoppingItemWidget
);
