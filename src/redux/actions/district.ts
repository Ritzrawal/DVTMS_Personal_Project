import * as types from '../types/district';
import ProvinceService from '../../services/Province';

export const getDistrictByProvinceSlug = (slug: string) => (dispatch: any) => {
  dispatch({
    type: types.DISTRICT_LIST_LOADING,
  });

  return ProvinceService.getDistrict({ province__slug: slug })
    .then((response) => {
      dispatch({
        type: types.DISTRICT_LIST_SUCCESS,
        payload: {
          province_slug: slug,
          districts: response.results,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: types.DISTRICT_LIST_FAILED,
        error: err.data,
      });
    });
};
