import axios from "axios";
// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req, res, next) {
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
  } = req.query;

  try {
    const responseGetSpaces = await axios.post(
      "https://www.notion.so/api/v3/getSpaces",
      {},
      {
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9",
          "cache-control": "no-cache",
          "content-type": "application/json",
          pragma: "no-cache",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "none",
          "sec-gpc": "1",
          "x-notion-active-user-header": "be4ed882-99c7-4c77-9fca-62a56d637bde",
          cookie: `notion_experiment_device_id=${notion_experiment_device_id}; NEXT_LOCALE=${NEXT_LOCALE}; g_state=${g_state}; token_v2=${token_v2}; notion_user_id=${notion_user_id}; notion_cookie_consent=${notion_cookie_consent}; notion_browser_id=${notion_browser_id}; notion_users=${notion_users}; notion_check_cookie_consent=${notion_check_cookie_consent}; notion_locale=${notion_locale}; __cf_bm=${__cf_bm}`,
        },
        referrerPolicy: "strict-origin-when-cross-origin",
      }
    );
    const memorySpace = [];
    const memorySpaceName = [];

    for (const [key] of Object.entries(
      responseGetSpaces.data["be4ed882-99c7-4c77-9fca-62a56d637bde"].space
    )) {
      memorySpace.push(key);
    }

    for (let index = 0; index < memorySpace.length; index++) {
      const element = memorySpace[index];
      memorySpaceName.push({
        name: responseGetSpaces.data["be4ed882-99c7-4c77-9fca-62a56d637bde"]
          .space[element].value.name,
        id: responseGetSpaces.data["be4ed882-99c7-4c77-9fca-62a56d637bde"]
          .space[element].value.id,
      });
    }

    res.status(200).json(memorySpaceName);
  } catch (err) {
    res.send({ message: "error" });
  }
}
