import clipYoutubeToNotionService from "../../../service/createDatabasePrivateAndAddClipYoutubeToNotionService";
import submitTranscriptToNotion from "../../../service/transcriptToNotionService";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req, res, next) {
  const {
    urlLinkYoutube,
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
  try {
    const idBlock = await clipYoutubeToNotionService(
      urlLinkYoutube,
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
    );
    await submitTranscriptToNotion(
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
    );
    res.status(200).json({ message: "success" });
  } catch (err) {
    res.send({ message: "error" });
  }
}
