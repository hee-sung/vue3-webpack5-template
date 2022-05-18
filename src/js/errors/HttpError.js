import {customErrorType} from "../../enums/errorType";

export class HttpError extends Error {
  constructor(status = 500, name = customErrorType.httpError.TYPE , code = '', ...params) {
    super(...params);
    this.name = name;

    // if (Error.captureStackTrace) {
    //   Error.captureStackTrace(this, AuthError);
    // }

    this.status = status;
    this.code = code;
    this.date = new Date();
  }
}