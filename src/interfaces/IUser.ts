import { IPaging } from './IPaging';

export interface IUser {
  username: string;
  email: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  is_active: boolean;
  display_name: string;
  groups: string[];
  last_activity: string;
  manufacturer: string;
  profile_picture: string;
  created_at: string;
  updated_at: string;
  location:any
}

export interface IUserResponse {
  count: number,
  next: any,
  previous: any,
  results: IUser[];
}

export interface IUserPagingInput {
  limit?: number; 
  offset?: number;
  search?: string;
  ordering?: string;
  groups_name?: string;
  is_active?: boolean;
}

export interface IUserState {
  listLoading: boolean;
  paging: IPaging;
  users: IUser[];
  error: any;
}

export interface IUserAddInput {
  email: string;
  first_name: string;
  middle_name?: string;
  last_name?: string
  phone_number: string
  gender: string;
  group: string;
}
