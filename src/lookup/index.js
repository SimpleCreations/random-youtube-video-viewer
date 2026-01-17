import { lookupVideoIdsVideos } from "./video-ids";
import { lookupWikipediaVideos } from "./wikipedia";

export async function lookupVideos(youtubeApi, algorithm) {
  switch (algorithm) {
    case "VIDEO_IDS":
      return await lookupVideoIdsVideos(youtubeApi);
    case "WIKIPEDIA":
      return await lookupWikipediaVideos(youtubeApi);
    case "ZERO_VIEW_YOUTUBE":
      throw new Error("Unreachable code");
    default:
      throw new Error("Unreachable code");
  }
}
