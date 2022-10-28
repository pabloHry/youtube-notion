import clipYoutubeToNotionService from "../../../service/clipYoutubeToNotionService";
import submitTranscriptToNotion from "../../../service/transcriptToNotionService";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req, res, next) {
  const { url, title } = req.query;
  const idBlock = await clipYoutubeToNotionService(url, title);
  await submitTranscriptToNotion(idBlock);
  res.status(200);
}
