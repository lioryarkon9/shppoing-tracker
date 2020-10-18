import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import { SMALL_SCREEN } from "../theme";

const DesktopActionButtons = ({
  togglePageMode,
  currentPageMode,
  onClickAddItemButton,
  isAddingShoppingItem,
}) => {
  const { pathname: currentPage } = useLocation();

  return (
    <Container>
      <BoughtItemAndCurrency>
        {currentPage === "/bought" && (
          <button onClick={onClickAddItemButton}>
            {isAddingShoppingItem ? "Cancel" : "Add Item"}
          </button>
        )}
        <button>USD</button>
      </BoughtItemAndCurrency>

      <TogglePageMode>
        <ItemsButton onClick={togglePageMode} currentPageMode={currentPageMode}>
          Shopping Items
        </ItemsButton>
        <StoresButton
          onClick={togglePageMode}
          currentPageMode={currentPageMode}
        >
          Online Stores
        </StoresButton>
      </TogglePageMode>
    </Container>
  );
};

const ItemsButton = styled.button`
  background-color: ${({ currentPageMode }) =>
    currentPageMode === "shoppingItems" ? "green" : "transparent"};
`;

const StoresButton = styled.button`
  background-color: ${({ currentPageMode }) =>
    currentPageMode === "onlineStores" ? "green" : "transparent"};
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;

  @media ${SMALL_SCREEN} {
    display: none;
  }
`;

const TogglePageMode = styled.div`
  display: flex;
`;

const BoughtItemAndCurrency = styled.div`
  display: flex;
`;

export default DesktopActionButtons;
