import memoize from "lodash/memoize";

export const getWordSegmenter = memoize((languageCode) => {
  return new Intl.Segmenter(languageCode, { granularity: "word" });
});

export const getScriptCode = memoize((languageCode) => {
  return new Intl.Locale(languageCode).maximize().script;
});
