import XLSX from 'xlsx';
import { first } from 'lodash';

const base64XlsToJson = async ({ body }) => {
  const workbook = await XLSX.read(body, { type: 'base64', sheetStubs: true });
  const sheetName = first(workbook.SheetNames);
  const worksheet = workbook.Sheets[sheetName];
  return XLSX.utils.sheet_to_json(worksheet, { raw: true, defval: '' });
};

export default base64XlsToJson;
