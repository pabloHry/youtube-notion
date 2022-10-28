import clipYoutubeToNotionService from "../../../service/clipYoutubeToNotionService";
import submitTranscriptToNotion from "../../../service/transcriptToNotionService";

// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req, res, next) {
  const { urlLinkYoutube, title } = req.query;
  try {
    const idBlock = await clipYoutubeToNotionService(urlLinkYoutube, title);
    await submitTranscriptToNotion(idBlock);
    res.status(200).json({ message: "success" });
  } catch (err) {
    res.send({ message: err });
  }
}
