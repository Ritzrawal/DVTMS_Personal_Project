import * as types from "../types/vehicleEntry";
import VehicleService from "../../services/VehicleEntry";
import { v4 as uuidv4 } from 'uuid';
import {
  IVehicleEntry,
  IVehicleEntryInput,
  IVehicleEntryResponse,
  IVehiclePagingInput,
  IVehiclePagingInputFilter,
} from "../../interfaces/IVehicleEntry";

export const getVehicleEntry = (args: IVehiclePagingInput) => (
  dispatch: any
) => {
  dispatch({
    type: types.VEHICLE_ENTRIES_LOADING,
  });

  return VehicleService.getVehicleEntry({
    offset: args.offset,
    limit: args.limit,
    created_at: args.created_at,
    registered_at: args.registered_at,
  })
    .then((response: IVehicleEntryResponse) => {
      dispatch({
        type: types.VEHICLE_ENTRIES_SUCCESS,
        payload: {
          entries: response.results,
          paging: {
            count: response.count,
            previous: response.previous,
            next: response.next,
          },
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: types.VEHICLE_ENTRIES_FAILED,
        error: err.data,
      });
    });
};

export const getVehicleEntryWithFilter = (args: IVehiclePagingInputFilter) => (
  dispatch: any
) => {
  dispatch({
    type: types.VEHICLE_ENTRIES_LOADING,
  });

  return VehicleService.getVehicleEntryFilter({
    offset: args.offset,
    limit: args.limit,
    filter: args.filter,
  })
    .then((response: IVehicleEntryResponse) => {
      dispatch({
        type: types.VEHICLE_ENTRIES_SUCCESS,
        payload: {
          entries: response.results,
          paging: {
            count: response.count,
            previous: response.previous,
            next: response.next,
          },
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: types.VEHICLE_ENTRIES_FAILED,
        error: err.data,
      });
    });
};

export const postVehicleEntry = (args: IVehicleEntryInput) => (
  dispatch: any
) => {
  dispatch({
    type: types.VEHICLE_ENTRIES_LOADING,
  });

  return VehicleService.postVehicleEntry(args)
    .then((response: IVehicleEntry) => {
      dispatch({
        type: types.VEHICLE_ENTRIES_SUCCESS,
        payload: response,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.VEHICLE_ENTRIES_FAILED,
        error: err.data,
      });
    });
};

export const addVehicleRow = () => (
  dispatch: any
) => {
  dispatch({
    type: types.VEHICLE_ADD_ROW,
    payload: {
      tempVehicleUuid: uuidv4(),
    }
  });
};

export const removeVehicleRow = (uuid: string) => (
  dispatch: any
) => {
  dispatch({
    type: types.VEHICLE_REMOVE_ROW,
    payload: {
      tempVehicleUuid: uuid
    }, 
  });
};

export const editVehicleRow = (args: { uuid: string, key: string, value: any }) => (
  dispatch: any
) => {
  dispatch({
    type: types.VEHICLE_EDIT_ROW,
    payload: {
      uuid: args.uuid,
      key: args.key,
      value: args.value,
    }, 
  });
};

export const resetVehicleEntry = () => ( dispatch: any) => {
  dispatch({
    type: types.RESET_VEHICLE_ENTRIES,
  });
};
