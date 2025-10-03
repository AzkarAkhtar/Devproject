const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb+srv://randomazkar_db_user:NVQ3uxvdHB1NU8SI@node.vropubl.mongodb.net/';
const client = new MongoClient(url);

// Database Name
const dbName = 'Hello';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('User');

  const findResult = await collection.find({}).toArray();
  console.log('Found documents =>', findResult);

  // the following code examples can be pasted here...

  return 'done.';
}


main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());