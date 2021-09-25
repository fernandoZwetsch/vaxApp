const admin = require('firebase-admin');
const serviceAccount = require('./token.js');

let db = {};

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  
  db = admin.firestore();
} catch (error) {
  console.log(`Falha na conexão ${error.message}`)
}

module.exports = db;
