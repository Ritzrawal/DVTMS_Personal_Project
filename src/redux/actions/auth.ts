import * as types from '../types/auth';
import { REDIRECT } from '../types/ui';
import AuthService from '../../services/Auth';
import { ILoginInput } from '../../interfaces/IAuth';
import routes from '../../config/routes';
import config from '../../config';
import { setToken, removeToken } from '../../utils/token';

export const login = (args: ILoginInput) => (dispatch: any) => {
  dispatch({
    type: types.AUTH_LOADING,
  });

  return AuthService.login(args)
    .then((response) => {
      setToken({
        name: config.tokenName,
        value: JSON.stringify(response),
      });

      dispatch({
        type: types.LOGIN_SUCCESS,
        payload: response,
      });

      dispatch({
        type: REDIRECT,
        payload: routes.dashboard,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.LOGIN_FAILED,
        error: err.data,
      });
    });
};

export const pingMe = () => (dispatch: any) => {
  dispatch({
    type: types.PING_ME_LOADING,
  });

  return AuthService.pingMe()
    .then((response) => {
      dispatch({
        type: types.PING_ME_SUCCESS,
        payload: response,
      });
    })
    .catch((err) => {
      if (err.status === 401) {
        removeToken({
          name: config.tokenName,
        });

        dispatch({
          type: REDIRECT,
          payload: routes.login.path,
        });
      } else {
        dispatch({
          type: types.PING_ME_FAILED,
          error: err.message,
        });
      }
    });
};
