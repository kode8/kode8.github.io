import Api from './Api';

const pageIds = {
  home: '42AkmniyTegOceI280qEa4',
  experience: '28yoD2ObD6ACIIMik80w4I',
  work: 'fjp7FzAI12M0s00K6icQo',
  history: '3Kit73oyZWQIS6AGooYe0m',
  contact: '4aCO2sVoTS20WMKiCI6UWg',
};

const getPageId = page => pageIds[page];

module.exports = {
  getEntries: query => Api.getEntries(query),
  getPageContent: pageName => Api.getEntry(getPageId(pageName)),
};
