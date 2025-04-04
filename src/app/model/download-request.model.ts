export class DownloadRequestModel {
  dryRun: boolean = true;
  oneOffVideoUrl: string = "";
  oneOffVideoDirectory: string = "";

  constructor(dryRun: boolean, oneOffVideoUrl?: string, oneOffVideoDirectory?: string) {
    this.dryRun = dryRun;
    if(oneOffVideoUrl) {
      this.oneOffVideoUrl = oneOffVideoUrl;
    }
    if(oneOffVideoDirectory) {
      this.oneOffVideoDirectory = oneOffVideoDirectory;
    }
  }
}