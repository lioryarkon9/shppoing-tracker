import React, { useState } from "react";
import Dropdown from "react-dropdown";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import styled from "styled-components";

import "react-dropdown/style.css";
import "react-datepicker/dist/react-datepicker.css";

import { SMALL_SCREEN } from "../theme";

import { onlineStoresSelector, currencySelector } from "../redux/selectors";
import { setBoughtItem } from "../redux/actions/boughtItems.actions";

import { ListItem, ListCell } from "./commonStyled";

const AddShoppingItemWidget = ({
  onlineStores,
  currency,
  setBoughtItem,
  closeWidget,
}) => {
  const [name, setName] = useState("");
  const [onlineStoreId, setOnlineStoreId] = useState("");
  const [price, setPrice] = useState("");
  const [deliveryEstimationDate, setDeliveryEstimationDate] = useState("");

  const [validationMessage, setValidationMessage] = useState("");

  const confirmShoppingItem = () => {
    setValidationMessage("");

    const shoppingItemValidationMessage = validateShoppingItem({
      name,
      onlineStoreId,
      price,
      deliveryEstimationDate,
    });

    if (shoppingItemValidationMessage) {
      setValidationMessage(shoppingItemValidationMessage);

      return;
    }

    setBoughtItem({
      name,
      onlineStoreId,
      price: parseFloat(price),
      currencyId: currency.id,
      deliveryEstimationDate,
    });

    closeWidget();
  };

  return (
    <div>
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
            placeholder={`Item's Price in ${
              currency.id === "ils" ? "NIS" : "USD"
            }`}
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

      {validationMessage && (
        <ValidationMessage>{validationMessage}</ValidationMessage>
      )}

      <Confirm>
        <button onClick={confirmShoppingItem}>Confirm</button>
      </Confirm>
    </div>
  );
};

const ValidationMessage = styled.div`
  color: red;
  text-align: center;
  padding: 5px 0;
`;

const Confirm = styled.div`
  text-align: center;

  @media ${SMALL_SCREEN} {
    width: 100%;
  }
`;

const validateShoppingItem = ({
  name,
  onlineStoreId,
  price,
  deliveryEstimationDate,
}) => {
  if (name.length < 3 || name.length > 20) {
    return "Name must be between 3 to 20 chars";
  }

  if (!onlineStoreId) {
    return "You must choose an online store";
  }

  if (isNaN(parseInt(price)) || parseInt(price) <= 0) {
    return "You must enter a positive price value";
  }

  if (!deliveryEstimationDate) {
    return "You must choose a delivery estimation date";
  }

  return "";
};

const mapStateToProps = (state) => ({
  onlineStores: onlineStoresSelector(state),
  currency: currencySelector(state),
});

export default connect(mapStateToProps, { setBoughtItem })(
  AddShoppingItemWidget
);
