import sample from "lodash/sample";
import countBy from "lodash/countBy";
import sampleWeighted from "weighted";

import { WIKIPEDIAS_ENTRIES, WIKIPEDIAS_WEIGHTS } from "./wikipedias";
import { MOST_FREQUENT_WORDS_BY_SCRIPT } from "./freq-dictionary";

async function queryWikipediaApi(languageCode, params) {
  const response = await fetch(
    `https://${languageCode}.wikipedia.org/w/api.php?` +
      new URLSearchParams({
        ...params,
        origin: "*",
        format: "json",
      })
  );
  if (!response.ok) throw new Error("Failed to query Wikipedia API");
  return await response.json();
}

const WORD_REGEX = /[\p{L}\p{M}]+/gu;
const SHORT_LATIN_WORD_REGEX = /^\p{Script=Latin}{0,2}$/u;

export async function getWikipediaSearchQuery() {
  const [code, { script, words: numberOfWordsToSelect }] = sampleWeighted(
    WIKIPEDIAS_ENTRIES,
    WIKIPEDIAS_WEIGHTS
  );

  const queryData = await queryWikipediaApi(code, {
    action: "query",
    generator: "random",
    grnnamespace: 0,
    prop: "revisions",
    grnlimit: 1,
  });
  const pageId = +Object.keys(queryData["query"]["pages"])[0];

  const parseData = await queryWikipediaApi(code, {
    action: "parse",
    pageid: pageId,
    prop: "text",
  });
  const html = parseData["parse"]["text"]["*"];

  const dummy = document.createElement("div");
  dummy.innerHTML = html;
  const toRemove = dummy.querySelectorAll(
    "sup, sub, h1, h2, h3, h4, h5, h6, ol, ul, table, style, .noprint, .nomobile, .plainlinks, .toc, .thumb, .infobox, .reflist, .purl, .navbox, .hatnote"
  );
  for (const el of toRemove) {
    el.parentElement?.removeChild(el);
  }

  const text = dummy.textContent;
  const words = text.match(WORD_REGEX);
  if (words == null) return await getWikipediaSearchQuery();

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
    const freqWords = Object.keys(freqDict);
    const freqs = Object.values(freqDict);
    const minFreq = wordFrequencyToWeight(Math.min(...freqs));
    const maxFreq = wordFrequencyToWeight(Math.max(...freqs));
    const weights = freqs.map(
      (freq) => maxFreq - wordFrequencyToWeight(freq) + minFreq
    );
    const selectedWord = sampleWeighted(freqWords, weights);
    selectedWordIndex = words.indexOf(selectedWord);
  }

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
