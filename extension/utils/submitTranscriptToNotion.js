import axios from 'axios';

import { v4 as uuidv4 } from 'uuid';
const submitTranscriptToNotion = async () => {
  const salope = uuidv4();
  axios.post(
    'https://www.notion.so/api/v3/submitTransaction',
    {
      requestId: uuidv4(),
      referrerPolicy: 'strict-origin-when-cross-origin',
      transactions: [
        {
          id: uuidv4(),
          operations: [
            {
              id: salope,
              table: 'block',
              path: [],
              command: 'update',
              args: {
                type: 'text',
                id: salope,
                parent_id: '63cfa214-2679-4a9f-a1a5-66974dc26a98',
                parent_table: 'block',
                alive: true,
                version: 1,
                created_time: 1666643126188,
                last_edited_time: 1666643126188,
                properties: {
                  title: [
                    [
                      "parce que c'est le premier terme hawaïen qu'il apprit lorsqu'il dut prendre un bus à la sortie de l'aéroport5, et qu'au moment de créer son site, il voulait un terme amusant pour dire rapide. Dans l'URL du site apparaissait uniquement le terme « wiki », ce qui a probablement poussé les visiteurs à l'appeler ainsi6. Pour l'OQLF le terme « wiki » est un nom commun q",
                    ],
                  ],
                },
              },
            },
            {
              table: 'block',
              id: '63cfa214-2679-4a9f-a1a5-66974dc26a98',
              path: ['content'],
              command: 'listAfter',
              args: {
                after: uuidv4(),
                id: salope,
              },
            },
          ],
        },
      ],
    },
    {
      headers: {
        accept: '*/*',
        'accept-language': 'en-US,en;q=0.9',
        'cache-control': 'no-cache',
        'content-type': 'application/json',
        pragma: 'no-cache',
        'sec-ch-ua':
          '"Chromium";v="106", "Google Chrome";v="106", "Not;A=Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'none',
        cookie:
          'notion_experiment_device_id=506e2107-abc8-44bc-b403-d270bae22ea1; NEXT_LOCALE=en-US; notion_browser_id=e89ec2d8-2511-4aec-bef3-80f35f7cc620; mutiny.user.token=75f8dcaa-8b4b-4bb7-afa8-54446ecf9c01; mutiny.defaultOptOut=true; mutiny.optOut=; mutiny.optIn=true; _gcl_au=1.1.1458521584.1666214492; ajs_anonymous_id=e89ec2d825114aecbef380f35f7cc620; _gcl_aw=GCL.1666214493.EAIaIQobChMI_a_J05zt-gIVOxkGAB1f-QG6EAAYASAAEgLJ6PD_BwE; _ga=GA1.1.1374727460.1666214493; _mkto_trk=id:414-XMY-838&token:_mch-www.notion.so-1666214493572-64646; intercom-id-gpfdrxfd=48e6647e-2cfb-4fd1-88a0-20d76fc29d80; cb_user_id=null; cb_group_id=null; cb_anonymous_id=%22a171f7d8-fac9-4765-ad88-2122fc03fc88%22; token_v2=f76981394fab373485922dde60a7175e2e8327e177c33453aa60c0eb447ddbd12db3befe4fe40bcb1a7e8b474837a2eed39f9657f1556fd0856022c74b8b12fafe1445f89dbe5b12d9cc32689dd8; notion_user_id=be4ed882-99c7-4c77-9fca-62a56d637bde; notion_cookie_consent={%22id%22:%22fa11b3c4-bf1d-4fbb-a340-add7a1b3bdcc%22%2C%22permission%22:{%22necessary%22:true%2C%22targeting%22:true%2C%22preference%22:true%2C%22performance%22:true}%2C%22policy_version%22:%22v5%22}; notion_users=[%22be4ed882-99c7-4c77-9fca-62a56d637bde%22]; _ga_9ZJ8CB186L=GS1.1.1666214493.1.1.1666215197.50.0.0; notion_check_cookie_consent=true; notion_locale=en-US/autodetect; amp_af43d4=e89ec2d825114aecbef380f35f7cc620.YmU0ZWQ4ODI5OWM3NGM3NzlmY2E2MmE1NmQ2MzdiZGU=..1gg4vjuqq.1gg4vk10b.1l.10.2l; intercom-session-gpfdrxfd=djZKUDlLNHg5OHZyRG9BbXl6NGszdGZYcTA5UW1XaitNbU8ya0JSWTA5RndEVUd4S2ZhZFgxd2dld1VpcVArQy0tcUFwMFBOV1FvbUVhdElXMUpQcWQrQT09--43e8bdb4b8ebea022eaea7298ac2e5648a3f3602; __cf_bm=2HHWls.6EfPRaPxvaeliBNTmWhhY3mJ41TWD7PN5SaE-1666617098-0-AalaGAudRa5rVOPoin5YPqYZknQ1Iftsx7Tm2xZCGrJH3j3lyUmD0NViLRTO5q89GN/ZOTcXsnsyWue/CZiaSmU=',
      },
    }
  );
};
export default submitTranscriptToNotion;
