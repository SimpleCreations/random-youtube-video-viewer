import sampleSize from "lodash/sampleSize";

import { getZeroViewYoutubeSearchQuery } from "./search-query";

const WORDS_REGEX = /[\p{L}\p{N}]+/gu;

function splitIntoWords(value) {
  return value.match(WORDS_REGEX).map((word) => word.toLowerCase());
}

export async function lookupZeroViewYoutubeVideos(youtubeApi) {
  const searchQuery = getZeroViewYoutubeSearchQuery();
  const searchQueryWords = splitIntoWords(searchQuery);

  const searchResults = await youtubeApi.getSearchResults(searchQuery, {
    maxResults: 20,
  });
  const filteredSearchResults = searchResults.filter(({ title }) => {
    const titleWords = splitIntoWords(title);
    if (!searchQueryWords.every((word) => titleWords.includes(word))) {
      console.log(
        `Title "${title}" is missing words from the search query: "${searchQuery}"`
      );
    }
    return searchQueryWords.every((word) => titleWords.includes(word));
  });

  return { videos: sampleSize(filteredSearchResults, 1), searchQuery };
}
