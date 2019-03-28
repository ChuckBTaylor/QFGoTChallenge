export function isObjectEmpty(obj) {
  if (obj == null) return true;
  if (obj.length === 0) return true;
  return false;
}

export function constructQueryStringFromObj(obj){
  return Object.keys(obj).filter(key => key !== 'id').map(key => key + "=" + obj[key]).join('&');
}

export function isStringEmpty(str){
return (str === undefined || str === null || str === '');
}

export function getIdFromUrl(obj){
  let splitObj = obj.url.split('/');
  return +splitObj[splitObj.length - 1];
}