import { firestore } from "../firebaseConfig";

export const GETfirestore = function (collection, doc) {
  return firestore.collection(collection).doc(doc).get();
};

export const SETfirestore = function (collection, doc, set) {
  return firestore.collection(collection).doc(doc).set(set);
};

export const DELETEfirestore = function (collection, doc) {
  return firestore.collection(collection).doc(doc).delete();
};
