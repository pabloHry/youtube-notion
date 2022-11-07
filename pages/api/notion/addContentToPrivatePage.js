import axios from "axios";
import submitTranscriptToNotion from "../../../service/transcriptToNotionService";
// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req, res, next) {
  try {
    const {
      urlLinkYoutube,
      parent_id,
      url,
      start,
      end,
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
    } = req.query;

    const response = await axios.post(
      "https://www.notion.so/api/v3/addWebClipperURLs",
      {
        type: "block",
        blockId: parent_id,
        spaceId,
        items: [
          {
            url: urlLinkYoutube,
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

    await submitTranscriptToNotion(
      idBlock,
      url,
      start,
      end,
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
    );
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.json({ message: "error" });
  }
}
