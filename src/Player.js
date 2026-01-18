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

  #load() {
    this.#player = new MediaElementPlayer(this.#videoElement, {
      renderers: ["youtube_iframe"],
      youtube: {
        modestbranding: 1,
        autohide: 1,
      },
    });
    this.updateSize();

    this.#player.media.addEventListener("loadedmetadata", () => {
      this.#updateVideoFrameSize();
      this.#removeVideFrameTitle();
      this.#player.play();
    });
  }

  play(link) {
    if (!this.#player) {
      this.#videoElement.querySelector("source").src = link;
      this.#load();
    } else {
      this.#player.setSrc(link);
      this.#player.setCurrentTime(0);
    }
  }

  setVideoAspectRatio(videoAspectRatio) {
    this.#videoAspectRatio = videoAspectRatio;
  }

  updateSize() {
    if (!this.#player) return;
    const { offsetWidth, offsetHeight } = this.#playerElement;
    this.#player.setPlayerSize(offsetWidth, offsetHeight);
    this.#updateVideoFrameSize();
  }

  #getVideoFrame() {
    return this.#playerElement.querySelector("iframe");
  }

  #updateVideoFrameSize() {
    if (!this.#player || !this.#videoAspectRatio) return;
    if (this.#videoAspectRatio) {
      const { width, height } = this.#player;
      if (this.#videoAspectRatio < width / height) {
        const frame = this.#getVideoFrame();
        if (frame) frame.style.width = height * this.#videoAspectRatio + "px";
      } else {
        this.#resetVideoFrameSize();
      }
    } else {
      this.#resetVideoFrameSize();
    }
  }

  #resetVideoFrameSize() {
    this.#getVideoFrame()?.style.removeProperty("width");
  }

  #removeVideFrameTitle() {
    const frame = this.#getVideoFrame();
    if (frame) frame.removeAttribute("title");
  }
}
