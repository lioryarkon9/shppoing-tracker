import { SET_CURRENCY } from "../actions/currency.actions";

const initialState = { id: "ils" };

function currencyReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENCY: {
      return { ...state, id: action.payload.currencyId };
    }
    default:
      return state;
  }
}

export default currencyReducer;
