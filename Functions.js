/**
 * Retrieves Contact By Tag Name
 *
 * Retrieves all contacts that have a specific tag
 * @param {string} tagName - Tag name to search for
 * @returns {Array} Contact - Array of contact JSON objects
 */
function retrieveContactByTags(tagName) {
  if (!crelateConnection || !crelateConnection.apiKey) {
    throw new Error("Crelate connection not established. Call createConnection() first.");
  }
  
  let url = `https://app.crelate.com/api3/contacts?tag_names=${tagName}`;
  let options = {
    method : 'get',
    headers: {
      "X-API-KEY": crelateConnection.apiKey,
      "Accept": "application/json",
      "content-type": "application/json"
    },
    muteHttpExceptions: true
  };
  let res = UrlFetchApp.fetch(url, options);
  res = res.getContentText();
  let json = JSON.parse(res);
  return json.Data;
}

/**
 * Creates a note on a contact
 *
 * @param {string} accountID - Contact ID
 * @param {string} noteData - Note content
 * @param {string} when - Optional timestamp for the note
 * @returns {Object} Note - Created note JSON object
 */
function createNoteOnContact(accountID, noteData, when = null) {
  if (!crelateConnection || !crelateConnection.apiKey) {
    throw new Error("Crelate connection not established. Call createConnection() first.");
  }
  
  let url = `https://app.crelate.com/api3/notes`;
  let data = {
    "entity": {
      "Display": noteData,
      "ParentId": {
        "Id": accountID,
        "Title": null,
        "EntityName": "Contacts"
      },
      "When": when
    }
  };
  let options = {
    method : 'post',
    headers: {
      "X-API-KEY": crelateConnection.apiKey,
      "Accept": "application/json",
      "content-type": "application/json"
    },
    payload: JSON.stringify(data),
    muteHttpExceptions: true
  };
  let res = UrlFetchApp.fetch(url, options);
  let json = JSON.parse(res.getContentText());
  return json;
}

/**
 * Fetches a specific contact by ID
 *
 * @param {string} id - Contact ID
 * @returns {Object} Contact - Contact JSON object
 */
function fetchContactInCrelate (id) {
  if (!crelateConnection || !crelateConnection.apiKey) {
    throw new Error("Crelate connection not established. Call createConnection() first.");
  }
  
  let url = `https://app.crelate.com/api3/contacts/${id}`
  let options = {
    method : 'get',
    headers: {
      "X-API-KEY": crelateConnection.apiKey,
      "Accept": "application/json",
      "content-type": "application/json"
    },
    muteHttpExceptions: true
  };
  let res = UrlFetchApp.fetch(url, options);
  let json = JSON.parse(res.getContentText());

  return json.Data;
}

/**
 * Updates contact tags in Crelate
 *
 * @param {Object} tags - Tags object
 * @param {string} accountID - Contact ID
 * @returns {Object} Response - API response
 */
function updateContactTagsInCrelate_ (tags, accountID) {
  if (!crelateConnection || !crelateConnection.apiKey) {
    throw new Error("Crelate connection not established. Call createConnection() first.");
  }
  
  let url = `https://app.crelate.com/api3/contacts/${accountID}`
  let data = {
    "entity": {
      "Tags": tags
    }
  };
  let options = {
    method : 'patch',
    headers: {
      "X-API-KEY": crelateConnection.apiKey,
      "Accept": "application/json",
      "content-type": "application/json"
    },
    payload: JSON.stringify(data),
    muteHttpExceptions: true
  };
  let res = UrlFetchApp.fetch(url, options);
  return res;
}

/**
 * Removes a specific tag from a contact
 *
 * @param {string} accountID - Contact ID
 * @param {string} tagToRemove - Tag name to remove
 * @param {string} tagCategoryId - Tag category ID (optional)
 */
function removeTagOnContact (accountID, tagToRemove, tagCategoryId = "00000000-0000-0000-0000-000000000000") {
  if (!crelateConnection || !crelateConnection.apiKey) {
    throw new Error("Crelate connection not established. Call createConnection() first.");
  }
  
  let contact = fetchContactInCrelate(accountID);
  let tags = contact.Tags[tagCategoryId];
  
  if (tags) {
    for(let index = 0; index < tags.length; index++){
      if(tags[index].Title == tagToRemove) {
        tags.splice(index, 1);
      }
    }
    
    if(tags.length > 0) {
      contact.Tags[tagCategoryId] = tags;
    } else {
      delete contact.Tags[tagCategoryId];
    }
    
    updateContactTagsInCrelate_(contact.Tags, accountID);
  }
}