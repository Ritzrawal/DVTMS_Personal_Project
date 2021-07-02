import * as types from "../types/ui";

const defaultState = {
  sidebarShow: 'responsive',
  redirectLink: null,
};

const ui = (state = defaultState, action: any) => {
  switch (action.type) {
    case types.SET_SIDEBAR:
      return {
        ...state,
        ...action.payload
      };

    case types.REDIRECT:
      return {
        ...state,
        redirectLink: action.payload,
      };

    case types.RESET_REDIRECT:
      return {
        ...state,
        redirectLink: null,
      };

    default:
      return state;
  }
};

export default ui;
