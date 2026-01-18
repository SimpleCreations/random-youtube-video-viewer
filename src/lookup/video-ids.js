import sample from "lodash/sample";
import shuffle from "lodash/shuffle";

const PREFIX_CHARACTERS = "abcdefghijklmnopqrstuvwxyz0123456789_".split("");
const PREFIX_START_CHARACTERS = PREFIX_CHARACTERS.filter((c) => c !== "_");
const PREFIX_LENGTH = 5;
const PREFIXES_PER_SEARCH = 3;

export async function lookupVideoIdsVideos(youtubeApi) {
  const prefixes = Array.from({ length: PREFIXES_PER_SEARCH }, () =>
    Array.from({ length: PREFIX_LENGTH }, (_, i) =>
      sample(i === 0 ? PREFIX_START_CHARACTERS : PREFIX_CHARACTERS)
    ).join("")
  );
  const searchQuery = prefixes
    .map((prefix) => `"watch?v=${prefix}"`)
    .join(" OR ");

  const searchResults = await youtubeApi.getSearchResults(searchQuery, {
    maxResults: 10,
  });
  const filteredSearchResults = searchResults.filter(({ videoId }) =>
    prefixes.some((prefix) => videoId.toLowerCase().startsWith(prefix))
  );
  return { videos: shuffle(filteredSearchResults) };
}
