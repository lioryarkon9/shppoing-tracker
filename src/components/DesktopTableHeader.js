import React from "react";
import styled from "styled-components";

import { SMALL_SCREEN } from "../theme";

import { ShoppingListCell } from "./commonStyled";

const headerCellsByMode = {
  shoppingItems: ["Name", "Online Store", "Price", "Delivery Estimation Date"],
  onlineStores: ["Store", "Sum ordered"],
};

const DesktopTableHeader = ({ pageMode }) => {
  return (
    <Container>
      {headerCellsByMode[pageMode].map((headerItem) => (
        <ShoppingListCell pageMode={pageMode} key={headerItem}>
          {headerItem}
        </ShoppingListCell>
      ))}
    </Container>
  );
};

const Container = styled.div`
  font-weight: bold;
  display: flex;

  @media ${SMALL_SCREEN} {
    display: none;
  }
`;

export default DesktopTableHeader;
