import store from "store";

import { getTranslateLink } from "./util";
import Player from "./Player";
import Loader, { MissingApiKeysError } from "./Loader";

const playerContainerElement = document.querySelector("#player-container");
const playerElement = document.querySelector("#player");
const settingsElement = document.querySelector("#settings");
const queryGenerationAlgorithmSelectElement = document.querySelector(
  "#query-generation-algorithm"
);
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
loader.on("infoReady", ({ title, searchQuery }) => {
  searchQueryElement.textContent = searchQuery;
  searchQueryTranslateLinkElement.href = getTranslateLink(searchQuery);
  titleElement.textContent = title;
  titleTranslateLinkElement.href = getTranslateLink(title);
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
loader.setApiKeys(apiKeys);
apiKeysFieldElement.value = apiKeys.join("\n");
apiKeysMissingElement.hidden = apiKeys.length > 0;
apiKeysFieldElement.addEventListener("change", () => {
  const apiKeys = apiKeysFieldElement.value
    .trim()
    .split("\n")
    .map((key) => key.trim())
    .filter((key) => key.length > 0);
  loader.setApiKeys(apiKeys);
  store.set("apiKeys", apiKeys);
  apiKeysMissingElement.hidden = apiKeys.length > 0;
});

// Handle search query generation algorithm update
const queryGenerationAlgorithm = store.get(
  "queryGenerationAlgorithm",
  "NUMBERS"
);
loader.setSearchQueryGenerationAlgorithm(queryGenerationAlgorithm);
queryGenerationAlgorithmSelectElement.value = queryGenerationAlgorithm;
queryGenerationAlgorithmSelectElement.addEventListener("change", () => {
  const value = queryGenerationAlgorithmSelectElement.value;
  loader.setSearchQueryGenerationAlgorithm(value);
  store.set("queryGenerationAlgorithm", value);
});

// Handle next video button click
nextButtonElement.addEventListener("click", async () => {
  nextButtonElement.disabled = true;
  openOnYoutubeLinkElement.hidden = true;
  spoilersElement.hidden = true;
  try {
    if (!player.isLoaded()) {
      await loader.loadNextVideo();
      player.load();
      nextButtonElement.textContent = "Next video";
    } else {
      await loader.loadNextVideo();
    }
    openOnYoutubeLinkElement.hidden = false;
    spoilersElement.hidden = false;
  } catch (error) {
    if (error instanceof MissingApiKeysError) return;
    throw error;
  } finally {
    nextButtonElement.disabled = false;
  }
});

// Handle window resize
window.addEventListener("resize", () => {
  if (player.isLoaded()) player.setSize();
});
