import parseDataURL from 'parse-data-url';
import { last } from 'lodash';

const transformDataURL = (dataUrl) => {
  const parseData = parseDataURL(dataUrl);
  if (parseData) {
    return {
      body: parseData.data,
      ext: last(parseData.contentType.split('/')),
      contentType: parseData.contentType,
    };
  }

  return '';
};
export default transformDataURL;
