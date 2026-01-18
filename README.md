# Random YouTube Video Viewer

A web app that lets you cycle through random videos found on YouTube. Written in vanilla JavaScript.

It uses YouTube search API with randomly generated search queries to make the stream of videos as unpredictable as possible. Can be used for entertainment, inspiration or to explore different cultures and languages.

## Try it out

https://random-youtube-video-viewer.netlify.app/

## Getting started

1. Create a [YouTube Data API v3 key](https://developers.google.com/youtube/registering_an_application).

   **Note:** with some lookup algorithms, the app may use up to a few hundred quota points per video, while only 10000 points are available per day per API key. If you end up running out of quota quickly, consider creating several API keys using multiple Google accounts.

2. Paste the key(s) into the text box under the Settings menu.

## Features

- Uses [mediaelement](https://github.com/mediaelement/mediaelement) (along with some CSS tricks) instead of the native YouTube player to hide the title and other information about the video.
- Allows to reveal information about the video under the Spoilers toggle and provides a link to the video on YouTube.
- Provides several lookup algorithms — different approaches to finding random videos.

  - **Video IDs** (default). Searches for videos with IDs matching randomly generated prefixes. This algorithm will produce the most evenly distributed random results, without specific characteristics or direction. Great for a true “random YouTube” feel.

    **Quota usage**: ~14 points per video.

  - **Wikipedia**. Uses words and phrases found in random Wikipedia articles as search queries. This algorithm will generally produce videos from a variety of different regions, and each video will often be about a specific topic. Great for discovering content and exploring different cultures.

    **Quota usage**: ~120 points per video.

  - **Zero View YouTube**. Inspired by [Petit Tube](https://petittube.com/) — searches for video titles containing common video file names used by digital cameras and other software. The results will be skewed towards home videos or other videos uploaded directly after having been recorded. Will rarely include edited or professionally produced videos.

    **Quota usage**: ~105 points per video.

## To do

- Add support for smaller viewports (mobile screens).
