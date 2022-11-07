import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req, res, next) {
  try {
    const {
      parent_id,
      urlLinkYoutube,
      title,
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
    } = req.query;
    const createNewId = uuidv4();
    const createNewId2 = uuidv4();
    const createNewId3 = uuidv4();
    const createNewIdTranscript = uuidv4();

    const transcript = fs.readFile(
      process.cwd() + "/transcript/transcript.txt",
      "utf8"
    );

    await axios.post(
      "https://www.notion.so/api/v3/submitTransaction",
      {
        requestId: uuidv4(),
        transactions: [
          {
            id: uuidv4(),
            operations: [
              {
                id: createNewId,
                path: [],
                args: {
                  id: createNewId,
                  version: 1,
                  alive: true,
                  created_by: notion_user_id,
                  created_time: Date.now(),
                  last_edited_by: notion_user_id,
                  last_edited_time: Date.now(),
                  parent_id,
                  parent_table: "collection",
                  type: "page",
                },
                command: "set",
                table: "block",
              },
              {
                id: createNewId2,
                table: "block",
                path: [],
                command: "set",
                args: {
                  type: "text",
                  id: createNewId2,
                  version: 1,
                },
              },
              {
                id: createNewId2,
                table: "block",
                path: [],
                command: "update",
                args: {
                  parent_id: createNewId,
                  parent_table: "block",
                  alive: true,
                },
              },
              {
                table: "block",
                id: createNewId,
                path: ["content"],
                command: "listBefore",
                args: { id: createNewId2 },
              },
              {
                id: createNewId3,
                table: "block",
                path: [],
                command: "set",
                args: {
                  type: "divider",
                  id: createNewId3,
                  properties: {},
                },
              },
              {
                id: createNewId3,
                table: "block",
                path: [],
                command: "update",
                args: {
                  parent_id: createNewId,
                  parent_table: "block",
                  alive: true,
                },
              },
              {
                table: "block",
                id: createNewId,
                path: ["content"],
                command: "listAfter",
                args: {
                  after: createNewId2,
                  id: createNewId3,
                },
              },
              {
                id: createNewId2,
                table: "block",
                path: ["properties"],
                command: "update",
                args: {
                  source: [[urlLinkYoutube]],
                },
              },
              {
                id: createNewId2,
                table: "block",
                path: ["format"],
                command: "update",
                args: {
                  block_width: 854,
                  block_preserve_scale: true,
                  block_full_width: false,
                  block_page_width: true,
                  block_aspect_ratio: 0.5620608899297423,
                  display_source: urlLinkYoutube,
                },
              },
              {
                id: createNewId2,
                table: "block",
                path: [],
                command: "update",
                args: { type: "video" },
              },
              {
                id: createNewId,
                path: ["properties", "title"],
                args: [[title]],
                command: "set",
                table: "block",
              },
              {
                id: createNewId,
                path: ["properties", "9kvV"],
                args: [[urlLinkYoutube]],
                command: "set",
                table: "block",
              },
              {
                id: createNewId,
                path: ["format", "page_icon"],
                args: "https://www.youtube.com/s/desktop/4965577f/img/favicon_96x96.png",
                command: "set",
                table: "block",
              },
              {
                id: createNewIdTranscript,
                table: "block",
                path: [],
                command: "set",
                args: {
                  type: "text",
                  id: createNewIdTranscript,
                  properties: {},
                },
              },
              {
                id: createNewIdTranscript,
                table: "block",
                path: [],
                command: "update",
                args: {
                  parent_id: createNewId,
                  parent_table: "block",
                  alive: true,
                },
              },
              {
                table: "block",
                id: createNewId,
                path: ["content"],
                command: "listAfter",
                args: {
                  after: createNewId3,
                  id: createNewIdTranscript,
                },
              },
              {
                id: createNewIdTranscript,
                path: ["properties", "title"],
                args: [[transcript]],
                command: "set",
                table: "block",
              },
            ],
          },
        ],
      },
      {
        headers: {
          cookie: `notion_check_cookie_consent=${notion_check_cookie_consent}; __cf_bm=${__cf_bm}; notion_experiment_device_id=${notion_experiment_device_id}; NEXT_LOCALE=${NEXT_LOCALE}; notion_locale=${notion_locale}; g_state=${g_state}; token_v2=${token_v2}; notion_user_id=${notion_user_id}; notion_users=${notion_users}; notion_cookie_consent=${notion_cookie_consent}; notion_browser_id=${notion_browser_id}`,
        },
      }
    );

    res.status(200).json({ message: "success" });
  } catch (error) {
    res.json({ message: "error" });
  }
}
