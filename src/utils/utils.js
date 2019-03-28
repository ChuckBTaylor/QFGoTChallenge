export function isObjectEmpty(obj) {
  if (obj == null) return true;
  if (obj.length === 0) return true;
  return false;
}

export function constructQueryStringFromObj(obj){
  return Object.keys(obj).map(key => key + "=" + obj[key]).join('&');
}

export function isStringEmpty(str){
return (str === undefined || str === null || str === '');
}