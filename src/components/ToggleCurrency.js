import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import { currencySelector } from "../redux/selectors";
import { setCurrencyId } from "../redux/actions/currency.actions";

import { Button } from "./commonStyled";

const ToggleCurrencyButton = ({ currency, setCurrencyId }) => {
  const { id: currenctCurrency } = currency;

  const toggleCurrency = () => {
    if (currenctCurrency === "usd") {
      setCurrencyId("ils");

      return;
    }

    setCurrencyId("usd");
  };

  return (
    <ToggleButton onClick={toggleCurrency}>
      {currenctCurrency === "usd" ? "NIS" : "USD"}
    </ToggleButton>
  );
};

const ToggleButton = styled(Button)`
  width: 100px;
`;

const mapStateToProps = (state) => ({
  currency: currencySelector(state),
});

export default connect(mapStateToProps, { setCurrencyId })(
  ToggleCurrencyButton
);
