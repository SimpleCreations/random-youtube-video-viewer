import sample from "lodash.sample";
import countBy from "lodash.countby";

import { getSampleWeighted } from "../util";
import { WIKIPEDIAS, WIKIPEDIAS_ENTRIES } from "./wikipedias";
import { MOST_FREQUENT_WORDS_BY_SCRIPT } from "./freqDictionary";

async function queryWikipediaApi(languageCode, params) {
  const response = await fetch(
    `https://${languageCode}.wikipedia.org/w/api.php?` +
      new URLSearchParams({
        ...params,
        origin: "*",
        format: "json"
      })
  );
  if (!response.ok) throw new Error("Failed to query Wikipedia API");
  return await response.json();
}

const WORD_REGEX = /[\p{L}\p{M}]+/gu;
const SHORT_LATIN_WORD_REGEX = /^\p{Script=Latin}{0,2}$/u;

export default async function getWikipediaWordsSearchQuery() {
  const [code, { script }] = getSampleWeighted(
    WIKIPEDIAS_ENTRIES,
    ([, { weight }]) => weight
  );

  const queryData = await queryWikipediaApi(code, {
    action: "query",
    generator: "random",
    grnnamespace: 0,
    prop: "revisions",
    grnlimit: 1
  });
  const pageId = +Object.keys(queryData["query"]["pages"])[0];

  const parseData = await queryWikipediaApi(code, {
    action: "parse",
    pageid: pageId,
    prop: "text"
  });
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
  if (words == null) return await getWikipediaWordsSearchQuery();

  let selectedWordIndex;
  const frequentWords = MOST_FREQUENT_WORDS_BY_SCRIPT[script];
  if (frequentWords) {
    const wordsEntries = Array.from(words.entries());
    let filteredWordsEntries = wordsEntries.filter(([, word]) => {
      if (script === "latin" && SHORT_LATIN_WORD_REGEX.test(word)) return false;
      return !frequentWords.has(word.toLowerCase());
    });
    if (filteredWordsEntries.length === 0) filteredWordsEntries = wordsEntries;
    [selectedWordIndex] = sample(filteredWordsEntries);
  } else {
    const freqDict = countBy(words);
    const freqs = Object.values(freqDict);
    const minFreq = wordFrequencyToWeight(Math.min(...freqs));
    const maxFreq = wordFrequencyToWeight(Math.max(...freqs));
    const weightsEntries = Object.entries(freqDict);
    for (const entry of weightsEntries) {
      entry[1] = maxFreq - wordFrequencyToWeight(entry[1]) + minFreq;
    }
    const [selectedWord] = getSampleWeighted(
      weightsEntries,
      ([, weight]) => weight
    );
    selectedWordIndex = words.indexOf(selectedWord);
  }

  const numberOfWordsToSelect = WIKIPEDIAS[code].words;
  const selectedWords = words.slice(
    selectedWordIndex,
    selectedWordIndex + numberOfWordsToSelect
  );
  const elementsLeft = numberOfWordsToSelect - selectedWords.length;
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
