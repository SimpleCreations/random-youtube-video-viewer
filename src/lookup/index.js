import { lookupVideoIdsVideos } from "./video-ids";
import { lookupWikipediaVideos } from "./wikipedia";
import { lookupZeroViewYoutubeVideos } from "./zero-view-youtube";

export async function lookupVideos(youtubeApi, algorithm) {
  switch (algorithm) {
    case "VIDEO_IDS":
      return await lookupVideoIdsVideos(youtubeApi);
    case "WIKIPEDIA":
      return await lookupWikipediaVideos(youtubeApi);
    case "ZERO_VIEW_YOUTUBE":
      return await lookupZeroViewYoutubeVideos(youtubeApi);
    default:
      throw new Error("Unreachable code");
  }
}
