import {Component} from "@angular/core";
import {DownloadService} from "../../service/download/download.service";
import {DownloadRequestModel} from "../../model/download-request.model";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrl: "./main.component.css",
})
export class MainComponent {
  dryRun: boolean = false;

  constructor(
    private downloadService: DownloadService,
  ) {
  }

  async start() {
    let requestModel = new DownloadRequestModel(this.dryRun);
    this.downloadService.downloadArchive(requestModel).subscribe({
      next: (response: any) => {

      },
      error: (error: unknown) => {
        console.error(error);
      }
    })
  }

  formUpdate(event: any) {
    this.dryRun = event.dryRun;
  }
}