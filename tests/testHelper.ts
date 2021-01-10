import cloneDeep from 'lodash.clonedeep';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function genJsonResp(obj: any, model: Model) {
  for (const key in obj) {
    const val = model.get(key);

    if (obj[key] === null) {
      obj[key] = val;
    } else if (Array.isArray(obj[key])) {
      const baseObj = obj[key][0];

      // We assume val is an Array since obj[key] is an Array. We recursively create each new resp in the array.
      const vals: Model[] = val as Model[];
      const results = vals.map(val => {
        return genJsonResp(cloneDeep(baseObj), val as Model);
      });

      obj[key] = results;
    } else {
      obj[key] = genJsonResp(obj[key], val as Model);
    }
  }

  return obj;
}
