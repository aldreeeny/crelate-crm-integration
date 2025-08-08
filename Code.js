class Crelate {
  constructor(apiKey){
    this.apiKey_ = apiKey;
  }
  get apiKey () {
    return this.apiKey_;
  }
}

let crelateConnection;

/**
 * Creates a connection to the Crelate CRM API
 * @param {string} apiKey - Your Crelate API key
 */
function createConnection (apiKey) {
  crelateConnection = new Crelate(apiKey);
}
