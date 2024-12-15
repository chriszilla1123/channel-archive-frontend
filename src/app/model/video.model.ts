export class Video {
  id: string;
  title: string;
  url: string;
  download_date: string;
  directory: string;
  channelName: string;

  constructor(id: string, title: string, url: string, download_date: string, directory: string, channelName: string) {
    this.id = id;
    this.title = title;
    this.url = url;
    this.download_date = download_date;
    this.directory = directory;
    this.channelName = channelName;
  }

  toString(): string {
    return `${this.title} - ${this.channelName} - ${this.id} - ${this.url} - ${ this.directory }`
  }
}