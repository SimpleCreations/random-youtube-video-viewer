import sample from "lodash/sample";
import countBy from "lodash/countBy";
import sampleWeighted from "weighted";

import { WIKIPEDIAS_ENTRIES, WIKIPEDIAS_WEIGHTS } from "./wikipedias";
import { MOST_FREQUENT_WORDS_BY_SCRIPT } from "./freq-dictionary";
import { getScriptCode, getWordSegmenter } from "./intl";

const EDIT_BUTTONS_REGEX = /\[.+ \| .+]/g;
const SHORT_LATIN_WORD_REGEX = /^\p{Script=Latin}{0,2}$/u;

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

export async function getWikipediaSearchQuery() {
  const [languageCode, { words: numberOfWordsToSelect }] = sampleWeighted(
    WIKIPEDIAS_ENTRIES,
    WIKIPEDIAS_WEIGHTS
  );

  const queryData = await queryWikipediaApi(languageCode, {
    action: "query",
    generator: "random",
    grnnamespace: 0,
    prop: "revisions",
    grnlimit: 1,
  });
  const pageId = +Object.keys(queryData["query"]["pages"])[0];

  const parseData = await queryWikipediaApi(languageCode, {
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
    el.remove();
  }

  const text = dummy.textContent.replace(EDIT_BUTTONS_REGEX, "");
  const words = [...getWordSegmenter(languageCode).segment(text)]
    .filter(({ isWordLike }) => isWordLike)
    .map(({ segment }) => segment.toLocaleLowerCase(languageCode));
  if (!words.length) return await getWikipediaSearchQuery();

  let selectedWordIndex;
  const scriptCode = getScriptCode(languageCode);
  const frequentWords = MOST_FREQUENT_WORDS_BY_SCRIPT[scriptCode];
  if (frequentWords) {
    const wordsEntries = Array.from(words.entries());
    let filteredWordsEntries = wordsEntries.filter(([, word]) => {
      if (scriptCode === "Latn" && SHORT_LATIN_WORD_REGEX.test(word))
        return false;
      return !frequentWords.has(word);
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

  return words
    .slice(
      Math.max(selectedWordIndex - (numberOfWordsToSelect - 1), 0),
      selectedWordIndex + numberOfWordsToSelect
    )
    .slice(-numberOfWordsToSelect)
    .join(" ");
}

function wordFrequencyToWeight(freq) {
  return freq ** 2;
}
