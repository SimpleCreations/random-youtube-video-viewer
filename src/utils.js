export function getTranslateLink(text) {
  return (
    "https://translate.google.com/?" +
    new URLSearchParams({
      op: "translate",
      sl: "auto",
      tl: "en",
      text: text,
    })
  );
}
