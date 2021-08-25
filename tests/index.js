const { Client } = require("discord.js");
const AutoPoster = require("../index");
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

const poster = new AutoPoster(client, {
  key: "danbot-apikey",
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
