import styled from "styled-components";

import theme, { SMALL_SCREEN } from "../theme";

export const ListCell = styled.div`
  width: ${({ pageMode }) => (pageMode === "onlineStores" ? "50%" : "25%")};

  @media ${SMALL_SCREEN} {
    width: 100%;
  }
`;

export const ListItemContainer = styled.div`
  box-shadow: 0 0 2px 0;
  margin-top: 5px;
  padding: 5px;

  @media ${SMALL_SCREEN} {
    border-radius: ${theme.borderRadius};
  }
`;

export const ListItem = styled.div`
  display: flex;

  @media ${SMALL_SCREEN} {
    flex-wrap: wrap;
  }
`;

export const Button = styled.button`
  padding: 5px;
  font-weight: bold;
  background-color: #dfe1e6;
  border-radius: 5px;

  @media ${SMALL_SCREEN} {
    padding: 10px 5px;
  }

  &:hover {
    background-color: #bdbfc3;
  }
`;
