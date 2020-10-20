import React from "react";
import styled, { css } from "styled-components";

const TogglePageMode = ({ toggleAction, currentPageMode }) => (
  <Container>
    <ShoppingItemsButton
      isCurrent={currentPageMode === "shoppingItems"}
      onClick={toggleAction}
    >
      Shopping items
    </ShoppingItemsButton>

    <OnlineStoresButton
      isCurrent={currentPageMode === "onlineStores"}
      onClick={toggleAction}
    >
      Online stores
    </OnlineStoresButton>
  </Container>
);

const ToggleButton = styled.button`
  padding: 5px;
  width: 50%;
  font-weight: bold;
`;

const ShoppingItemsButton = styled(ToggleButton)`
  ${({ isCurrent }) => isCurrent && getCurrentPageModeStyle()}
`;

const OnlineStoresButton = styled(ToggleButton)`
  ${({ isCurrent }) => isCurrent && getCurrentPageModeStyle()}
`;

const Container = styled.div`
  display: flex;
  width: 100%;
`;

const getCurrentPageModeStyle = () => css`
  background-color: green;
  color: #fff;
`;

export default TogglePageMode;
