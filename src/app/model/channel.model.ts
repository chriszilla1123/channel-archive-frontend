export class Channel {
  channelName: string;
  channelId: string;
  channelDir: string;

  constructor(channelName: string, channelId: string, channelDir: string) {
    this.channelName = channelName;
    this.channelId = channelId;
    this.channelDir = channelDir;
  }

  toString(): string {
    return `${this.channelName} - ${this.channelId} - ${this.channelDir}`;
  }
}