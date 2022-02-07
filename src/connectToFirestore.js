const credentials = require("../credentials.json");
const { initializeApp, getApps, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

function connectToFirestore() {
  if (!getApps().length) {
    initializeApp({
      credential: cert(credentials),
    });
  }
  return getFirestore();
}

module.exports = { connectToFirestore };
