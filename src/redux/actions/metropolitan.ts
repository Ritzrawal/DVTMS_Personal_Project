import * as types from '../types/metropolitan';
import ProvinceService from '../../services/Province';

export const getMetropolitanByDistrictSlug = (slug: string) => (dispatch: any) => {
  dispatch({
    type: types.METROPOLITAN_LIST_LOADING,
  });

  return ProvinceService.getMunicipalityMetropolitan({ district__slug: slug })
    .then((response) => {
      dispatch({
        type: types.METROPOLITAN_LIST_SUCCESS,
        payload: {
          district_slug: slug,
          metropolitans: response.results,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: types.METROPOLITAN_LIST_FAILED,
        error: err.data,
      });
    });
};
