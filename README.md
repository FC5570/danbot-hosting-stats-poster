# danbot-hosting-stats-poster

Posts stats to [Danbot Hosting's](https://danbot.host) bot API.

## Installation

NPM:

```
npm i danbot-hosting-stats-poster
```

Yarn:

```
yarn add danbot-hosting-stats-poster
```

## Setting Up

1. To start with posting stats, go to #bot-commands in the [Discord Server](https://discord.com/invite/dbh) and type `DBH!apikey`, the bot will send you your API key.
2. Use the API key in the examples provided below.
3. Call the `autoPost()` function after you've instantiated a new AutoPoster client.
4. If everything went fine, your bot's stats will be posted to the API, and your bot will be added to the server if you want.

## Examples

```js
const { Client } = require("discord.js");
const AutoPoster = require("danbot-hosting-stats-poster");
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

const poster = new AutoPoster(client, {
  key: "danbot-apikey", //replace this with your api key
});

client.on("ready", async () => {
  console.log("logged in");
  await poster.autoPost();
});

poster.on("autoPostingStarted", (post) => {
  console.log(`Auto posting has started - ${post.statusText}`);
});

poster.on("post", (post) => {
  console.log(`Posted to the API - ${post.status}`);
});

poster.on("error", (code, text, response) => {
  console.log(`An error occured while posting -`, code, text, response);
});

client.login("your token");
```

## Events

1. `autoPostingStarted` _(post)_ - Emitted when the AutoPoster starts posting to the API.
2. `posted` _(post)_ - Emitted when the AutoPoster posts to the API everytime.
3. `error` _(code, message, response)_ - Emitted when an error is occured while making a request to the API.

## API

### AutoPoster.constructor(client, AutoPosterOptions)

`AutoPosterOptions` is an object which can contain the following:

1. **key** _(string)_ - The API key which you get from the bot (if you don't know where to get the API key, [read this](https://npmjs.com/danbot-hosting-stats-poster#settingup))
2. **guildCount** _(string, optional)_ - The guild count of the bot.
3. **userCount** _(string, optional)_ - The user count of the bot.
4. **postInterval** _(string, optional)_ - The interval (in milliseconds) to make posts at.

### AutoPoster.autoPost()

This will start posting stats to the API and emit the `autoPostingStarted` and `posted` events.

### If you encounter any bugs/issues, please DM me on Discord: FC#5104
