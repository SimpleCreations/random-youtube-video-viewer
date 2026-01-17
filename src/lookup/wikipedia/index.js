import sample from "lodash.sample";

import { getWikipediaSearchQuery } from "./search-query";

export async function lookupWikipediaVideos(youtubeApi) {
  const searchQuery = await getWikipediaSearchQuery();

  const searchResults = await youtubeApi.getSearchResults(searchQuery, {
    order: "date",
    maxResults: 10,
  });
  if (!searchResults.length) return [];

  return { videos: [sample(searchResults)], searchQuery };
}
