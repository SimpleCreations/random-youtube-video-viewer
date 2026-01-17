import { EventEmitter } from "events";

import YoutubeApi from "./YoutubeApi";
import { lookupVideos } from "./lookup";

export default class Loader extends EventEmitter {
  #player;
  #youtubeApi = new YoutubeApi();
  #lookupAlgorithm;
  #foundVideosQueue = [];

  constructor(player) {
    super();
    this.#player = player;
  }

  setYoutubeApiKeys(apiKeys) {
    this.#youtubeApi.setApiKeys(apiKeys);
  }

  setLookupAlgorithm(lookupAlgorithm) {
    this.#lookupAlgorithm = lookupAlgorithm;
  }

  async loadNextVideo() {
    const videoId = await this.#getVideoId();
    const aspectRatio = await this.#youtubeApi.getVideoAspectRatio(videoId);
    const link = "https://www.youtube.com/watch?v=" + videoId;
    this.#player.play(link);
    this.emit("videoReady", { link });

    if (aspectRatio) {
      this.#player.setVideoAspectRatio(aspectRatio);
      this.#player.setVideoFrameSize();
    } else {
      this.#player.setVideoAspectRatio(undefined);
      this.#player.resetVideoFrameSize();
    }
  }

  async #getVideoId() {
    if (!this.#foundVideosQueue.length) await this.#lookupMoreVideos();

    const { video, searchQuery } = this.#foundVideosQueue.shift();
    this.emit("infoReady", { video, searchQuery });

    return video.videoId;
  }

  async #lookupMoreVideos() {
    const { videos, searchQuery } = await lookupVideos(
      this.#youtubeApi,
      this.#lookupAlgorithm
    );
    if (!videos.length) return await this.#getVideoId();

    this.#foundVideosQueue.push(
      ...videos.map((video) => ({ video, searchQuery }))
    );
  }
}
