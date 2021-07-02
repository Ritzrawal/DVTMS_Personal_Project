export interface IFile {
  name: string;
  preview: string;
  loading: string;
  uuid?: string;
}

export interface IActionPayload {
  temporaryUuid?: string;
  loading?: boolean;
  file?: IFile;
  uuid?: string;
}

export interface IAction {
  type: Symbol;
  payload: IActionPayload,
}

export interface IDocumentUploadState {
  allTemporaryUuids: string[];
  byTemporaryUuid: {
    [uuid: string]: IFile
  };
  allUuids: string[];
}

export interface IDocumentUploadInput {
  temporaryUuid: string;
  file: IFile;
  data: any;
}
