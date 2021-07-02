export interface ILoginResponse {
  token: string;
}

export interface ILoginInput {
  username: string;
  password: string;
}

export interface ILoggedInUser {
  username: string,
  email: string,
  first_name: string,
  middle_name: string,
  last_name: string,
  is_active: boolean,
  display_name: string,
  groups: Array<string>,
  last_activity: string,
  manufacturer: string,
  profile_picture: string,
  created_at: string,
  updated_at: string,
}

export interface IToken {
  token: string;
}

export interface IAuthState {
  loading: boolean;
  error: any;
  isLoggedIn: boolean;
  loggedInUser: ILoggedInUser | null;
  pingMeLoading: boolean;
}

interface password {
  password:string,
  confirm_passwor: string
}


export interface IPasswordReset{
  token:string,
  data: password
}
