import {Video} from "./video.model";

export class Channel {
  channelName: string;
  channelId: string;
  channelDir: string;
  videos: Video[];
  enabled: boolean;

  constructor(channelName: string, channelId: string, channelDir: string, videos: Video[], enabled: boolean) {
    this.channelName = channelName;
    this.channelId = channelId;
    this.channelDir = channelDir;
    this.videos = videos;
    // this.enabled = enabled;
    this.enabled = true;
  }

  toString(): string {
    return `${this.channelName} - ${this.channelId} - ${this.channelDir} - Disabled: ${this.enabled}`;
  }
}