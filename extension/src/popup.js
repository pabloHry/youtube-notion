"use strict";

import readLocalStorage from "../utils/readLocalStorage";
import "./popup.css";
import axios from "axios";

(async () => {
  chrome.runtime.sendMessage({
    type: "START",
  });

  const responseCookieNotion = await chrome.cookies.getAll({
    url: "https://www.notion.so/",
  });

  if (responseCookieNotion.length <= 6) {
    document.getElementById("notion").innerHTML =
      "You are not logged in to Notion. Please log in and try again.";
    document.getElementById("isConnectedToNotion").style.display = "block";
  }

  document.addEventListener("DOMContentLoaded", function () {
    document
      .getElementById("inputTimeClipYoutube")
      .addEventListener("change", changeTimestampClipYoutube);
  });

  const changeTimestampClipYoutube = async () => {
    /* Getting the videoId and videoTimestamp from the local storage. */
    const timestamp = await readLocalStorage("timestamp");
    const videoId = await readLocalStorage("videoId");
    const videoEnd = parseInt(
      document.getElementById("inputTimeClipYoutube").value
    );

    /* Checking if the end time is less than or equal to 0. If it is, it will alert the user that the end
 time must be greater than 0. */
    if (videoEnd <= 0) {
      alert("The end time must be greater than 0");
      return;
    }

    /* Setting the innerHTML of the element with id urlClipYoutube to the url of the youtube video. */
    const urlLinkYoutube = `https://www.youtube.com/embed/${videoId}?start=${timestamp}&end=${
      timestamp + videoEnd
    }&autoplay=1`;

    chrome.storage.local.set({ urlLinkYoutube });
    chrome.storage.local.set({ timestamp });
    chrome.storage.local.set({ videoEnd });
  };

  chrome.runtime.onMessage.addListener(async (request) => {
    /* Checking if the message is something_completed. */
    const { timestamp, url, title } = request.data;
    if (request.msg === "something_completed") {
      const videoId = url.split("=")[1];
      const videoEnd = timestamp + 10;

      /* Setting the innerHTML of the element with id urlClipYoutube to the url of the youtube video. */

      const urlLinkYoutube = `https://www.youtube.com/embed/${
        url.split("=")[1]
      }?start=${timestamp}&end=${timestamp + 10}&autoplay=1`;
      /* Setting the videoId and videoTimestamp in the local storage. */
      chrome.storage.local.set({
        videoId,
      });
      chrome.storage.local.set({
        timestamp,
      });
      chrome.storage.local.set({
        videoEnd,
      });
      chrome.storage.local.set({ urlLinkYoutube });
    }

    const element = document.getElementById("sendToNotion");
    element.addEventListener("click", sendToNotion);

    async function sendToNotion() {
      const urlLinkYoutube = await readLocalStorage("urlLinkYoutube");
      const videoEnd = await readLocalStorage("videoEnd");
      const videoId = await readLocalStorage("videoId");
      const responseTranscript = await axios.get(
        "http://localhost:3000/api/transcript",
        {
          params: {
            url: `https://www.youtube.com/watch?v=${videoId}`,
            start: timestamp,
            end: timestamp + videoEnd,
          },
        }
      );

      // const response = await axios.get("http://localhost:3000/api/notion");
      const responseSendToNotion = await axios.get(
        "http://localhost:3000/api/notion",
        {
          params: {
            urlLinkYoutube,
            title,
          },
        }
      );

      console.log(responseTranscript.data.message);
      document.getElementById("validationTranscript").innerHTML =
        responseTranscript.data.message;
      document.getElementById("validationNotion").innerHTML =
        responseSendToNotion.data.message;
    }
  });
})();
