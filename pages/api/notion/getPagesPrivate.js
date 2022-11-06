import axios from "axios";
// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req, res, next) {
  const {
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
  } = req.query;

  const response = await axios.post(
    "https://www.notion.so/api/v3/getUserSharedPagesInSpace",
    {
      spaceId,
      includeDeleted: true,
      includeTeamSharedPages: true,
    },
    {
      headers: {
        "notion-client-version": "23.10.26.69",
        cookie: `notion_check_cookie_consent=${notion_check_cookie_consent}; __cf_bm=${__cf_bm}; notion_experiment_device_id=${notion_experiment_device_id}; NEXT_LOCALE=${NEXT_LOCALE}; notion_locale=${notion_locale}; g_state=${g_state}; token_v2=${token_v2}; notion_user_id=${notion_user_id}; notion_users=${notion_users}; notion_cookie_consent=${notion_cookie_consent}; notion_browser_id=${notion_browser_id}`,
      },
    }
  );

  const pagesPrivate = [];

  for (const [key, value] of Object.entries(response.data.recordMap.block)) {
    const element = value.value.value;
    if (element.alive === true && element.parent_table === "space")
      pagesPrivate.push({
        id: key,
        title: element.properties?.title[0][0],
      });
  }

  res.status(200).json(pagesPrivate);
}
