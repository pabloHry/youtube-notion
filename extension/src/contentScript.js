/**
 * It returns an object with the current timestamp and the current url
 * @returns An object with two properties: timestamp and url.
 */
function getCurrentTimestampInfo() {
  /* Getting the current time of the video and the current url. */
  const time = document.getElementsByTagName("video")[0].currentTime;
  const url = location.href;
  const title = document.title;

  return {
    timestamp: Math.floor(time),
    url,
    title,
  };
}

function listenMessages() {
  /* Listening for a message from the background script. */
  chrome.runtime.onMessage.addListener((request, sender, response) => {
    if (request.msg === "obtain-timestamp") {
      const timestampData = getCurrentTimestampInfo();
      response(timestampData);
    }
  });
}

listenMessages();
