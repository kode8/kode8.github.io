import Api from './Api';

const pageIds = {
    home: '42AkmniyTegOceI280qEa4',
    experience: '28yoD2ObD6ACIIMik80w4I',
    services: '2rsmuPDjw8kiQKUwEiwGUy',
    portfolio: 'fjp7FzAI12M0s00K6icQo',
    contact: '4aCO2sVoTS20WMKiCI6UWg'
}

const getPageId = (page) => {
    return pageIds[page];
}

module.exports = {
    getEntries: (contentType) => Api.getEntries({'content_type': contentType}),
    getPageContent: (pageName) => Api.getEntry( getPageId(pageName) ),
}