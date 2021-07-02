import { IPaging } from "./IPaging";

export interface IImportingGroup {
  slug: string;
  name: string;
  is_active: boolean;
}

export interface IImportingGroupPagingInput {
  limit?: number;
  offset?: number;
}
