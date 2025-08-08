# Crelate CRM API Integration

A Google Apps Script solution for integrating with the Crelate CRM API to manage contacts, tags, and notes programmatically.

## Features

- **Contact Management**: Retrieve contacts by tags, fetch individual contacts
- **Note Creation**: Add notes to contacts with timestamps
- **Tag Management**: Update and remove tags from contacts
- **Error Handling**: Comprehensive error checking and validation
- **Easy Integration**: Simple setup with Google Apps Script

## Prerequisites

- Google Apps Script project
- Crelate CRM account and API key
- Basic knowledge of JavaScript and Google Apps Script

## Setup Instructions

### 1. Google Apps Script Project Setup

1. Create a new Google Apps Script project
2. Copy the code from all files into your project:
   - `Code.js` - Crelate connection class and setup
   - `Functions.js` - API functions for contact management
   - `Test.js` - Test functions for validation

### 2. Crelate CRM API Setup

1. Sign up for a Crelate CRM account at [crelate.com](https://crelate.com)
2. Get your API key from the Crelate dashboard
3. Initialize the connection in your script:
   ```javascript
   createConnection("YOUR_CRELATE_API_KEY_HERE");
   ```

### 3. API Key Configuration

Replace the placeholder with your actual Crelate API key:
```javascript
// In your main script
createConnection("your_actual_api_key_here");
```

## Usage

### Contact Management

```javascript
// Initialize connection
createConnection("YOUR_CRELATE_API_KEY_HERE");

// Retrieve contacts by tag
const contacts = retrieveContactByTags("YOUR_TAG_NAME");
console.log(contacts);

// Fetch specific contact
const contact = fetchContactInCrelate("CONTACT_ID");
console.log(contact);
```

### Note Creation

```javascript
// Create a note on a contact
const noteData = "Contact was updated via API integration";
const note = createNoteOnContact("CONTACT_ID", noteData);
console.log(note);
```

### Tag Management

```javascript
// Remove a specific tag from a contact
removeTagOnContact("CONTACT_ID", "TAG_TO_REMOVE");
```

## API Functions

### Core Functions

- `createConnection(apiKey)`: Establishes connection to Crelate API
- `retrieveContactByTags(tagName)`: Retrieves contacts with specific tag
- `fetchContactInCrelate(id)`: Fetches a specific contact by ID
- `createNoteOnContact(accountID, noteData, when)`: Creates a note on a contact
- `updateContactTagsInCrelate_(tags, accountID)`: Updates contact tags
- `removeTagOnContact(accountID, tagToRemove, tagCategoryId)`: Removes a tag from a contact

### Error Handling

The functions include comprehensive error handling:
- API key validation
- Connection status checking
- Input data validation
- API response validation

## API Endpoints

### Contacts

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api3/contacts?tag_names={tag}` | GET | Retrieve contacts by tag |
| `/api3/contacts/{id}` | GET | Fetch specific contact |
| `/api3/contacts/{id}` | PATCH | Update contact (tags) |

### Notes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api3/notes` | POST | Create a note on a contact |

## Example Use Cases

### 1. Contact Tag Management

```javascript
// Remove a specific tag from multiple contacts
function removeTagFromContacts(contactIds, tagToRemove) {
  createConnection("YOUR_API_KEY");
  
  contactIds.forEach(contactId => {
    try {
      removeTagOnContact(contactId, tagToRemove);
      console.log(`Removed tag from contact: ${contactId}`);
    } catch (error) {
      console.error(`Error removing tag from contact ${contactId}:`, error);
    }
  });
}
```

### 2. Bulk Note Creation

```javascript
// Add notes to multiple contacts
function addNotesToContacts(contactNotes) {
  createConnection("YOUR_API_KEY");
  
  contactNotes.forEach(({contactId, note}) => {
    try {
      createNoteOnContact(contactId, note);
      console.log(`Added note to contact: ${contactId}`);
    } catch (error) {
      console.error(`Error adding note to contact ${contactId}:`, error);
    }
  });
}
```

### 3. Contact Retrieval and Processing

```javascript
// Process contacts with specific tags
function processContactsByTag(tagName) {
  createConnection("YOUR_API_KEY");
  
  const contacts = retrieveContactByTags(tagName);
  
  contacts.forEach(contact => {
    console.log(`Processing contact: ${contact.Display}`);
    // Add your processing logic here
  });
  
  return contacts;
}
```

## Data Structures

### Contact Object

```javascript
{
  "Id": "contact-id",
  "Display": "Contact Name",
  "Tags": {
    "category-id": [
      {
        "Id": "tag-id",
        "Title": "Tag Name"
      }
    ]
  },
  "Email": "email@example.com",
  "Phone": "phone-number"
}
```

### Note Object

```javascript
{
  "entity": {
    "Display": "Note content",
    "ParentId": {
      "Id": "contact-id",
      "Title": null,
      "EntityName": "Contacts"
    },
    "When": "timestamp"
  }
}
```

## Configuration

### API Limits

- **Rate Limits**: Check your Crelate plan for specific limits
- **Authentication**: API key required for all requests
- **Data Format**: JSON for all requests and responses

### Error Codes

Common error responses:
- `401`: Invalid API key
- `400`: Invalid request parameters
- `404`: Contact not found
- `429`: Rate limit exceeded
- `500`: Server error

## Security Considerations

- **API Keys**: Never commit API keys to version control
- **Data Privacy**: Ensure compliance with data protection regulations
- **Access Control**: Restrict script access to authorized users
- **Data Handling**: Securely process and store contact information

## Best Practices

### 1. Connection Management

```javascript
// Initialize once at the start
createConnection("YOUR_API_KEY");

// Use throughout your script
const contacts = retrieveContactByTags("TAG_NAME");
```

### 2. Error Handling

```javascript
try {
  const contact = fetchContactInCrelate("CONTACT_ID");
  if (contact) {
    console.log("Contact found:", contact.Display);
  }
} catch (error) {
  console.error("API Error:", error.message);
}
```

### 3. Batch Processing

```javascript
// Process contacts in batches
function processContactsInBatches(contactIds, batchSize = 10) {
  for (let i = 0; i < contactIds.length; i += batchSize) {
    const batch = contactIds.slice(i, i + batchSize);
    
    batch.forEach(contactId => {
      // Process each contact
      removeTagOnContact(contactId, "OLD_TAG");
    });
    
    // Rate limiting
    Utilities.sleep(1000);
  }
}
```

## Testing

### Test Functions

The project includes test functions in `Test.js`:

- `tester()`: Example of creating a note on a contact
- `testAPIkeylog()`: Verify API key is configured
- `testRetrieveContactsByTag()`: Test contact retrieval by tag

### Running Tests

```javascript
// Test API connection
function testConnection() {
  const result = testAPIkeylog();
  console.log(result);
}

// Test contact retrieval
function testContactRetrieval() {
  const contacts = testRetrieveContactsByTag("YOUR_TAG");
  console.log("Retrieved contacts:", contacts);
}
```

## Dependencies

- Google Apps Script runtime V8
- Crelate CRM API
- UrlFetchApp service

## License

MIT License

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For issues and questions:
1. Check the Crelate API documentation
2. Verify your API key is correct
3. Review Google Apps Script quotas and limits
4. Test with the Crelate API playground

## API Documentation

For detailed API documentation, visit:
- [Crelate API Documentation](https://api.crelate.com/docs)
- [Crelate Developer Portal](https://developer.crelate.com) 