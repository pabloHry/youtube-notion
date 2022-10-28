import axios from "axios";

const clipYoutubeToNotionService = async (url, title) => {
  const response = await axios.post(
    "https://www.notion.so/api/v3/addWebClipperURLs",
    {
      type: "block",
      blockId: "c6613908-18a6-4fbb-9fd2-3689f41aaa56",
      spaceId: "b3cdfd58-56f8-42f4-82bf-03552b9dc49f",
      property: "=cHJ",
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
        accept: "*/*",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        "cache-control": "no-cache",
        "content-type": "application/json",
        pragma: "no-cache",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "none",
        "sec-gpc": "1",
        "x-notion-active-user-header": "be4ed882-99c7-4c77-9fca-62a56d637bde",
        cookie:
          'notion_check_cookie_consent=true; __cf_bm=ePFShoGtywq3GUHBW8WPnmIl4HskckNhF3BoruTeBu0-1666963352-0-AS1pJ3BKtCpGJsfAomrT6tFXMgokrNy/M12JlMoGrpz1xJhl7xGrhdo4F5VcSNcz/ySk+q//rQJX0dC8nDU6XhY=; notion_experiment_device_id=bca45cc8-9959-4e47-8f06-4aa0349eb2e6; NEXT_LOCALE=en-US; notion_locale=en-US/autodetect; g_state={"i_l":0}; token_v2=41a3e316ac958b0aba1fc8ad82247756a2527c165b3a778fc1d020f33d05dfc9d5a906aab8ab5caffac2c04bd876d1bccf532e734f51b28734b63e6255015b0f91587ef372f3da3eba187139b399; notion_user_id=be4ed882-99c7-4c77-9fca-62a56d637bde; notion_users=%5B%22be4ed882-99c7-4c77-9fca-62a56d637bde%22%5D; notion_cookie_consent={%22id%22:%22fa11b3c4-bf1d-4fbb-a340-add7a1b3bdcc%22%2C%22permission%22:{%22necessary%22:true%2C%22targeting%22:true%2C%22preference%22:true%2C%22performance%22:true}%2C%22policy_version%22:%22v5%22}; notion_browser_id=dbf3e8e6-ac16-4303-ab14-abf18a9fff10',
      },
      referrerPolicy: "strict-origin-when-cross-origin",
    }
  );
  const idBlock = response.data.createdBlockIds[0];
  return idBlock;
};
export default clipYoutubeToNotionService;
