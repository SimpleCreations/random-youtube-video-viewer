import { EventEmitter } from "events";
import sample from "lodash.sample";

import YoutubeApi from "./YoutubeApi";
import getSearchQuery from "./search-query/getSearchQuery";

export default class Loader extends EventEmitter {
  #player;
  #youtubeApi;
  #searchQueryGenerationAlgorithm;

  constructor(player) {
    super();
    this.#player = player;
    this.#youtubeApi = new YoutubeApi();
  }

  setYoutubeApiKeys(apiKeys) {
    this.#youtubeApi.setApiKeys(apiKeys);
  }

  setSearchQueryGenerationAlgorithm(searchQueryGenerationAlgorithm) {
    this.#searchQueryGenerationAlgorithm = searchQueryGenerationAlgorithm;
  }

  async loadNextVideo() {
    const videoId = await this.#getVideoId();
    const link = "https://www.youtube.com/watch?v=" + videoId;
    this.#player.play(link);
    this.emit("videoReady", { link });

    this.#player.setVideoAspectRatio(undefined);
    this.#player.resetVideoFrameSize();
    this.#updatePlayerVideoFrameSize(videoId);
  }

  async #getVideoId() {
    const searchQuery = await getSearchQuery(
      this.#searchQueryGenerationAlgorithm
    );
    const searchResults = await this.#youtubeApi.getSearchResults(searchQuery);
    if (!searchResults.length) return await this.#getVideoId();

    const video = sample(searchResults);
    this.emit("infoReady", { video, searchQuery });

    return video.videoId;
  }

  async #updatePlayerVideoFrameSize(videoId) {
    const aspectRatio = await this.#youtubeApi.getVideoAspectRatio(videoId);
    if (aspectRatio) {
      this.#player.setVideoAspectRatio(aspectRatio);
      this.#player.setVideoFrameSize();
    }
  }
}
