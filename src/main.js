import store from "store";

import { getTranslateLink } from "./utils";
import Player from "./Player";
import Loader from "./Loader";
import { YoutubeMissingApiKeysError } from "./YoutubeApi";

const playerElement = document.querySelector("#player");
const settingsElement = document.querySelector("#settings");
const lookupAlgorithmSelectElement =
  document.querySelector("#lookup-algorithm");
const apiKeysFieldElement = document.querySelector("#api-keys");
const nextButtonElement = document.querySelector("#next");
const openOnYoutubeLinkElement = document.querySelector("#open-on-youtube");
const spoilersElement = document.querySelector("#spoilers");
const titleElement = document.querySelector("#title");
const titleTranslateLinkElement = document.querySelector("#translate-title");
const searchQueryElement = document.querySelector("#search-query");
const searchQueryTranslateLinkElement = document.querySelector(
  "#translate-search-query"
);
const apiKeysMissingElement = document.querySelector("#api-keys-missing");

// Initialize Player and Loader
const player = new Player(playerElement);
const loader = new Loader(player);

// Handle video info
loader.on("infoReady", ({ video, searchQuery }) => {
  if (searchQuery) {
    searchQueryElement.textContent = searchQuery;
    searchQueryTranslateLinkElement.href = getTranslateLink(searchQuery);
    spoilersElement.classList.remove("search-query-hidden");
  } else {
    spoilersElement.classList.add("search-query-hidden");
  }
  titleElement.textContent = video.title;
  titleTranslateLinkElement.href = getTranslateLink(video.title);
});

// Handle video link
loader.on("videoReady", ({ link }) => {
  openOnYoutubeLinkElement.href = link;
});

// Collapse <details> on outside click
document.addEventListener("click", ({ target }) => {
  if (
    settingsElement.open &&
    settingsElement !== target &&
    !settingsElement.contains(target)
  ) {
    settingsElement.open = false;
  }
  if (
    spoilersElement.open &&
    spoilersElement !== target &&
    !spoilersElement.contains(target)
  ) {
    spoilersElement.open = false;
  }
});

// Handle API keys update
const apiKeys = store.get("apiKeys", []);
loader.setYoutubeApiKeys(apiKeys);
apiKeysFieldElement.value = apiKeys.join("\n");
apiKeysMissingElement.hidden = apiKeys.length > 0;
apiKeysFieldElement.addEventListener("change", () => {
  const apiKeys = apiKeysFieldElement.value
    .trim()
    .split("\n")
    .map((key) => key.trim())
    .filter((key) => key.length > 0);
  loader.setYoutubeApiKeys(apiKeys);
  store.set("apiKeys", apiKeys);
  apiKeysMissingElement.hidden = apiKeys.length > 0;
});

// Handle search query generation algorithm update
const supportedLookupAlgorithms = [...lookupAlgorithmSelectElement.options].map(
  (option) => option.value
);
let lookupAlgorithm = store.get("lookupAlgorithm");
if (!supportedLookupAlgorithms.includes(lookupAlgorithm)) {
  lookupAlgorithm = "VIDEO_IDS";
}
loader.setLookupAlgorithm(lookupAlgorithm);
lookupAlgorithmSelectElement.value = lookupAlgorithm;
lookupAlgorithmSelectElement.addEventListener("change", () => {
  const value = lookupAlgorithmSelectElement.value;
  loader.setLookupAlgorithm(value);
  store.set("lookupAlgorithm", value);
});

// Handle next video button click
nextButtonElement.addEventListener("click", async () => {
  nextButtonElement.disabled = true;
  openOnYoutubeLinkElement.hidden = true;
  spoilersElement.hidden = true;
  try {
    await loader.loadNextVideo();
    if (!player.isLoaded()) {
      player.load();
      nextButtonElement.textContent = "Next video";
    }
    openOnYoutubeLinkElement.hidden = false;
    spoilersElement.hidden = false;
  } catch (error) {
    if (error instanceof YoutubeMissingApiKeysError) return;
    throw error;
  } finally {
    nextButtonElement.disabled = false;
  }
});

// Handle window resize
window.addEventListener("resize", () => {
  if (player.isLoaded()) player.setSize();
});
