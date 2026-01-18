import { EventEmitter } from "events";

import YoutubeApi from "./YoutubeApi";
import { lookupVideos } from "./lookup";

export default class Loader extends EventEmitter {
  #youtubeApi = new YoutubeApi();
  #lookupAlgorithm;
  #foundVideosQueue = [];

  setYoutubeApiKeys(apiKeys) {
    this.#youtubeApi.setApiKeys(apiKeys);
  }

  setLookupAlgorithm(lookupAlgorithm) {
    if (lookupAlgorithm !== this.#lookupAlgorithm) {
      this.#foundVideosQueue.length = 0;
    }
    this.#lookupAlgorithm = lookupAlgorithm;
  }

  async getNextVideo() {
    const videoId = await this.#getVideoId();
    const link = "https://www.youtube.com/watch?v=" + videoId;
    this.emit("videoLinkReady", { link });

    const aspectRatio = await this.#youtubeApi.getVideoAspectRatio(videoId);

    return { link, aspectRatio };
  }

  async #getVideoId() {
    if (!this.#foundVideosQueue.length) await this.#lookupMoreVideos();

    const { video, searchQuery } = this.#foundVideosQueue.shift();
    this.emit("videoInfoReady", { video, searchQuery });

    return video.videoId;
  }

  async #lookupMoreVideos() {
    const { videos, searchQuery } = await lookupVideos(
      this.#youtubeApi,
      this.#lookupAlgorithm
    );
    if (!videos.length) {
      await this.#lookupMoreVideos();
      return;
    }

    this.#foundVideosQueue.push(
      ...videos.map((video) => ({ video, searchQuery }))
    );
  }
}
