import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import theme, { SMALL_SCREEN } from "../theme";

import { Button } from "./commonStyled";
import DesktopActionButtons from "./DesktopActionButtons";
import DesktopTableHeader from "./DesktopTableHeader";
import ToggleCurrency from "./ToggleCurrency";
import TogglePageMode from "./TogglePageMode";
import List from "./List";

const Page = ({ location }) => {
  const { pathname: currentPage } = location;
  const [pageMode, setPageMode] = useState("shoppingItems");

  const [isAddingShoppingItem, setIsAddingShoppingItem] = useState(false);

  const togglePageMode = () => {
    setPageMode(
      pageMode === "shoppingItems" ? "onlineStores" : "shoppingItems"
    );
  };

  const onClickAddItemButton = () => {
    if (currentPage !== "/bought" || pageMode !== "shoppingItems") {
      return;
    }

    if (isAddingShoppingItem) {
      setIsAddingShoppingItem(false);

      return;
    }

    setIsAddingShoppingItem(true);
  };

  return (
    <MaxWidthContainer>
      <PageContainer>
        <Title>{currentPage.slice(1).toUpperCase()} SHOPPING ITEMS</Title>

        <Navigation>
          Go to{" "}
          <Link to={getOppositePage(currentPage)}>
            {getOppositePage(currentPage).slice(1).toUpperCase()}
          </Link>{" "}
          page
        </Navigation>

        <DesktopActionButtons
          onClickAddItemButton={onClickAddItemButton}
          togglePageMode={togglePageMode}
          isAddingShoppingItem={isAddingShoppingItem}
          currentPageMode={pageMode}
        />

        {currentPage === "/bought" && (
          <MobileTogglePageMode>
            <TogglePageMode
              toggleAction={togglePageMode}
              currentPageMode={pageMode}
            />
          </MobileTogglePageMode>
        )}

        <MobileCurrency>
          <ToggleCurrency />
        </MobileCurrency>

        <DesktopTableHeader pageMode={pageMode} />

        {currentPage === "/bought" && pageMode === "shoppingItems" && (
          <MobileAddItem>
            <MobileAddButton onClick={onClickAddItemButton}>
              {isAddingShoppingItem ? "Cancel" : "Add Shopping Item"}
            </MobileAddButton>
          </MobileAddItem>
        )}

        <List
          pageMode={pageMode}
          isAddingShoppingItem={isAddingShoppingItem}
          closeAddShoppingItemWidget={onClickAddItemButton}
        />
      </PageContainer>
    </MaxWidthContainer>
  );
};

const MobileAddButton = styled(Button)`
  width: 200px;
`;

const Navigation = styled.div`
  text-align: center;
  padding: 5px 5px 10px;
`;

const MobileAddItem = styled.div`
  display: none;

  @media ${SMALL_SCREEN} {
    display: flex;
    justify-content: center;
    margin-top: 5px;
  }
`;

const MobileCurrency = styled.div`
  display: none;

  @media ${SMALL_SCREEN} {
    display: flex;
    justify-content: flex-end;
    margin-top: 5px;
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

  @media ${SMALL_SCREEN} {
    min-height: 100vh;
  }
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
    min-height: 100%;
  }
`;

const getOppositePage = (currentPage) =>
  currentPage === "/bought" ? "/received" : "/bought";

export default Page;
