import { ObjectUtil } from "../js/utils/ObjectUtil";

const serverType = ObjectUtil.deepFreeze({
  LOCAL: 'local',
  DEV: 'dev',
  STAGE: 'stage',
  ALPHA: 'alpha',
  REAL: 'real'
});

const serviceApiServer = ObjectUtil.deepFreeze({
  LOCAL: 'http://localhost:3000',
  DEV: '',
  STAGE: '',
  ALPHA: '',
  REAL: ''
});

const subDomainForWeb = ObjectUtil.deepFreeze({
  LOCAL: '',
  DEV: 'dev',
  STAGE: 'stage',
  ALPHA: 'alpha',
  REAL: ''
});

const localIpList = Object.freeze([
  'localhost',
  '0.0.0.0'
]);

export {
  serverType,
  serviceApiServer,
  subDomainForWeb,
  localIpList
}