import { EventEmitter } from "events";
import sample from "lodash.sample";
import { decodeHTML } from "entities";

import getSearchQuery from "./search-query/getSearchQuery";

export default class Loader extends EventEmitter {
  #player;
  #apiKeys;
  #searchQueryGenerationAlgorithm;

  constructor(player) {
    super();
    this.#player = player;
  }

  setApiKeys(apiKeys) {
    this.#apiKeys = apiKeys;
  }

  areApiKeysPresent() {
    return !!this.#apiKeys && this.#apiKeys.length > 0;
  }

  setSearchQueryGenerationAlgorithm(searchQueryGenerationAlgorithm) {
    this.#searchQueryGenerationAlgorithm = searchQueryGenerationAlgorithm;
  }

  async queryApi(method, params) {
    if (!this.areApiKeysPresent()) throw new MissingApiKeysError();

    const apiKey = sample(this.#apiKeys);
    const response = await fetch(
      new URL(
        method +
          "?" +
          new URLSearchParams({
            ...params,
            key: apiKey,
            alt: "json"
          }),
        "https://youtube.googleapis.com/youtube/v3/"
      ).href
    );
    const data = await response.json();

    if (!response.ok) {
      if (
        data["error"]?.["errors"]?.[0]?.["reason"] === "quotaExceeded" &&
        this.#apiKeys.length > 1
      ) {
        this.#apiKeys = this.#apiKeys.filter((key) => key !== apiKey);
        return await this.queryApi(method, params);
      }
      throw new Error("YouTube API request failed");
    }

    return data;
  }

  async getVideoId() {
    const searchQuery = await getSearchQuery(
      this.#searchQueryGenerationAlgorithm
    );
    const data = await this.queryApi("search", {
      q: searchQuery,
      part: "snippet",
      type: "video",
      order: "date",
      videoDimension: "2d",
      videoEmbeddable: true,
      maxResults: 10
    });
    const items = data["items"];
    if (!items.length) return await this.getVideoId();

    const item = sample(items);
    const videoId = item["id"]["videoId"];
    const title = decodeHTML(item["snippet"]["title"]);
    this.emit("infoReady", { title, searchQuery });

    return videoId;
  }

  async loadNextVideo() {
    const videoId = await this.getVideoId();
    const link = "https://www.youtube.com/watch?v=" + videoId;
    this.#player.play(link);
    this.emit("videoReady", { link });

    this.#player.setVideoAspectRatio(undefined);
    this.#player.resetVideoFrameSize();
    this.fetchVideoDimensions(videoId);
  }

  async fetchVideoDimensions(videoId) {
    const data = await this.queryApi("videos", {
      id: videoId,
      part: "player",
      maxHeight: 720
    });
    const playerData = data["items"][0]["player"];
    if (playerData["embedWidth"] && playerData["embedHeight"]) {
      this.#player.setVideoAspectRatio(
        +playerData["embedWidth"] / +playerData["embedHeight"]
      );
      this.#player.setVideoFrameSize();
    }
  }
}

export class MissingApiKeysError extends Error {
  constructor() {
    super("Missing API keys");
  }
}
