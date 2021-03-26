import getNumbersSearchQuery from "./getNumbersSearchQuery";
import getWikipediaWordsSearchQuery from "./getWikipediaWordsSearchQuery";

export default async function getSearchQuery(algorithm) {
  switch (algorithm) {
    case "NUMBERS":
      return getNumbersSearchQuery();
    case "WIKIPEDIA_WORDS":
      return await getWikipediaWordsSearchQuery();
    default:
      throw new Error("Unreachable code");
  }
}
