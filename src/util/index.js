import { Base64 } from 'js-base64';
import transformDataURL from './transformDataUrl';
import base64XlsToJson from './base64ToXls';
import mapArrayObjectKeyToCamelCase from './mapArrayObjectKeyToCamelCase';
import mapArrayObjectKeyToSnakeCase from './mapArrayObjectKeyToSnakeCase';
import model2Object from './model2Object';

const btoa = (str) => Base64.encode(str);

const atob = (encodedStr) => Base64.decode(encodedStr);


export {
  transformDataURL,
  base64XlsToJson,
  mapArrayObjectKeyToCamelCase,
  mapArrayObjectKeyToSnakeCase,
  model2Object,
  btoa,
  atob,
};
