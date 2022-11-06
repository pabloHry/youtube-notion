"use strict";

import readLocalStorage from "../utils/readLocalStorage";
import "./popup.css";
import axios from "axios";

(async () => {
  chrome.runtime.sendMessage({
    type: "START",
  });

  document.getElementById("isOnYoutube").style.display = "none";

  chrome.runtime.onMessage.addListener(async (request) => {
    /* Checking if the message is something_completed. */
    document.getElementById("isOnYoutube").style.display = "block";
    document.getElementById("isNotOnYoutube").style.display = "none";
    const responseCookieNotion = await chrome.cookies.getAll({
      url: "https://www.notion.so/",
    });

    const memoryCookieNotion = {};

    responseCookieNotion.forEach(
      (element) => (memoryCookieNotion[element.name] = element.value)
    );

    const {
      notion_check_cookie_consent,
      __cf_bm,
      notion_experiment_device_id,
      NEXT_LOCALE,
      notion_locale,
      g_state,
      token_v2,
      notion_user_id,
      notion_users,
      notion_cookie_consent,
      notion_browser_id,
    } = memoryCookieNotion;

    if (responseCookieNotion.length <= 6)
      document.getElementById("isConnectedToNotion").style.display = "none";
    else
      document.getElementById("isNotConnectedToNotion").style.display = "none";

    const memoryPagePrivate = {};
    const memoryPagePublic = {};

    const getAllPages = async () => {
      const responseGetPagesPrivate = await axios.get(
        "http://localhost:3000/api/notion/getPagesPrivate",
        {
          params: {
            notion_check_cookie_consent,
            __cf_bm,
            notion_experiment_device_id,
            NEXT_LOCALE,
            notion_locale,
            g_state,
            token_v2,
            notion_user_id,
            notion_users,
            notion_cookie_consent,
            notion_browser_id,
            spaceId: await readLocalStorage("spaceId"),
          },
        }
      );
      const responseGetPagesPublic = await axios.get(
        "http://localhost:3000/api/notion/getPagesPublic",
        {
          params: {
            notion_check_cookie_consent,
            __cf_bm,
            notion_experiment_device_id,
            NEXT_LOCALE,
            notion_locale,
            g_state,
            token_v2,
            notion_user_id,
            notion_users,
            notion_cookie_consent,
            notion_browser_id,
            spaceId: await readLocalStorage("spaceId"),
          },
        }
      );

      const selectPage = document.getElementById("pages");

      const optPrivate = document.createElement("option");
      optPrivate.value = "----PRIVATE----";
      optPrivate.text = "----PRIVATE----";
      selectPage.add(optPrivate);

      for (
        let index = 0;
        index < responseGetPagesPrivate.data.length;
        index++
      ) {
        const opt = document.createElement("option");
        const element = responseGetPagesPrivate.data[index];
        opt.value = element.title;
        opt.text = element.title;
        selectPage.add(opt);
        memoryPagePrivate[element.title] = element.id;
      }

      const optPublic = document.createElement("option");
      optPublic.value = "----PUBLIC----";
      optPublic.text = "----PUBLIC----";
      selectPage.add(optPublic);

      for (let index = 0; index < responseGetPagesPublic.data.length; index++) {
        const opt = document.createElement("option");
        const element = responseGetPagesPublic.data[index];
        opt.value = element.title;
        opt.text = element.title;
        selectPage.add(opt);
        memoryPagePublic[element.title] = element.id;
      }
    };

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

    const responseGetSpaces = await axios.get(
      "http://localhost:3000/api/notion/getSpaces",
      {
        params: {
          notion_check_cookie_consent,
          __cf_bm,
          notion_experiment_device_id,
          NEXT_LOCALE,
          notion_locale,
          g_state,
          token_v2,
          notion_user_id,
          notion_users,
          notion_cookie_consent,
          notion_browser_id,
        },
      }
    );

    /* Checking if the spaceName is in the local storage. If it is not, it will set the spaceName and
    spaceId in the local storage. */
    const sel = document.getElementById("workspace");
    const spaceName = await readLocalStorage("spaceName");
    if (!spaceName) {
      chrome.storage.local.set({
        spaceName: responseGetSpaces.data[0].name,
      });
      chrome.storage.local.set({ spaceId: responseGetSpaces.data[0].id });
    }

    /* Creating a memorySpace object and then looping through the responseGetSpaces.data array. */
    const memorySpace = {};
    for (let index = 0; index < responseGetSpaces.data.length; index++) {
      const opt = document.createElement("option");
      const element = responseGetSpaces.data[index];
      opt.value = element.name;
      opt.text = element.name;
      sel.add(opt);
      memorySpace[element.name] = element.id;
    }

    const selectElement = document.getElementById("workspace");
    selectElement.addEventListener("change", async (event) => {
      chrome.storage.local.set({ spaceName: event.target.value });
      chrome.storage.local.set({ spaceId: memorySpace[event.target.value] });
      document
        .querySelectorAll("#pages option")
        .forEach((option) => option.remove());
      await getAllPages();
    });

    document.getElementById("workspace").value = spaceName;

    await getAllPages();

    const selectPagesElement = document.getElementById("pages");
    selectPagesElement.addEventListener("change", async (event) => {
      chrome.storage.local.set({
        parentId: memoryPagePublic[event.target.value],
      });
    });

    const { timestamp, url, title } = request.data;

    if (request.msg === "something_completed") {
      const videoId = url.split("=")[1];
      const videoEnd = timestamp + 10;

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
      const spaceId = await readLocalStorage("spaceId");
      const parent_id = await readLocalStorage("parentId");

      await axios.get("http://localhost:3000/api/transcript", {
        params: {
          url: `https://www.youtube.com/watch?v=${videoId}`,
          start: timestamp,
          end: timestamp + videoEnd,
        },
      });

      await axios.get("http://localhost:3000/api/notion", {
        params: {
          urlLinkYoutube,
          title,
          spaceId,
          parent_id,
          notion_check_cookie_consent,
          __cf_bm,
          notion_experiment_device_id,
          NEXT_LOCALE,
          notion_locale,
          g_state,
          token_v2,
          notion_user_id,
          notion_users,
          notion_cookie_consent,
          notion_browser_id,
        },
      });
      //   document.getElementById("notion").style.display = "none";
      //   if (
      //     responseTranscript.data.message === "success" &&
      //     responseSendToNotion.data.message === "success"
      //   ) {
      //     document.getElementById("validationTranscript").innerHTML =
      //       responseTranscript.data.message;
      //   }
    }
  });
})();
