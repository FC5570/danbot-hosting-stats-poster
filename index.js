const { EventEmitter } = require("events");
const { default: fetch } = require("node-fetch");

class AutoPoster extends EventEmitter {
  /**
   * Creates the Auto Poster
   * @param client: The discord.js client
   * @param {Object} options: The options for the AutoPoster
   * @param {String} options.key: The Danbot API key.
   * @param {String} [options.guildCount]: The guild count of the client
   * @param {String} [options.userCount]: The user count of the client
   * @param {String} [options.postInterval]: The interval to make posts at in milliseconds. Defaults to 1 hour.
   */
  constructor(client, options) {
    super(client, options);

    this.baseURL = "https://danbot.host/api";
    this.client = client;
    this.key = options.key;
    this.guildCount = options.guildCount;
    this.userCount = options.userCount;
    this.interval = options.postInterval;

    if (!this.key || typeof this.key !== "string")
      throw new Error(
        `options.key must be present and must be a string. recieved typeof ${typeof this
          .key}`
      );
    if (!this.key.startsWith("danbot-"))
      throw new Error("options.key must start with danbot-");
    if (this.interval && isNaN(this.interval))
      throw new Error("options.postInterval needs to be a number");
  }

  /**
   * Posts the data to the API every 1 hour.
   */
  async autoPost() {
    const post = await this.post();
    if (post.status === 200 || post.status === 524)
      this.emit("autoPostingStarted", post);
    setInterval(() => {
      const post = this.post();
      this.emit("posted", post);
    }, this.interval || 3.6e6);
  }

  /**
   * Makes posts to the API
   * @private
   */
  async post() {
    const body = {
      id: this.client.user.id,
      key: this.key,
      servers: this.guildCount || this.client.guilds.cache.size,
      users: this.userCount || this.client.users.cache.size,
      clientInfo: this.client.user,
    };

    const response = await fetch(
      `${this.baseURL}/bot/${this.client.user.id}/stats`,
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 200 && response.status !== 524)
      this.emit("error", response.status, response.statusText, response);
    return response;
  }
}
module.exports = AutoPoster;
