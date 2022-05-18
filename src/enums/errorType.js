import { ObjectUtil } from "../js/utils/ObjectUtil";

const customErrorType = ObjectUtil.deepFreeze({
  jsInterfaceError: {
    TYPE: 'JS_INTERFACE_ERROR'
  },
  httpError: {
    TYPE: 'HTTP_ERROR'
  },
  apiError: {
    TYPE: 'API_ERROR'
  },
  authError: {
    TYPE: 'AUTH_ERROR'
  }
});

const jsInterfaceErrorType = ObjectUtil.deepFreeze({
  other: {
    TYPE: 'OTHER'
  },
  web: {
    TYPE: 'WEB'
  },
  ios: {
    TYPE: 'IOS'
  },
  android: {
    TYPE: 'ANDROID'
  }
});

const authErrorType = ObjectUtil.deepFreeze({
  notLoggedIn: {
    TYPE: 'NOT_LOGGED_IN',
    DESC: '미로그인',
    REDIRECT_URL: ''
  },
  unauthorized: {
    TYPE: 'UNAUTHORIZED',
    DESC: '토큰 만료',
    REDIRECT_URL: ''
  },
  other: {
    TYPE: 'OTHER',
    DESC: 'other',
    REDIRECT_URL: ''
  }
});

export {
  customErrorType,
  jsInterfaceErrorType,
  authErrorType
}
