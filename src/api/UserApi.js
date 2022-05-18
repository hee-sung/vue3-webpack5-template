import {BaseApi} from "./BaseApi";

export class UserApi {

  constructor() {
    this.baseApi = new BaseApi();
  }

  getUser(id) {
    return this.baseApi.callApiWithAuth('GET', `/users/${id}`);
  }

}