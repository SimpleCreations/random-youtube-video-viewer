import countBy from "lodash.countby";

import { getSampleWeighted } from "./util";
import { WIKIPEDIAS, WIKIPEDIAS_ENTRIES } from "./wikipedias";

const COMMON_API_PARAMS = {
  origin: "*",
  format: "json"
};

const WORD_REGEX = /[\p{L}\p{M}]+/gu;

export default async function getWikipediaWordsSearchQuery() {
  const [code] = getSampleWeighted(
    WIKIPEDIAS_ENTRIES,
    ([, { weight }]) => weight
  );
  const apiEndpoint = `https://${code}.wikipedia.org/w/api.php?`;

  const queryResponse = await fetch(
    apiEndpoint +
      new URLSearchParams({
        ...COMMON_API_PARAMS,
        action: "query",
        generator: "random",
        grnnamespace: 0,
        prop: "revisions",
        grnlimit: 1
      })
  );
  if (!queryResponse.ok) throw new Error("Failed to fetch random page ID");
  const queryData = await queryResponse.json();
  const pageId = +Object.keys(queryData["query"]["pages"])[0];

  const parseResponse = await fetch(
    apiEndpoint +
      new URLSearchParams({
        ...COMMON_API_PARAMS,
        action: "parse",
        pageid: pageId,
        prop: "text"
      })
  );
  if (!parseResponse.ok) throw new Error("Failed to fetch parsed text");
  const parseData = await parseResponse.json();
  const html = parseData["parse"]["text"]["*"];

  const dummy = document.createElement("div");
  dummy.innerHTML = html;
  const toRemove = dummy.querySelectorAll(
    "sup, sub, h1, h2, h3, h4, h5, h6, ol, ul, table, style, .noprint, .nomobile, .plainlinks, .toc, .thumb, .infobox, .reflist, .purl, .navbox, .hatnote"
  );
  for (const el of toRemove) {
    /* eslint-disable no-unused-expressions */
    el.parentElement?.removeChild(el);
  }

  const text = dummy.textContent;
  const words = text.match(WORD_REGEX);
  if (words == null) return await getWikipediaWordsQuery();

  const freqDict = countBy(words);
  const freqs = Object.values(freqDict);
  const minFreq = wordFrequencyToWeight(Math.min(...freqs));
  const maxFreq = wordFrequencyToWeight(Math.max(...freqs));
  const weightsEntries = Object.entries(freqDict);
  for (const entry of weightsEntries) {
    entry[1] = maxFreq - wordFrequencyToWeight(entry[1]) + minFreq;
  }

  const numberOfWords = WIKIPEDIAS[code].words;
  const [selectedWord] = getSampleWeighted(
    weightsEntries,
    ([, weight]) => weight
  );
  const selectedWordIndex = words.indexOf(selectedWord);
  const selectedWords = words.slice(
    selectedWordIndex,
    selectedWordIndex + numberOfWords
  );
  const elementsLeft = numberOfWords - selectedWords.length;
  if (elementsLeft > 0) {
    selectedWords.unshift(
      ...words.slice(
        Math.max(selectedWordIndex - elementsLeft, 0),
        selectedWordIndex
      )
    );
  }

  return selectedWords.join(" ");
}

function wordFrequencyToWeight(freq) {
  return freq ** 2;
}
