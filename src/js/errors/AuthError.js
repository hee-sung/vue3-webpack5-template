import {authErrorType, customErrorType} from "../../enums/errorType";

export class AuthError extends Error {
  constructor(status = 401, type = authErrorType.other.TYPE, ...params) {
    super(...params);
    this.name = customErrorType.authError.TYPE;

    this.type = type;
    this.status = status;
    this.date = new Date();
  }
}