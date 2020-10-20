import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import { SMALL_SCREEN } from "../theme";

import ToggleCurrency from "./ToggleCurrency";
import TogglePageMode from "./TogglePageMode";

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
        {currentPage === "/bought" && currentPageMode === "shoppingItems" && (
          <button onClick={onClickAddItemButton}>
            {isAddingShoppingItem ? "Cancel" : "Add Item"}
          </button>
        )}
        <ToggleCurrency />
      </BoughtItemAndCurrency>

      {currentPage === "/bought" && (
        <TogglePageModeContainer>
          <TogglePageMode
            toggleAction={togglePageMode}
            currentPageMode={currentPageMode}
          />
        </TogglePageModeContainer>
      )}
    </Container>
  );
};

const TogglePageModeContainer = styled.div`
  width: 200px;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;

  @media ${SMALL_SCREEN} {
    display: none;
  }
`;

const BoughtItemAndCurrency = styled.div`
  display: flex;
`;

export default DesktopActionButtons;
