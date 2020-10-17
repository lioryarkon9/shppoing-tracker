import styled from "styled-components";

import { SMALL_SCREEN } from "../theme";

export const ListCell = styled.div`
  width: ${({ pageMode }) => (pageMode === "onlineStores" ? "50%" : "25%")};

  @media ${SMALL_SCREEN} {
    width: 100%;
  }
`;
