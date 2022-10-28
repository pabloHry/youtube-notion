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
          'NEXT_LOCALE=en-US; notion_experiment_device_id=47c8c730-3429-45a7-87f1-ef973569f2ef; g_state={"i_l":0}; token_v2=6e5d99ab2ef58dcb9f5fa91bda885950424f8f4950cbff200d4002bf86c4d2ac221d7440741cbfc0a357aa3acabc9bb28a5c4bc4ae1679c2dfa905fdb8031f57aa1260bbcaa089673b835306ae2d; notion_user_id=be4ed882-99c7-4c77-9fca-62a56d637bde; notion_cookie_consent={%22id%22:%22fa11b3c4-bf1d-4fbb-a340-add7a1b3bdcc%22%2C%22permission%22:{%22necessary%22:true%2C%22targeting%22:true%2C%22preference%22:true%2C%22performance%22:true}%2C%22policy_version%22:%22v5%22}; notion_browser_id=7bab4829-2a87-4ed5-b50c-c1be8b79ae96; notion_users=[%22be4ed882-99c7-4c77-9fca-62a56d637bde%22]; ajs_anonymous_id=7bab48292a874ed5b50cc1be8b79ae96; notion_check_cookie_consent=true; __cf_bm=DZSsccjteEwkPyogUH01riHMchUah2JTZwP2eWBW2mQ-1666958781-0-AT60ByWK9KR6KmqMzVJlNsLsAJahyIFPLxg5MYaLxptSo0ttw/eyOItXh8GFtEaR6Vdfb8oyOdPQ5SwjXvteKrQ=; notion_locale=en-US/autodetect; amp_af43d4=7bab48292a874ed5b50cc1be8b79ae96.YmU0ZWQ4ODI5OWM3NGM3NzlmY2E2MmE1NmQ2MzdiZGU=..1ggf7io0a.1ggf7qtko.1mu.cf.23d; intercom-session-gpfdrxfd=amZyd3p6R0hwSnZBQ3JuZkFkbW9oME0wK3pxdU1MY1V2azVKZkF5S1pSNkdpNWdCcE1UdUc4MWZlenREN0IyTy0tTlp3SCtwTHdVMDhmUjNTUlh4bzVjdz09--7b1435e503bf5f1405ae87cab88d6bdf9c8c8cbf',
      },
      referrerPolicy: "strict-origin-when-cross-origin",
    }
  );
  const idBlock = response.data.createdBlockIds[0];
  return idBlock;
};
export default clipYoutubeToNotionService;
