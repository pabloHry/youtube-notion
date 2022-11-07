import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

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
  const transcriptDirectory = path.join(process.cwd(), "transcript");

  const transcript = fs.readFile(
    transcriptDirectory + "/transcript.txt",
    "utf8"
  );

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
                created_time: Date.now(),
                last_edited_time: Date.now(),
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
        "x-notion-active-user-header": notion_user_id,
        cookie: `notion_check_cookie_consent=${notion_check_cookie_consent}; __cf_bm=${__cf_bm}; notion_experiment_device_id=${notion_experiment_device_id}; NEXT_LOCALE=${NEXT_LOCALE}; notion_locale=${notion_locale}; g_state=${g_state}; token_v2=${token_v2}; notion_user_id=${notion_user_id}; notion_users=${notion_users}; notion_cookie_consent=${notion_cookie_consent}; notion_browser_id=${notion_browser_id}`,
      },
    }
  );
};
export default submitTranscriptToNotion;
