import { firestore } from "../firebaseConfig";

export const getFirestore = function (collection, doc) {
  return firestore.collection(collection).doc(doc).get();
};

export const setFirestore = function (collection, doc, set) {
  return firestore.collection(collection).doc(doc).set(set);
};

export const deleteFirestore = function (collection, doc) {
  return firestore.collection(collection).doc(doc).delete();
};
