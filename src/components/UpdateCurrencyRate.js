import { useEffect } from "react";
import { connect } from "react-redux";

import { setCurrencyRate } from "../redux/actions/currency.actions";

const UPDATE_FREQUENCY_IN_MILLISECONDS = 10000;

const UpdateCurrencyRate = ({ setCurrencyRate }) => {
  useEffect(function updateCurrency() {
    const id = setInterval(() => {
      fetch("https://api.exchangeratesapi.io/latest?base=USD")
        .then((httpResponse) => httpResponse.json())
        .then((jsonResponse) => setCurrencyRate(jsonResponse.rates["ILS"]));
    }, UPDATE_FREQUENCY_IN_MILLISECONDS);

    return () => {
      clearInterval(id);
    };
  }, []);

  return null;
};

export default connect(null, { setCurrencyRate })(UpdateCurrencyRate);
