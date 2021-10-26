import { storage } from '../firebaseConfig';

export const putStorage = function (child, put) {
  return storage.ref().child(child).put(put);
};
export const getUrlStorage = function (child) {
  return storage.ref().child(child).getDownloadURL();
};
export const deleteStorage = function (child) {
  return storage.ref().child(child).delete();
};
