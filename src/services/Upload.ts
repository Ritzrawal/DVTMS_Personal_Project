import Http from "./Http";

const http = new Http();

export default class UserService {
  static upload(args: any) {
    return http.post<any>({
      endpoint: '/api/v1/core/files/upload/',
      payload: args, 
    })
  }

  static remove(args: { files: string[] }) {
    return http.post<any>({
      endpoint: '/api/v1/core/files/remove/',
      payload: args, 
    })
  }
}
