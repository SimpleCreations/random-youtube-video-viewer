import "mediaelement/build/renderers/youtube";
import "mediaelement/full";
import "mediaelement/build/mediaelementplayer.css";
import sample from "lodash.sample";
import { decodeHTML } from "entities";
import store from "store";

import "./styles.css";
import { YOUTUBE_API_BASE } from "./config";
import { getTranslateLink } from "./util";
import getNumbersSearchQuery from "./getNumbersSearchQuery";
import getWikipediaWordsSearchQuery from "./getWikipediaWordsSearchQuery";

const playerContainerDiv = document.querySelector("#player-container");
const playerDiv = document.querySelector("#player");
const videoSource = document.querySelector("#video source");
const settings = document.querySelector("#settings");
const queryGenerationAlgorithmSelect = document.querySelector(
  "#query-generation-algorithm"
);
const apiKeysField = document.querySelector("#api-keys");
const nextButton = document.querySelector("#next");
const openOnYoutubeLink = document.querySelector("#open-on-youtube");
const spoilers = document.querySelector("#spoilers");
const titleSpoiler = document.querySelector("#title");
const titleTranslateLink = document.querySelector("#translate-title");
const searchQuerySpoiler = document.querySelector("#search-query");
const searchQueryTranslateLink = document.querySelector(
  "#translate-search-query"
);
const apiKeysMissingDiv = document.querySelector("#api-keys-missing");

let apiKeys;

async function getSearchQuery() {
  switch (queryGenerationAlgorithmSelect.value) {
    case "NUMBERS":
      return getNumbersSearchQuery();
    case "WIKIPEDIA_WORDS":
      return await getWikipediaWordsSearchQuery();
    default:
      throw new Error("Unreachable code");
  }
}

async function queryApi(method, params) {
  const apiKey = sample(apiKeys);
  const response = await fetch(
    new URL(
      method +
        "?" +
        new URLSearchParams({
          ...params,
          key: apiKey,
          alt: "json"
        }),
      YOUTUBE_API_BASE
    ).href
  );
  const data = await response.json();
  if (!response.ok) {
    if (
      data["error"]?.["errors"]?.[0]?.["reason"] === "quotaExceeded" &&
      apiKeys.length > 1
    ) {
      apiKeys = apiKeys.filter((key) => key !== apiKey);
      return await queryApi(method, params);
    }
    throw new Error("YouTube API request failed");
  }
  return data;
}

async function getVideoId() {
  const searchQuery = await getSearchQuery();
  searchQuerySpoiler.textContent = searchQuery;
  searchQueryTranslateLink.href = getTranslateLink(searchQuery);
  const data = await queryApi("search", {
    q: searchQuery,
    part: "snippet",
    type: "video",
    order: "date",
    videoDimension: "2d",
    videoEmbeddable: true,
    maxResults: 10
  });
  const items = data["items"];
  if (!items.length) return await getVideoId();
  const item = sample(items);
  const videoId = item["id"]["videoId"];
  const title = decodeHTML(item["snippet"]["title"]);
  titleSpoiler.textContent = title;
  titleTranslateLink.href = getTranslateLink(title);
  return videoId;
}

function checkApiKeys() {
  const apiKeysPresent = apiKeys.length > 0;
  apiKeysMissingDiv.hidden = apiKeysPresent;
  return apiKeysPresent;
}

let player;
let videoAspectRatio;

async function nextVideo() {
  if (!checkApiKeys()) return;
  nextButton.disabled = true;
  openOnYoutubeLink.hidden = true;
  spoilers.hidden = true;
  spoilers.open = false;
  try {
    const videoId = await getVideoId();
    const link = "https://www.youtube.com/watch?v=" + videoId;
    if (player) {
      player.setSrc(link);
      player.setCurrentTime(0);
      player.play();
    } else {
      videoSource.src = link;
    }
    openOnYoutubeLink.href = link;
    openOnYoutubeLink.hidden = false;
    spoilers.hidden = false;
    resetVideoDimensions();
    fetchVideoDimensions(videoId);
  } finally {
    nextButton.disabled = false;
  }
}

function getVideoFrame() {
  return playerDiv.querySelector("iframe");
}

function setVideoFrameSize() {
  if (videoAspectRatio == null) return;
  const frame = getVideoFrame();
  if (!frame) return;
  const { width: playerWidth, height: playerHeight } = player;
  if (videoAspectRatio < playerWidth / playerHeight) {
    frame.style.width = playerHeight * videoAspectRatio + "px";
  } else {
    frame.style.removeProperty("width");
  }
}

function resetVideoDimensions() {
  videoAspectRatio = undefined;
  /* eslint-disable no-unused-expressions */
  getVideoFrame()?.style.removeProperty("width");
}

async function fetchVideoDimensions(videoId) {
  const data = await queryApi("videos", {
    id: videoId,
    part: "player",
    maxHeight: 720
  });
  const playerData = data["items"][0]["player"];
  if (playerData["embedWidth"] && playerData["embedHeight"]) {
    videoAspectRatio = +playerData["embedWidth"] / +playerData["embedHeight"];
    setVideoFrameSize();
  }
}

function setPlayerSize() {
  if (!player) return;
  const { offsetWidth, offsetHeight } = playerDiv;
  player.setPlayerSize(offsetWidth, offsetHeight);
  setVideoFrameSize();
}

async function loadPlayer() {
  if (!checkApiKeys()) return;
  await nextVideo();
  /* eslint-disable */
  player = new MediaElementPlayer("video", {
    renderers: ["youtube_iframe"],
    youtube: {
      modestbranding: 1,
      autohide: 1
    }
  });
  setPlayerSize();
  player.media.addEventListener("loadedmetadata", setVideoFrameSize);
}

function init() {
  document.addEventListener("click", ({ target }) => {
    if (settings.open && settings !== target && !settings.contains(target)) {
      settings.open = false;
    }
    if (spoilers.open && spoilers !== target && !spoilers.contains(target)) {
      spoilers.open = false;
    }
  });

  apiKeys = store.get("apiKeys", []);
  apiKeysField.value = apiKeys.join("\n");
  checkApiKeys();
  apiKeysField.addEventListener("change", () => {
    apiKeys = apiKeysField.value
      .trim()
      .split("\n")
      .map((key) => key.trim())
      .filter((key) => key.length > 0);
    store.set("apiKeys", apiKeys);
    checkApiKeys();
  });

  queryGenerationAlgorithmSelect.value = store.get(
    "queryGenerationAlgorithm",
    "NUMBERS"
  );
  queryGenerationAlgorithmSelect.addEventListener("change", () => {
    store.set("queryGenerationAlgorithm", queryGenerationAlgorithmSelect.value);
  });

  nextButton.addEventListener("click", async () => {
    if (!player) {
      await loadPlayer();
      nextButton.textContent = "Next video";
    } else {
      await nextVideo();
    }
  });

  // Firefox lacks support for `aspect-ratio` CSS property
  const supportsCssAspectRatio = CSS.supports("aspect-ratio", "1 / 1");
  function setPlayerContainerHeight() {
    if (!supportsCssAspectRatio) {
      const { offsetWidth } = playerContainerDiv;
      playerDiv.style.height = offsetWidth / (16 / 9) + "px";
    }
  }
  addEventListener("resize", () => {
    setPlayerContainerHeight();
    setPlayerSize();
  });
  setPlayerContainerHeight();
}

init();
