/**
 * Test function for Crelate API integration
 * Replace the placeholder values with your actual data
 */
function tester() {
  // Initialize connection with your API key
  createConnection("YOUR_CRELATE_API_KEY_HERE");
  
  // Example: Create a note on a contact
  // Replace with actual contact ID and note content
  createNoteOnContact("YOUR_CONTACT_ID_HERE", 
  `API ENRICHMENT
  Status: completed
  Data enriched successfully`);
}

/**
 * Test function to verify API key is set
 * @returns {string} API key (for testing purposes)
 */
function testAPIkeylog () {
  if (!crelateConnection || !crelateConnection.apiKey) {
    return "No API key set. Call createConnection() first.";
  }
  return "API key is configured";
}

/**
 * Test function to retrieve contacts by tag
 * @param {string} tagName - Tag name to search for
 */
function testRetrieveContactsByTag(tagName = "YOUR_TAG_NAME") {
  createConnection("YOUR_CRELATE_API_KEY_HERE");
  const contacts = retrieveContactByTags(tagName);
  console.log("Retrieved contacts:", contacts);
  return contacts;
}