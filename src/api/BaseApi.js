import axios from "axios";
import {URIUtil} from "../js/utils/URIUtil";
import {serviceApiServer} from "../enums/serverInfo";
import {Environment} from "../js/Environment";
import {authErrorType, customErrorType} from "../enums/errorType";
import {AuthError} from "../js/errors/AuthError";
import {HttpError} from "../js/errors/HttpError";

export class BaseApi {

  constructor() {
    this.TOKEN = 'asdf'; // cookie나 session에서
    this.baseOptions = {
      headers: {},
      timeout: 30000,
      method: '',
      url: ''
    }
  }

  async callApi(method, url, data, options = {}) {
    options = this.makeOptions(method, url, data, options);

    console.warn('options : ', options)
    return new Promise((resolve, reject) => {
      axios(options)
        .then((res) => {
          resolve(res);
        }).catch((error) => {
          if (error.status === 401 || (error.response && error.response.status === 401)) {
            // 로그아웃 처리
            reject(new AuthError(401, authErrorType.unauthorized));
          } else if (error.response) {
            const errorMessage = error.response.data.message || error.response.statusText;
            const errorCode = error.response.data.code || '';

            reject(new HttpError(error.response.status, customErrorType.httpError.TYPE, errorCode, errorMessage));
          } else {
            reject(new HttpError(error.status, customErrorType.httpError.TYPE, error.code, error.message));
          }
      });
    })
  }

  async callApiWithAuth(method, url, data, options = {}) {
    const headers = this.getAuthorizationHeaders(this.TOKEN);
    options = Object.assign(options, headers);

    return this.callApi(method, url, data, options)
      .then((res) => {
        return Promise.resolve(res);
      }).catch((error) => {
        return Promise.reject(error);
      });
  }

  async callApiWithMultipartAndAuth(method, url, data, options = {}) {
    const headers = this.getMultipartAndAuthorizationHeaders(this.TOKEN);
    options = Object.assign(options, headers);

    return this.callApi(method, url, data, options)
      .then((res) => {
        return Promise.resolve(res);
      }).catch((error) => {
        return Promise.reject(error);
      });
  }

  makeOptions(method, url, data, options) {
    options = Object.assign({}, this.baseOptions, options);

    options.method = method.toUpperCase();
    options.url = this.makeUrl(method, url, data);

    if (['POST', 'PUT'].includes(method) && data) {
      options.data = data;
    }

    console.log('options : ', options);
    return options;
  }

  makeUrl(method, url, data) {
    const serverDomain = this.getServerDomain();
    const queryString = this.getQueryString(method, data);

    return `${serverDomain}${url}${queryString}`;
  }

  getServerDomain(type = '') {
    const env = Environment.getEnv();
    const serverType = type ? type.toUpperCase() : env.toUpperCase();

    return serviceApiServer[serverType];
  }
  getQueryString(method, data = '') {
    if (data && ['POST', 'GET'].includes(method)) {
      return URIUtil.makeQueryString(data);
    }

    return '';
  }

  getAuthorizationHeaders(token) {
    if (!token) {
      return {};
    }

    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  }


  getMultipartAndAuthorizationHeaders(token) {
    let headers = this.getAuthorizationHeaders(token);

    headers['Content-Type'] = 'multipart/form-data';

    return headers;
  }
}