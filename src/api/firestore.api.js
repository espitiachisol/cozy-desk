import { firestore } from "../firebaseConfig";

export const GETFirestore = function (collection, doc) {
  return firestore.collection(collection).doc(doc).get();
};

export const SETFirestore = function (collection, doc, set) {
  return firestore.collection(collection).doc(doc).set(set);
};

export const DELETEFirestore = function (collection, doc) {
  return firestore.collection(collection).doc(doc).delete();
};
