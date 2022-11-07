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
          "x-notion-active-user-header": notion_user_id,
          cookie: `notion_experiment_device_id=${notion_experiment_device_id}; NEXT_LOCALE=${NEXT_LOCALE}; g_state=${g_state}; token_v2=${token_v2}; notion_user_id=${notion_user_id}; notion_cookie_consent=${notion_cookie_consent}; notion_browser_id=${notion_browser_id}; notion_users=${notion_users}; notion_check_cookie_consent=${notion_check_cookie_consent}; notion_locale=${notion_locale}; __cf_bm=${__cf_bm}`,
        },
      }
    );
    const memorySpace = [];
    const memorySpaceName = [];

    for (const [key] of Object.entries(
      responseGetSpaces.data[notion_user_id].space
    )) {
      memorySpace.push(key);
    }

    for (let index = 0; index < memorySpace.length; index++) {
      const element = memorySpace[index];
      memorySpaceName.push({
        name: responseGetSpaces.data[notion_user_id].space[element].value.name,
        id: responseGetSpaces.data[notion_user_id].space[element].value.id,
        icon: responseGetSpaces.data[notion_user_id].space[element].value.icon
          ? responseGetSpaces.data[notion_user_id].space[element].value.icon
          : "📁",
      });
    }

    res.status(200).json(memorySpaceName);
  } catch (err) {
    res.send({ message: "error" });
  }
}
