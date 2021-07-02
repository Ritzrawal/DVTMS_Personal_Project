import * as types from '../types/documentUpload';
import UploadService from '../../services/Upload';
import {
  IDocumentUploadInput,
} from '../../interfaces/IDocumentUpload';

export const uploadDocument = (args: IDocumentUploadInput) => ( dispatch: any) => {
  dispatch({
    type: types.DOCUMENT_UPLOAD_LOADING,
    payload: {
      temporaryUuid: args.temporaryUuid,
      file: args.file,
    }
  });

  return UploadService.upload(args.data)
    .then((response: any) => {
      dispatch({
        type: types.DOCUMENT_UPLOAD_SUCCESS,
        payload: {
          uuid: response[0]?.uuid,
          temporaryUuid: args.temporaryUuid,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: types.DOCUMENT_UPLOAD_FAILED,
        payload: {
          temporaryUuid: args.temporaryUuid,
        }
      });
    });
};

export const resetUploadDocument = () => ( dispatch: any) => {
  dispatch({
    type: types.RESET_DOCUMENT_UPLOAD,
  });
};
