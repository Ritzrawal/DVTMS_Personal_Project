import * as types from '../types/district';
import { IDistrictState } from '../../interfaces/IProvince';

const defaultState: IDistrictState = {
  loading: false,
  error: null,
  districts: {},
};

const province = (state: IDistrictState = defaultState, action: any) => {
  switch (action.type) {
    // List
    case types.DISTRICT_LIST_LOADING:
      return {
        ...state,
        loading: true, 
        error: null,
      };

    case types.DISTRICT_LIST_SUCCESS:
      return {
        ...state,
        loading: false, 
        districts: {
          ...state.districts,
          [action.payload.province_slug]: action.payload.districts,
        }
      };

    case types.DISTRICT_LIST_FAILED:
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
