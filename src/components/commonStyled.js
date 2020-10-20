import styled from "styled-components";

import theme, { SMALL_SCREEN } from "../theme";

export const ShoppingListCell = styled.div`
  width: ${({ pageMode }) => (pageMode === "onlineStores" ? "50%" : "25%")};

  @media ${SMALL_SCREEN} {
    width: 100%;
  }
`;

export const ShoppingListItem = styled.div`
  display: flex;

  @media ${SMALL_SCREEN} {
    flex-wrap: wrap;
    box-shadow: 0 0 2px 0;
    margin-top: 5px;
    padding: 5px;
    border-radius: ${theme.borderRadius};
  }
`;
