import * as types from "../types/auth";
import { IAuthState } from "../../interfaces/IAuth";

const defaultState: IAuthState = {
  loading: false,
  error: null,
  isLoggedIn: false, 
  loggedInUser: null,
  pingMeLoading: false,
};

const user = (state: IAuthState = defaultState, action: any) => {
  switch (action.type) {
    case types.AUTH_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };

    // Login
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        error: null,
        loading: false,
        isLoggedIn: true,
      };

    case types.LOGIN_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false,
      };

    // Ping me
    case types.PING_ME_LOADING:
      return {
        ...state,
        pingMeLoading: true,
      };

    case types.PING_ME_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        loggedInUser: action.payload,
        pingMeLoading: false,
      };

    case types.PING_ME_FAILED:
      return {
        ...state,
        isLoggedIn: false,
        loggedInUser: null,
        pingMeLoading: false,
      };

    default:
      return state;
  }
};

export default user;
