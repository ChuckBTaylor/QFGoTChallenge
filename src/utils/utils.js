export function isObjectEmpty(obj) {
  if (obj == null) return true;
  if (obj.length === 0) return true;
  return false;
}

export function constructQueryStringFromObj(obj) {
  return Object.keys(obj).filter(key => key !== 'id').map(key => key + "=" + obj[key]).join('&');
}

export function isStringEmpty(str) {
  return (str === undefined || str === null || str === '');
}

export function getIdFromUrlString(str) {
  let splitObj = str.split('/');
  return +splitObj[splitObj.length - 1];
}

export function generateListKey(listName, listItem) {
  if (typeof listItem === 'string') {
    return `${listName}-${listItem}`;
  } else {
    return `${listName}-${getIdFromUrlString(listItem.url)}`;
  }
}

export function commonFilter(filter, row, column) {
  if (!row[column.id])
    return false;
  return row[column.id].toLowerCase().includes(filter.value.toLowerCase());
}

export function commonSort(a, b, desc) {
  a = a === null || a === undefined ? -Infinity : a;
  b = b === null || b === undefined ? -Infinity : b;
  if (typeof a === "string") {
    a = a.toLowerCase();
    if (a.startsWith("the "))
      a = a.slice(4);
    else if (a.startsWith("a "))
      a = a.slice(2);
  }
  if (typeof b === "string") {
    b = b.toLowerCase();
    if (b.startsWith("the "))
      b = b.slice(4);
    else if (b.startsWith("a "))
      b = b.slice(2);
  }
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  return 0;
};