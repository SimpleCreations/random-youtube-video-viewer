import sampleSize from "lodash/sampleSize";

import { getWikipediaSearchQuery } from "./search-query";

export async function lookupWikipediaVideos(youtubeApi) {
  const searchQuery = await getWikipediaSearchQuery();

  const searchResults = await youtubeApi.getSearchResults(searchQuery, {
    order: "date",
    maxResults: 10,
  });

  return { videos: sampleSize(searchResults, 1), searchQuery };
}
