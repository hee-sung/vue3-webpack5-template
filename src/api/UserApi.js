import {BaseApi} from "./BaseApi";

export class UserApi {

  constructor() {
    this.baseApi = new BaseApi();
  }

  getUsers() {
    return this.baseApi.callApi('GET', '/users');
  }

  getUser(id) {
    return this.baseApi.callApiWithAuth('GET', `/users/${id}`);
  }

  addUser(user={}) {
    return this.baseApi.callApiWithAuth('POST', '/users', user);
  }
}