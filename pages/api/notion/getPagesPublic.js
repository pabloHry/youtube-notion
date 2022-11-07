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
    "https://www.notion.so/api/v3/search",
    {
      type: "BlocksInSpace",
      query: "",
      spaceId,
      limit: 100,
      filters: {
        isDeletedOnly: false,
        excludeTemplates: false,
        isNavigableOnly: false,
        navigableBlockContentOnly: true,
        requireEditPermissions: false,
        includePublicPagesWithoutExplicitAccess: false,
        ancestors: [],
        createdBy: [],
        editedBy: [],
        lastEditedTime: {},
        createdTime: {},
        inTeams: [],
      },
      sort: { field: "relevance" },
      source: "quick_find_input_change",
      searchExperimentOverrides: {},
      searchSessionFlowNumber: 1,
      recentPagesForBoosting: [],
    },
    {
      headers: {
        cookie: `notion_check_cookie_consent=${notion_check_cookie_consent}; __cf_bm=${__cf_bm}; notion_experiment_device_id=${notion_experiment_device_id}; NEXT_LOCALE=${NEXT_LOCALE}; notion_locale=${notion_locale}; g_state=${g_state}; token_v2=${token_v2}; notion_user_id=${notion_user_id}; notion_users=${notion_users}; notion_cookie_consent=${notion_cookie_consent}; notion_browser_id=${notion_browser_id}`,
      },
    }
  );

  const pagesPublic = [];

  for (const [key, value] of Object.entries(
    response.data.recordMap.collection
  )) {
    if (value.value.icon)
      pagesPublic.push({
        id: key,
        title: value.value?.name[0][0],
        icon: value.value.icon,
      });
  }
  res.status(200).json(pagesPublic);
}
