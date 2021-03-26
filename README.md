# Random YouTube Video Viewer

A web app that lets you cycle through random videos found on YouTube. Written in vanilla JavaScript.

It uses YouTube search API with randomly generated search queries to make the stream of videos as unpredictable as possible. Can be used for entertainment, inspiration or to explore different cultures and langauges.

## Try it out

https://00pxb.csb.app/

## Getting started

1. Create a [YouTube Data API v3 key](https://developers.google.com/youtube/registering_an_application).

   **Note:** the player uses at least 101 quota points per request, allowing to watch not more than 100 videos per day per API key. If you plan to watch more, consider creating several API keys from multiple Google accounts.

2. Paste the key(s) into the text box under the Settings menu.

## Features

- Uses [mediaelement](https://github.com/mediaelement/mediaelement) (along with some CSS tricks) instead of the native YouTube player to hide the title and other information about the video.
- Provides different ways of generating search terms.

  - **Numbers** — uses a random string of multiple numbers as a search term.
  - **Wikipedia words** — uses Wikipedia API to fetch a random article in a random language and takes a random word or a sequence of words from it to use as a search term.

- Allows to reveal information about the video under the Spoilers toggle and provides a link to the video on YouTube.

## To do

- Add support for smaller viewports (mobile screens).
