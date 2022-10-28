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
          'NEXT_LOCALE=en-US; notion_experiment_device_id=47c8c730-3429-45a7-87f1-ef973569f2ef; g_state={"i_l":0}; token_v2=6e5d99ab2ef58dcb9f5fa91bda885950424f8f4950cbff200d4002bf86c4d2ac221d7440741cbfc0a357aa3acabc9bb28a5c4bc4ae1679c2dfa905fdb8031f57aa1260bbcaa089673b835306ae2d; notion_user_id=be4ed882-99c7-4c77-9fca-62a56d637bde; notion_cookie_consent={%22id%22:%22fa11b3c4-bf1d-4fbb-a340-add7a1b3bdcc%22%2C%22permission%22:{%22necessary%22:true%2C%22targeting%22:true%2C%22preference%22:true%2C%22performance%22:true}%2C%22policy_version%22:%22v5%22}; notion_browser_id=7bab4829-2a87-4ed5-b50c-c1be8b79ae96; notion_users=[%22be4ed882-99c7-4c77-9fca-62a56d637bde%22]; ajs_anonymous_id=7bab48292a874ed5b50cc1be8b79ae96; notion_check_cookie_consent=true; notion_locale=en-US/autodetect; intercom-session-gpfdrxfd=eFJ6SU43OFhyZmM2cERyb3FDa0x5Mis3ZmxPSDY0ZnpOemJGdGQxbVJUNU9VNlVEajFNbFdIMkZ2bnd1VU1qaS0tclR1RTVZaWdSdVVVNWZBV01VQ21iUT09--6a067b2caee220bf195fe450fb42d54ef3b11471; __cf_bm=QCrBxHbZZZpR7lhqtwxyl.gDvB9hsat6oRA3QXQ7iuc-1666651867-0-AT3PPqrkqnkaD1uzWV8O31RKxZoCnOAswvknWV6fkFVm7nWXXbKrBbbuG+yNDn16dseat9tGAClLKDvxM6qGfCg=; amp_af43d4=7bab48292a874ed5b50cc1be8b79ae96.YmU0ZWQ4ODI5OWM3NGM3NzlmY2E2MmE1NmQ2MzdiZGU=..1gg5uo7ue.1gg632lhv.1cs.94.1m0',
      },
    }
  );
};
export default submitTranscriptToNotion;
