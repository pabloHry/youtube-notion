/**
 * It sends a message to the video element, and when the video element responds, it calls the
 * responseCallback function
 * @param responseCallback - A callback function that will be called when the response is received.
 */
function sendObtainTimestampRequest(responseCallback) {
  sendMessageOnVideo({ msg: "obtain-timestamp" }, responseCallback);
}

/**
 * Query the current tab, and call the queryCallback function with the result.
 * @param queryCallback - The callback function that will be called with the results of the query.
 * @param [url=null] - The URL to match.
 */
function queryCurrentTab(queryCallback, url = null) {
  /* A function that is called when the user clicks the extension icon. */
  let matchConditions = { active: true, currentWindow: true };
  if (url !== null) {
    matchConditions.url = url;
  }
  chrome.tabs.query(matchConditions, queryCallback);
}

/**
 * "Send a message to the current YouTube video tab."
 *
 * The first parameter is the message to send. The second parameter is an optional callback function
 * that will be called when the message is received
 * @param message - The message to send.
 * @param [responseCallback=null] - A function to be called when the message is responded to.
 */
function sendMessageOnVideo(message, responseCallback = null) {
  /* Sending a message to the current YouTube video tab. */
  queryCurrentTab((tabs) => {
    if (tabs.length > 0) {
      chrome.tabs.sendMessage(tabs[0].id, message, responseCallback);
    }
  }, "https://www.youtube.com/watch?v=*");
}

chrome.runtime.onMessage.addListener(async (request) => {
  if (request.type === "START") {
    sendObtainTimestampRequest(async (response) => {
      const { title, timestamp, url } = response;
      if (chrome.runtime.lastError || !response) {
      } else {
        chrome.runtime.sendMessage({
          msg: "something_completed",
          data: {
            timestamp,
            url,
            title,
          },
        });
      }
    });
  }
});
