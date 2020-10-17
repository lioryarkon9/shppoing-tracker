import React, { useState } from "react";
import styled from "styled-components";

import theme, { SMALL_SCREEN } from "../theme";

import DesktopActionButtons from "./DesktopActionButtons";
import DesktopTableHeader from "./DesktopTableHeader";
import List from "./List";

const Page = ({ location }) => {
  const { pathname: currentPage } = location;
  const [pageMode, setPageMode] = useState("shoppingItems");

  const togglePageMode = () => {
    const newPageMode =
      pageMode === "shoppingItems" ? "onlineStores" : "shoppingItems";

    setPageMode(newPageMode);
  };

  return (
    <MaxWidthContainer>
      <PageContainer>
        <Title>
          {currentPage} {pageMode}
        </Title>

        <DesktopActionButtons
          togglePageMode={togglePageMode}
          currentPageMode={pageMode}
        />

        <MobileTogglePageMode>
          <MobilePageModeButton>Shopping Items</MobilePageModeButton>
          <MobilePageModeButton>Stores</MobilePageModeButton>
        </MobileTogglePageMode>

        <MobileCurrencyHandler>
          <button>USD</button>
        </MobileCurrencyHandler>

        <DesktopTableHeader pageMode={pageMode} />

        <div>
          {pageMode === "shoppingItems" && (
            <MobileAddItem>
              <button>ADD ITEM</button>
            </MobileAddItem>
          )}

          <List pageMode={pageMode} />
        </div>
      </PageContainer>
    </MaxWidthContainer>
  );
};

const MobileAddItem = styled.div`
  display: none;

  @media ${SMALL_SCREEN} {
    display: flex;
    justify-content: center;
  }
`;

const MobileCurrencyHandler = styled.div`
  display: none;

  @media ${SMALL_SCREEN} {
    display: flex;
    justify-content: flex-end;
  }
`;

const MobilePageModeButton = styled.button`
  display: none;

  @media ${SMALL_SCREEN} {
    flex-grow: 1;
    display: block;
  }
`;

const MobileTogglePageMode = styled.div`
  display: none;

  @media ${SMALL_SCREEN} {
    display: flex;
  }
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
`;

const MaxWidthContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const PageContainer = styled.div`
  max-width: 1700px;
  flex-grow: 1;
  background-color: #f4f5f7;
  padding: 8px;
  margin-top: 10px;
  border-radius: ${theme.borderRadius};
  color: ${theme.colors.text};

  @media ${SMALL_SCREEN} {
    margin-top: 0;
    border-radius: 0;
    min-height: 100vh;
  }
`;

export default Page;