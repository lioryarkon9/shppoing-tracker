import React from "react";
import {connect} from "react-redux";

import {currencySelector} from "../redux/selectors";
import {setCurrencyId} from "../redux/actions/currency.actions";

const ToggleCurrencyButton = ({currency, setCurrencyId}) => {
  const {id: currenctCurrency} = currency;

  const toggleCurrency = () => {
    if (currenctCurrency === "usd") {
      setCurrencyId("ils");

      return;
    }

    setCurrencyId("usd");
  };

  return (
    <button onClick={toggleCurrency}>{currenctCurrency === "usd" ? "NIS" : "USD"}</button>
  );
};

const mapStateToProps = state => ({
  currency: currencySelector(state)
});

export default connect(mapStateToProps, {setCurrencyId})(ToggleCurrencyButton);