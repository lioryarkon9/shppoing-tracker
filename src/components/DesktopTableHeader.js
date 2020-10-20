import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import { SMALL_SCREEN } from "../theme";

import { ListCell } from "./commonStyled";

const headerCellsByMode = {
  shoppingItems: ["Name", "Online Store", "Price", "Delivery Estimation Date"],
  onlineStores: ["Store", "Sum ordered"],
};

const DesktopTableHeader = ({ pageMode }) => {
  const { pathname: currentPage } = useLocation();

  const headerCells =
    currentPage === "/received"
      ? headerCellsByMode.shoppingItems
      : headerCellsByMode[pageMode];

  return (
    <Container>
      {headerCells.map((headerItem) => (
        <ListCell pageMode={pageMode} key={headerItem}>
          {headerItem}
        </ListCell>
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
