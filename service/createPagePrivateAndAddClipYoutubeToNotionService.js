import axios from "axios";

const clipYoutubeToNotionService = async (
  url,
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
  notion_browser_id
) => {
  const response = await axios.post(
    "https://www.notion.so/api/v3/addWebClipperURLs",
    {
      type: "create_collection",
      spaceId,
      name: "My video",
      iconEmoji: "🎥",
      items: [
        {
          url,
          title,
        },
      ],
      from: "chrome",
    },
    {
      headers: {
        "x-notion-active-user-header": notion_user_id,
        cookie: `notion_check_cookie_consent=${notion_check_cookie_consent}; __cf_bm=${__cf_bm}; notion_experiment_device_id=${notion_experiment_device_id}; NEXT_LOCALE=${NEXT_LOCALE}; notion_locale=${notion_locale}; g_state=${g_state}; token_v2=${token_v2}; notion_user_id=${notion_user_id}; notion_users=${notion_users}; notion_cookie_consent=${notion_cookie_consent}; notion_browser_id=${notion_browser_id}`,
      },
    }
  );
  const idBlock = response.data.createdBlockIds[0];
  return idBlock;
};
export default clipYoutubeToNotionService;
