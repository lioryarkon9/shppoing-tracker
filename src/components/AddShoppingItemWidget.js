import React, { useState } from "react";
import styled from "styled-components";

import { ListItem, ListCell } from "./commonStyled";

const AddShoppingItemWidget = () => {
  const [name, setName] = useState("");
  const [onlineStoreId, setOnlineStoreId] = useState("");
  const [price, setPrice] = useState("");
  const [deliveryEstimationDate, setDeliveryEstimationDate] = useState("");

  const onTextInputChange = (event, setPropertyFunction) => {
    setPropertyFunction(event.currentTarget.value);
  };

  return (
    <ListItem>
      <ListCell>
        <TextInput
          value={name}
          onChange={(event) => onTextInputChange(event, setName)}
          placeholder="Item Name"
        />
      </ListCell>
      <ListCell>onlineStoreId</ListCell>
      <ListCell>
        <TextInput
          type="number"
          value={price}
          onChange={(event) => onTextInputChange(event, setPrice)}
          placeholder="Price"
        />
      </ListCell>
      <ListCell>deliveryEstimationDate</ListCell>
    </ListItem>
  );
};

const TextInput = styled.input`
  width: 100%;
  box-sizing: border-box;
`;

export default AddShoppingItemWidget;
