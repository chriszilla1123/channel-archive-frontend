import {Component} from "@angular/core";
import {DownloadService} from "../../service/download/download.service";
import {DownloadRequestModel} from "../../model/download-request.model";
import {Video} from "../../model/video.model";
import {Channel} from "../../model/channel.model";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrl: "./main.component.css",
})
export class MainComponent {
  //Sent as event from download-options-form
  dryRun: boolean = false;
  oneOffVideoUrl: string = "";

  showDryRunDialog: boolean = false;
  dryRunVideos: Video[] = [];

  constructor(
    private downloadService: DownloadService,
  ) {
  }

  async start() {
    let requestModel = new DownloadRequestModel(this.dryRun);
    this.downloadService.downloadArchive(requestModel).subscribe({
      next: (response: Channel[]) => {
        if(this.dryRun) {
          this.dryRunVideos = [];
          this.showDryRunDialog = true;
          response.forEach((channel: Channel) => {
            this.dryRunVideos.push(...channel.videos);
          })
        }
      },
      error: (error: HttpErrorResponse) => {
      }
    })
  }

  startOneOff() {
    let requestModel = new DownloadRequestModel(this.dryRun, this.oneOffVideoUrl);
    this.downloadService.downloadOneOff(requestModel).subscribe({
      next: (response: boolean) => {

      },
      error: (error: HttpErrorResponse) => {
      }
    })
  }

  formUpdate(event: any) {
    this.dryRun = event.dryRun;
    this.oneOffVideoUrl = event.oneOffVideoUrl;
  }
}