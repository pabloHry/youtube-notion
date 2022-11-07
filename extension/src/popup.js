"use strict";

import readLocalStorage from "../utils/readLocalStorage";
import "./popup.css";
import axios from "axios";

(async () => {
  chrome.runtime.sendMessage({
    type: "START",
  });

  document.getElementById("isOnYoutube").style.display = "none";
  document.getElementById("isConnectedToNotion").style.display = "none";

  chrome.runtime.onMessage.addListener(async (request) => {
    const memoryCookieNotion = {};
    const memorySpace = {};
    const memoryPagePrivate = {};
    const memoryPagePublic = {};
    /* Checking if the message is something_completed. */
    document.getElementById("isNotOnYoutube").style.display = "none";

    // ? Get Notion Cookies
    const responseCookieNotion = await chrome.cookies.getAll({
      url: "https://www.notion.so/",
    });

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

    if (responseCookieNotion.length > 6) {
      document.getElementById("isConnectedToNotion").style.display = "block";
      document.getElementById("spinner").style.display = "block";
    } else {
      document.getElementById("isNotConnectedToNotion").style.display = "block";
      return;
    }

    const getAllPages = async () => {
      // ? Get All pages
      const responseGetPagesPrivate = await axios.get(
        "https://youtube-notion.vercel.app/api/notion/getPagesPrivate",
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
        "https://youtube-notion.vercel.app/api/notion/getPagesPublic",
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

      for (
        let index = 0;
        index < responseGetPagesPrivate.data.length;
        index++
      ) {
        const createParagraph = document.createElement("p");
        const element = responseGetPagesPrivate.data[index];
        createParagraph.className =
          "pagesName p-3 border border-bottom-0 border-end-0 border-start-0 mb-0";
        createParagraph.innerHTML = element.icon + " | " + element.title;
        document.getElementById("privatePages").appendChild(createParagraph);
        memoryPagePrivate[element.title] = element.id;
      }

      for (let index = 0; index < responseGetPagesPublic.data.length; index++) {
        const createParagraph = document.createElement("p");
        const element = responseGetPagesPublic.data[index];
        createParagraph.className =
          "pagesName p-3 border border-bottom-0 border-end-0 border-start-0 mb-0";
        createParagraph.innerHTML = element.icon + " | " + element.title;
        document.getElementById("publicPages").appendChild(createParagraph);
        memoryPagePublic[element.title] = element.id;
      }

      // ? GET Pages value text content

      const readValue = async (event) => {
        const text = event.target.textContent;
        if (memoryPagePrivate[text.split("|")[1].trim()] !== undefined) {
          chrome.storage.local.set({
            pageId: memoryPagePrivate[text.split("|")[1].trim()],
          });
          chrome.storage.local.set({
            pageName: text,
          });
          document.getElementsByClassName("pageName")[0].innerHTML = text;
          document.getElementById("addTo").style.display = "none";
          document.getElementById("isOnYoutube").style.display = "block";
        } else {
          chrome.storage.local.set({
            pageId: memoryPagePublic[text.split("|")[1].trim()],
          });
          chrome.storage.local.set({
            pageName: text,
          });
          document.getElementsByClassName("pageName")[0].innerHTML = text;
          document.getElementById("addTo").style.display = "none";
          document.getElementById("isOnYoutube").style.display = "block";
        }
      };
      const listPages = document.getElementsByClassName("pagesName");

      [...listPages].forEach((elem) =>
        elem.addEventListener("click", readValue)
      );

      // ? Create private page

      const createPrivatePage = document.getElementById("createPrivatePage");
      createPrivatePage.addEventListener("click", (event) => {
        const text = event.target.textContent;
        chrome.storage.local.set({
          pageName: text,
        });
        document.getElementsByClassName("pageName")[0].innerHTML = text;
        document.getElementById("addTo").style.display = "none";
        document.getElementById("isOnYoutube").style.display = "block";
      });

      document.getElementsByClassName("pageName")[0].innerHTML =
        await readLocalStorage("pageName");

      document.getElementById("spinner").style.display = "none";
      document.getElementById("isOnYoutube").style.display = "block";
    };

    // ? Get Workspace

    const responseGetWorkspaces = await axios.get(
      "https://youtube-notion.vercel.app/api/notion/getSpaces",
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

    /* Creating a memorySpace object and then looping through the responseGetSpaces.data array. */
    for (let index = 0; index < responseGetWorkspaces.data.length; index++) {
      const createParagraph = document.createElement("p");

      const element = responseGetWorkspaces.data[index];
      createParagraph.className =
        "workspacesName p-3 border border-bottom-0 border-end-0 border-start-0 mb-0";
      createParagraph.innerHTML = element.icon + " | " + element.name;
      document.getElementById("workspaces").appendChild(createParagraph);
      memorySpace[element.name] = element.id;
    }

    // ? GET Workspace value text content

    const readWorkspaceValue = async (event) => {
      const text = event.target.textContent;
      chrome.storage.local.set({
        workspaceName: text,
      });
      chrome.storage.local.set({
        spaceId: memorySpace[text.split("|")[1].trim()],
      });
      document.getElementsByClassName("workspaceName")[0].innerHTML = text;
      document.getElementById("workspaces").style.display = "none";
      document.getElementById("isOnYoutube").style.display = "block";
      document.querySelectorAll(".pagesName").forEach((e) => e.remove());
      await getAllPages();
      chrome.storage.local.set({
        pageName: "No selected",
      });
      document.getElementsByClassName("pageName")[0].innerHTML = "No selected";
    };

    const WorkspaceNameparagraph =
      document.getElementsByClassName("workspacesName");
    [...WorkspaceNameparagraph].forEach((elem) =>
      elem.addEventListener("click", readWorkspaceValue)
    );

    document.getElementsByClassName("workspaceName")[0].innerHTML =
      await readLocalStorage("workspaceName");

    const elementWorkspace = document.getElementById("displayWorkspace");
    elementWorkspace.addEventListener("click", () => {
      document.getElementById("workspaces").style.display = "block";
      document.getElementById("isOnYoutube").style.display = "none";
    });

    const elementPages = document.getElementById("displayPages");
    elementPages.addEventListener("click", () => {
      document.getElementById("addTo").style.display = "block";
      document.getElementById("isOnYoutube").style.display = "none";
    });

    await getAllPages();

    // ? changeTimestampClipYoutube

    const changeTimestampClipYoutube = async () => {
      /* Getting the videoId and videoTimestamp from the local storage. */
      const timestamp = await readLocalStorage("timestamp");
      const videoId = await readLocalStorage("videoId");
      const videoEnd = parseInt(document.getElementById("typeNumber").value);
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
    document
      .getElementById("typeNumber")
      .addEventListener("change", changeTimestampClipYoutube);

    // ? Back

    const elementBackPage = document.getElementById("backPage");
    elementBackPage.addEventListener("click", () => {
      document.getElementById("addTo").style.display = "none";
      document.getElementById("isOnYoutube").style.display = "block";
    });

    const elementBackWorspace = document.getElementById("backWorkspace");
    elementBackWorspace.addEventListener("click", () => {
      document.getElementById("workspaces").style.display = "none";
      document.getElementById("isOnYoutube").style.display = "block";
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
      const pageName = await readLocalStorage("pageName");
      const spaceId = await readLocalStorage("spaceId");

      if (pageName.split("|")[1].trim() === "Create new private page") {
        const responseCreatePage = await axios.get(
          "https://youtube-notion.vercel.app/api/notion/createNewPrivatePage",
          {
            params: {
              url: `https://www.youtube.com/watch?v=${videoId}`,
              start: timestamp,
              end: timestamp + videoEnd,
              urlLinkYoutube,
              title,
              spaceId,
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
        document.getElementById("isOnYoutube").style.display = "none";
        if (responseCreatePage.data.message === "success")
          document.getElementById("ok").style.display = "block";
        else document.getElementById("no").style.display = "block";
      } else {
        const parent_id = await readLocalStorage("pageId");
        if (memoryPagePrivate[pageName.split("|")[1].trim()] !== undefined) {
          const responsePrivatePage = await axios.get(
            "https://youtube-notion.vercel.app/api/notion/addContentToPrivatePage",
            {
              params: {
                urlLinkYoutube,
                url: `https://www.youtube.com/watch?v=${videoId}`,
                start: timestamp,
                end: timestamp + videoEnd,
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
            }
          );

          document.getElementById("isOnYoutube").style.display = "none";
          if (responsePrivatePage.data.message === "success")
            document.getElementById("ok").style.display = "block";
          else document.getElementById("no").style.display = "block";
        } else {
          const reponsePublicPage = await axios.get(
            "https://youtube-notion.vercel.app/api/notion/addContentToPublicPage",
            {
              params: {
                urlLinkYoutube,
                url: `https://www.youtube.com/watch?v=${videoId}`,
                start: timestamp,
                end: timestamp + videoEnd,
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
            }
          );

          document.getElementById("isOnYoutube").style.display = "none";
          if (reponsePublicPage.data.message === "success")
            document.getElementById("ok").style.display = "block";
          else document.getElementById("no").style.display = "block";
        }
      }
    }
  });
})();
