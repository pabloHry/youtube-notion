import axios from "axios";
import fs from "fs";
import path from "path";

const transcriptYoutube = async (url, start, end) => {
  const responseHtml = await axios.get(url);
  /* It's using cheerio to parse the html and get the title of the video. */
  const paramsVideo = responseHtml.data
    .split("serializedShareEntity")[1]
    .split("}")[0]
    .split('"')[2];

  const response = await axios.post(
    "https://www.youtube.com/youtubei/v1/get_transcript?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8&prettyPrint=false",
    {
      context: {
        client: {
          clientName: "WEB",
          clientVersion: "2.20221017.00.00",
        },
      },
      params: paramsVideo,
    }
  );

  const resultResponseTranscript =
    response.data.actions[0].updateEngagementPanelAction.content
      .transcriptRenderer.body.transcriptBodyRenderer.cueGroups;

  let memory = [];

  for (let index = 0; index < resultResponseTranscript.length; index++) {
    const element =
      resultResponseTranscript[index].transcriptCueGroupRenderer.cues[0]
        .transcriptCueRenderer;
    const transcriptText = element.cue.simpleText;
    const transcriptOffset = Math.floor(parseInt(element.startOffsetMs) / 1000);
    memory.push({
      text: transcriptText,
      offset: transcriptOffset,
    });
  }

  const result = memory.filter(
    (item) => item.offset >= start && item.offset <= end
  );

  const memoryTranscript = [];

  for (let index = 0; index < result.length; index++) {
    const element = result[index];
    const text = element.text + " ";
    const filtered = text.replace(/\s*[\[{(].*?[)}\]]\s*/g, "");
    memoryTranscript.push(filtered);
  }

  return memoryTranscript;
};

export default transcriptYoutube;
