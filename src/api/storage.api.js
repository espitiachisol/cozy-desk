import { storage } from "../firebaseConfig";

export const PUTstorage = function (child, put) {
  return storage.ref().child(child).put(put);
};
export const GETurlstorage = function (child) {
  return storage.ref().child(child).getDownloadURL();
};
export const DELETEstorage = function (child) {
  return storage.ref().child(child).delete();
};
