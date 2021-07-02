import * as types from "../types/ui";

export const setSidebar = (args: any) => (dispatch: any) => {
  dispatch({
    type: types.SET_SIDEBAR,
    payload: args
  });
}

export const resetRedirect = () => (dispatch: any) => {
  dispatch({
    type: types.RESET_REDIRECT,
  });

}

