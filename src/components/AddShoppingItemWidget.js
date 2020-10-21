import React, { useState, useEffect } from "react";
import Dropdown from "react-dropdown";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import styled from "styled-components";

import "react-dropdown/style.css";
import "react-datepicker/dist/react-datepicker.css";

import theme, { SMALL_SCREEN } from "../theme";

import { onlineStoresSelector, currencySelector } from "../redux/selectors";
import { setBoughtItem } from "../redux/actions/boughtItems.actions";

import { ListItem, ListCell, Button } from "./commonStyled";

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

  const confirmOnPressEnter = getOnEnterKeyConfirmation(confirmShoppingItem);

  useEffect(function applyOnEnterConfirmation() {
    document.addEventListener("keypress", confirmOnPressEnter);

    return () => {
      document.removeEventListener("keypress", confirmOnPressEnter);
    };
  }, []);

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
            value={
              deliveryEstimationDate
                ? new Date(deliveryEstimationDate).toDateString()
                : ""
            }
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
        <ConfirmButton onClick={confirmShoppingItem}>Confirm</ConfirmButton>
      </Confirm>
    </div>
  );
};

const ConfirmButton = styled(Button)`
  background-color: ${theme.colors.green};
  color: #fff;
  width: 200px;
  font-size: 16px;

  @media ${SMALL_SCREEN} {
    width: 100%;
    font-size: 14px;
  }

  &:hover {
    background-color: ${theme.colors.green};
  }
`;

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
  if (name.length < 3 || name.length > 30) {
    return "Name must be between 3 to 30 chars";
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

const getOnEnterKeyConfirmation = (confirmItemCallback) => (event) => {
  if (event.key !== "Enter") {
    return;
  }

  confirmItemCallback();
};

const mapStateToProps = (state) => ({
  onlineStores: onlineStoresSelector(state),
  currency: currencySelector(state),
});

export default connect(mapStateToProps, { setBoughtItem })(
  AddShoppingItemWidget
);
