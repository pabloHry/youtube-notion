const readLocalStorage = async (key) => {
  /* A promise that will resolve if the key is found in the local storage and reject if it is not. */
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([key], function (result) {
      if (result[key] === undefined) {
        reject();
      } else {
        resolve(result[key]);
      }
    });
  });
};

module.exports = readLocalStorage;
