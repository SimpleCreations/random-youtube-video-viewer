import sample from "lodash.sample";
import { decodeHTML } from "entities";

export default class YoutubeApi {
  #apiKeys;

  setApiKeys(apiKeys) {
    this.#apiKeys = apiKeys;
  }

  #hasApiKeys() {
    return !!this.#apiKeys && this.#apiKeys.length > 0;
  }

  async #queryApi(method, params) {
    if (!this.#hasApiKeys()) throw new YoutubeMissingApiKeysError();

    const apiKey = sample(this.#apiKeys);
    const response = await fetch(
      new URL(
        method +
          "?" +
          new URLSearchParams({
            ...params,
            key: apiKey,
            alt: "json",
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
        return await this.#queryApi(method, params);
      }
      throw new Error("YouTube API request failed");
    }

    return data;
  }

  async getSearchResults(searchQuery) {
    const data = await this.#queryApi("search", {
      q: searchQuery,
      part: "snippet",
      type: "video",
      order: "date",
      videoDimension: "2d",
      videoEmbeddable: true,
      maxResults: 10,
    });
    return data["items"].map((item) => ({
      videoId: item["id"]["videoId"],
      title: decodeHTML(item["snippet"]["title"]),
    }));
  }

  async getVideoAspectRatio(videoId) {
    const data = await this.#queryApi("videos", {
      id: videoId,
      part: "player",
      maxHeight: 720,
    });
    const playerData = data["items"][0]["player"];
    if (playerData["embedWidth"] && playerData["embedHeight"]) {
      return +playerData["embedWidth"] / +playerData["embedHeight"];
    }
    return undefined;
  }
}

export class YoutubeMissingApiKeysError extends Error {
  constructor() {
    super("Missing API keys");
  }
}
