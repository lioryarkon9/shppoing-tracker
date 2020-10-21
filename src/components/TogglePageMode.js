import React from "react";
import styled, { css } from "styled-components";

import theme from "../theme";

import {Button} from "./commonStyled";

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

const ToggleButton = styled(Button)`
  width: 50%;
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
  background-color: ${theme.colors.green};
  color: #fff;

  &:hover {
    background-color: ${theme.colors.green};
  }
`;

export default TogglePageMode;
