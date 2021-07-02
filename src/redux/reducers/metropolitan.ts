import * as types from '../types/metropolitan';
import { IMetropolitanState } from '../../interfaces/IProvince';

const defaultState: IMetropolitanState = {
  loading: false,
  error: null,
  metropolitans: {},
};

const province = (state: IMetropolitanState = defaultState, action: any) => {
  switch (action.type) {
    // List
    case types.METROPOLITAN_LIST_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.METROPOLITAN_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        metropolitans: {
          ...state.metropolitans,
          [action.payload.district_slug]: action.payload.metropolitans,
        }
      };

    case types.METROPOLITAN_LIST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export default province;
