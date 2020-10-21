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
  background-color: #dfe1e6;
  border-radius: 5px;
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
  background-color: #61bd4f;
  color: #fff;
`;

export default TogglePageMode;
