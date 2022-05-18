export class ObjectUtil {
  static deepFreeze(data) {
    if (data && data.typeof === 'object' && !Object.isFrozen(data)) {
      Object.freeze(data);
      Object.keys(data).forEach(key => ObjectUtil.deepFreeze(data[key]));
    }

    return data;
  }
}