import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import { SMALL_SCREEN } from "../theme";

import {Button} from "./commonStyled";
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
          <AddButton onClick={onClickAddItemButton}>
            {isAddingShoppingItem ? "Cancel" : "Add Item"}
          </AddButton>
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

const AddButton = styled(Button)`
  width: 100px;
`; 

const TogglePageModeContainer = styled.div`
  width: 240px;
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
