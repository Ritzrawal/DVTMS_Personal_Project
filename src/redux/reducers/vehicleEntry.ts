import * as types from "../types/vehicleEntry";
import { IVehicleEntryState } from "../../interfaces/IVehicleEntry";

const defaultState: IVehicleEntryState = {
  listLoading: true,
  error: null,
  entries: [],
  paging: {
    count: 0,
    previous: null,
    next: null,
  },
  allVehicles: [],
  vehiclesById: {},
};

const vehicle = (state: IVehicleEntryState = defaultState, action: any) => {
  switch (action.type) {
    // List
    case types.VEHICLE_ENTRIES_LOADING:
      return {
        ...state,
        listLoading: true,
        error: null,
      };

    case types.VEHICLE_ENTRIES_SUCCESS:
      return {
        ...state,
        error: null,
        listLoading: false,
        entries: action.payload.entries,
        paging: {
          ...state.paging,
          ...action.payload.paging,
        },
      };

    case types.VEHICLE_ENTRIES_FAILED:
      return {
        ...state,
        error: action.error,
        listLoading: false,
      };

    case types.VEHICLE_BORDER_ENTRIES_LOADING:
      return {
        ...state,
        listLoading: true,
        error: null,
      };

    case types.VEHICLE_BORDER_ENTRIES_SUCCESS:
      return {
        ...state,
        error: null,
        listLoading: false,
        entries: action.payload.entries,
      };

    case types.VEHICLE_BORDER_ENTRIES_FAILED:
      return {
        ...state,
        error: action.error,
        listLoading: false,
      };

    case types.VEHICLE_ADD_ROW:
      const length = state?.allVehicles.length;
      let vehicle = {
        chassis_number: '',
        engine_number: '',
        color: '',
        engine_capacity: 0,
        model: '',
        remarks: '',
        key: action.payload.tempVehicleUuid,
      }

      if(length > 0) {
        vehicle = state?.vehiclesById[state?.allVehicles[length - 1]];
      }

      return {
        ...state,
        allVehicles: [
          ...state.allVehicles,
          action.payload.tempVehicleUuid,
        ],
        vehiclesById: {
          ...state.vehiclesById,
          [action.payload.tempVehicleUuid]: {
            ...vehicle,
            key: action.payload.tempVehicleUuid,
          },
        }
      }

    case types.VEHICLE_REMOVE_ROW:
      return {
        ...state,
        allVehicles: state.allVehicles.filter((uuid) => uuid === action.payload.tempVehicleUuid),
        vehiclesById: {
          ...state.vehiclesById,
        }
      }

    case types.VEHICLE_EDIT_ROW:
      return {
        ...state,
        vehiclesById: {
          ...state.vehiclesById,
          [action.payload.uuid]: {
            ...state.vehiclesById[action.payload.uuid],
            [action.payload.key]: action.payload.value,
          }
        }
      }

    case types.RESET_VEHICLE_ENTRIES:
      return defaultState;

    default:
      return state;
  }
};

export default vehicle;
