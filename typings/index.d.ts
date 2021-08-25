import { EventEmitter } from "events";
import { Client } from "discord.js";
import { Response } from "node-fetch";

export interface AutoPosterOptions {
  key: string;
  guildCount?: string;
  userCount?: string;
  postInterval: string;
}

export interface AutoPosterEvents {
  autoPostingStarted: [post: Response];
  posted: [post: Response];
  error: [responseCode: number, responseText: string, response: Response];
}

export class AutoPoster extends EventEmitter {
  constructor(client: Client, options: AutoPosterOptions);
  public autoPost(): void;
  public on<L extends keyof AutoPosterEvents>(
    event: L,
    listener: (...args: AutoPosterEvents[L]) => void
  ): this;
}
