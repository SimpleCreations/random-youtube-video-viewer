import "mediaelement/build/renderers/youtube";
import "mediaelement/full";
import "mediaelement/build/mediaelementplayer.css";

export default class Player {
  #player;
  #playerElement;
  #videoElement;
  #videoAspectRatio;

  constructor(playerElement) {
    this.#playerElement = playerElement;
    this.#videoElement = playerElement.querySelector("video");
  }

  setVideoAspectRatio(videoAspectRatio) {
    this.#videoAspectRatio = videoAspectRatio;
  }

  load() {
    /* eslint-disable-next-line no-undef */
    this.#player = new MediaElementPlayer(this.#videoElement, {
      renderers: ["youtube_iframe"],
      youtube: {
        modestbranding: 1,
        autohide: 1
      }
    });
    this.setSize();
    this.#player.media.addEventListener(
      "loadedmetadata",
      this.setVideoFrameSize.bind(this)
    );
  }

  isLoaded() {
    return this.#player != null;
  }

  play(link) {
    if (this.isLoaded()) {
      this.#player.setSrc(link);
      this.#player.setCurrentTime(0);
      this.#player.play();
    } else {
      this.#videoElement.querySelector("source").src = link;
    }
  }

  setSize() {
    const { offsetWidth, offsetHeight } = this.#playerElement;
    this.#player.setPlayerSize(offsetWidth, offsetHeight);
    this.setVideoFrameSize();
  }

  getVideoFrame() {
    return this.#playerElement.querySelector("iframe");
  }

  setVideoFrameSize() {
    if (this.#videoAspectRatio == null) return;
    const { width, height } = this.#player;
    if (this.#videoAspectRatio < width / height) {
      const frame = this.getVideoFrame();
      if (frame) frame.style.width = height * this.#videoAspectRatio + "px";
    } else {
      this.resetVideoFrameSize();
    }
  }

  resetVideoFrameSize() {
    /* eslint-disable no-unused-expressions */
    this.getVideoFrame()?.style.removeProperty("width");
  }
}
