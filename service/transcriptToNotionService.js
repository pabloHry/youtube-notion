import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

const submitTranscriptToNotion = async (
  idBlock,
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
  notion_browser_id
) => {
  const createNewId = uuidv4();
  const transcript = fs.readFileSync("transcript/transcript.txt", "utf8");

  await axios.post(
    "https://www.notion.so/api/v3/submitTransaction",
    {
      requestId: uuidv4(),
      referrerPolicy: "strict-origin-when-cross-origin",
      transactions: [
        {
          id: uuidv4(),
          operations: [
            {
              id: createNewId,
              table: "block",
              path: [],
              command: "update",
              args: {
                type: "text",
                id: createNewId,
                parent_id: idBlock,
                parent_table: "block",
                alive: true,
                version: 1,
                created_time: 1666643126188,
                last_edited_time: 1666643126188,
                properties: {
                  title: [[transcript]],
                },
              },
            },
            {
              table: "block",
              id: idBlock,
              path: ["content"],
              command: "listAfter",
              args: {
                after: uuidv4(),
                id: createNewId,
              },
            },
          ],
        },
      ],
    },
    {
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "no-cache",
        "content-type": "application/json",
        pragma: "no-cache",
        "sec-ch-ua":
          '"Chromium";v="106", "Google Chrome";v="106", "Not;A=Brand";v="99"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "none",
        "x-notion-active-user-header": notion_user_id,
        cookie: `notion_check_cookie_consent=${notion_check_cookie_consent}; __cf_bm=${__cf_bm}; notion_experiment_device_id=${notion_experiment_device_id}; NEXT_LOCALE=${NEXT_LOCALE}; notion_locale=${notion_locale}; g_state=${g_state}; token_v2=${token_v2}; notion_user_id=${notion_user_id}; notion_users=${notion_users}; notion_cookie_consent=${notion_cookie_consent}; notion_browser_id=${notion_browser_id}`,
      },
    }
  );
};
export default submitTranscriptToNotion;
