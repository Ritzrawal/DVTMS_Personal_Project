import * as types from '../types/documentUpload';
import { IDocumentUploadState, IAction } from '../../interfaces/IDocumentUpload';

const defaultState: IDocumentUploadState = {
  allTemporaryUuids: [],
  byTemporaryUuid: {},
  allUuids: [],
};

const documentUpload = (state: IDocumentUploadState = defaultState, action: IAction) => {
  switch (action.type) {
    case types.DOCUMENT_UPLOAD_LOADING:
      return {
        ...state,
        allTemporaryUuids: [
          ...state.allTemporaryUuids,
          action.payload.temporaryUuid,
        ],
        byTemporaryUuid: {
          ...state.byTemporaryUuid,
          [action.payload.temporaryUuid as string]: action.payload.file,
        }
      };

    case types.DOCUMENT_UPLOAD_SUCCESS:
      return {
        ...state,
        allUuids: [
          ...state.allUuids,
          action.payload.uuid,
        ],
        byTemporaryUuid: {
          ...state.byTemporaryUuid,
          [action.payload.temporaryUuid as string]: {
            ...state.byTemporaryUuid[action.payload.temporaryUuid as string],
            loading: false,
            uuid: action.payload.uuid,
          }
        }
      };

    case types.DOCUMENT_UPLOAD_DELETE_SUCCESS:
      return {
        ...state,
        allUuids: state.allUuids.filter(uuid => uuid !== action.payload.uuid),
        byTemporaryUuid: {
          ...state.byTemporaryUuid,
          [action.payload.temporaryUuid as string]: {
            ...state.byTemporaryUuid[action.payload.temporaryUuid as string],
            loading: false,
            uuid: action.payload.uuid,
          }
        }
      };

    case types.RESET_DOCUMENT_UPLOAD:
      return defaultState;

    case types.DOCUMENT_UPLOAD_FAILED:
      return {
        ...state,
        allTemporaryUuids: state.allTemporaryUuids.filter(uuid => action.payload.temporaryUuid !== uuid)
      };

    default:
      return state;
  }
};

export default documentUpload;
