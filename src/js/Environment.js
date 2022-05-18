import { W3CDomUtil } from "./utils/W3CDomUtil";
import { localIpList, serverType, subDomainForWeb } from "../enums/serverInfo";

export class Environment {

  static setEnv(env) {
    W3CDomUtil.setMeta('env', env);
  }

  static getEnv() {
    const envFromMeta = W3CDomUtil.getMeta('env');
    if (envFromMeta) {
      return envFromMeta;
    }

    const hostName = location.hostname;

    if (localIpList.indexOf(hostName) >= 0) {
      return serverType.LOCAL;
    }

    const urlParts = hostName.split('.');
    if (urlParts.length > 0) {
      const subDomain = urlParts[0];

      switch (subDomain) {
        case subDomainForWeb.DEV:
          return serverType.DEV;
        case subDomainForWeb.STAGE:
          return serverType.STAGE;
        case subDomainForWeb.ALPHA:
          return serverType.ALPHA;
        default:
          return serverType.REAL;
      }
    }

    return serverType.REAL;
  }

}