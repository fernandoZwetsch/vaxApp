const admin = require('firebase-admin');
const serviceAccount = require('./vax-app-fc9af-6434b40831bd.json');

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
