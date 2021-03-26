import sum from "lodash.sum";

export function getTranslateLink(text) {
  return (
    "https://translate.google.com/?" +
    new URLSearchParams({
      op: "translate",
      sl: "auto",
      tl: "en",
      text: text
    })
  );
}

export function getSampleWeighted(array, getWeight) {
  const weights = array.map(getWeight);
  const weightsSum = sum(weights);
  const alignedWeights = weights.map((weight) => weight / weightsSum);
  const probabilities = alignedWeights.reduce(
    (accumulator, value) => [
      ...accumulator,
      (accumulator[accumulator.length - 1] ?? 0) + value
    ],
    []
  );
  const random = Math.random();
  return array[probabilities.findIndex((probability) => random < probability)];
}
