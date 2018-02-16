import * as contentful from 'contentful';

const Auth = {
    SPACE_ID : '8hsgxh068x86',
    ACCESS_TOKEN : '82afd394b8bc3eec6f8c729bfabc0eb28b921b752dd60deffde85272a3bc782e'
}

const handeError = (error) => {
    console.warn(error);
    return null;
};

const Client = contentful.createClient({
    space: Auth.SPACE_ID,
    accessToken: Auth.ACCESS_TOKEN
})

/* Retrieves Multiple Entries */
/* @param id : string */
const getEntries = (query) => {
    return fetchEntries(query)
    .then((entries) => entries)
}

/* Retrieves A Single entry */
/* @param entry_id : string */
const getEntry = (entry_id) => {
    return fetchEntry(entry_id)
    .then((entry) => entry)
}

/* Retrieves ContentTypes */
/* @param id : string */
const getContentType = (id) => {
    return fetchContentType(id)
    .then((type) => type)
}

/* Retrieves All ContentTypes */
const getContentTypes = () => {
    return fetchContentTypes()
    .then((types) => types)
}

/* Contentful Api request to get a Content Entries */
/* @param id : string | navigation */
const fetchEntry = (entry_id) => {
    return Client.getEntry(entry_id)
    .then((entry) => entry) 
    .catch((error) => {
      console.log('\nError occurred while fetching Content Entry')
      console.error(error)
    })
}

/* Contentful Api request to get a Content Entries */
/* @param id : string | navigation */
const fetchEntries = (query) => {
    return Client.getEntries(query)
    .then((entries) => entries) 
    .catch((error) => {
      console.log('\nError occurred while fetching Content Entries')
      console.error(error)
    })
}

/* Contentful Api request to get Content Types */
const fetchContentTypes = () => {
    return Client.getContentTypes()
    .then((response) => response.items) 
    .catch((error) => {
      console.log('\nError occurred while fetching Content Types:')
      console.error(error)
    })
}

/* Contentful Api request to get a Content Type */
const fetchContentType = (id) => {
    return Client.getContentType(id)
    .then((type) => type) 
    .catch((error) => {
      console.log('\nError occurred while fetching Content Type:')
      console.error(error)
    })
}

module.exports = {
    getContentTypes,
    getContentType,
    getEntry,
    getEntries
};;