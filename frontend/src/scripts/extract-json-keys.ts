/* eslint-disable @roq/name-of-class-and-function-rule */
/* this is giving error for iter method */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function extractJsonKeys(jsonObj: any): string[] {
  const results = [];
    function iter(object, tempKeysHolder = []) {
        if (Array.isArray(object)) { return; }
        if (object && typeof object === 'object') {
            const keys = Object.keys(object);
            if (keys.length > 0) {
                keys.forEach((key)=>{
                  iter(object[key], tempKeysHolder.concat(key));
                });
            }
            return;
        }
        results.push(tempKeysHolder.join('.'));
    }
    iter(jsonObj);
    return results;
}
