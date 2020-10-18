import {
  SET_CURRENCY_ID,
  SET_CURRENCY_RATE,
} from "../actions/currency.actions";

const initialState = { id: "usd", rate: 3.3790137126 };

function currencyReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENCY_ID: {
      return { ...state, id: action.payload.currencyId };
    }
    case SET_CURRENCY_RATE: {
      return { ...state, rate: action.payload.rate };
    }
    default:
      return state;
  }
}

export default currencyReducer;
