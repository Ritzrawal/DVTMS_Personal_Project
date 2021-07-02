import Http from "./Http";
import { ILoginResponse, ILoginInput, ILoggedInUser ,IPasswordReset} from "../interfaces/IAuth";

const http = new Http();

export default class Auth {
  static login(args: ILoginInput) {
    return http.post<ILoginResponse>({
      endpoint: '/api/v1/accounts/auth/obtain/',
      payload: args,
    })
  }

  static pingMe = () => {
    return http.get<ILoggedInUser>({
      endpoint: 'api/v1/user/me/',
    });
  }

  static passwordReset = (args:IPasswordReset) => {
    return http.post<any>({
      endpoint:`/api/v1/user/onboard/activate/${args.token}/`,
      payload:args.data
    })
  }
}

