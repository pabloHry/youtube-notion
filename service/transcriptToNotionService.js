import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

const submitTranscriptToNotion = async (idBlock) => {
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
        cookie:
          'notion_check_cookie_consent=true; __cf_bm=ePFShoGtywq3GUHBW8WPnmIl4HskckNhF3BoruTeBu0-1666963352-0-AS1pJ3BKtCpGJsfAomrT6tFXMgokrNy/M12JlMoGrpz1xJhl7xGrhdo4F5VcSNcz/ySk+q//rQJX0dC8nDU6XhY=; notion_experiment_device_id=bca45cc8-9959-4e47-8f06-4aa0349eb2e6; NEXT_LOCALE=en-US; notion_locale=en-US/autodetect; g_state={"i_l":0}; token_v2=41a3e316ac958b0aba1fc8ad82247756a2527c165b3a778fc1d020f33d05dfc9d5a906aab8ab5caffac2c04bd876d1bccf532e734f51b28734b63e6255015b0f91587ef372f3da3eba187139b399; notion_user_id=be4ed882-99c7-4c77-9fca-62a56d637bde; notion_users=%5B%22be4ed882-99c7-4c77-9fca-62a56d637bde%22%5D; notion_cookie_consent={%22id%22:%22fa11b3c4-bf1d-4fbb-a340-add7a1b3bdcc%22%2C%22permission%22:{%22necessary%22:true%2C%22targeting%22:true%2C%22preference%22:true%2C%22performance%22:true}%2C%22policy_version%22:%22v5%22}; notion_browser_id=dbf3e8e6-ac16-4303-ab14-abf18a9fff10',
      },
    }
  );
};
export default submitTranscriptToNotion;
