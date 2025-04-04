import {ChangeDetectorRef, Component, OnDestroy, OnInit} from "@angular/core";
import {DownloadQueueModel} from "../../model/download-queue.model";
import {DownloadService} from "../../service/download/download.service";
import {interval, Observable, Subscription, switchMap} from "rxjs";
import {formatDistance, formatRelative} from "date-fns";
import {DownloadStatus} from "../../enum/download-status.enum";
import {Video} from "../../model/video.model";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: "app-download-queue",
  templateUrl: "./download-queue.component.html",
  styleUrls: ["./download-queue.component.scss"]
})
export class DownloadQueueComponent implements OnInit, OnDestroy{
  downloadQueue: DownloadQueueModel = new DownloadQueueModel([], [], [], []);
  downloadStatus: DownloadStatus[] = [DownloadStatus.INPROGRESS, DownloadStatus.PENDING, DownloadStatus.SUCCESS]
  queueUpdateSubscription: Subscription = new Subscription;
  queueUpdateInterval = 1000 // 1000ms = 1 second
  queueItemTextMaxLength = 100;

  constructor(
    private downloadService: DownloadService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {

  }

  ngOnInit() {
    this.startPolling();
  }

  ngOnDestroy() {
    this.stopPolling();
  }

  startPolling(): void {
    console.info("Starting polling of download queue every " + (this.queueUpdateInterval / 1000) + " seconds");
    this.queueUpdateSubscription = interval(this.queueUpdateInterval)
      .pipe(switchMap(() => this.updateDownloadQueue()))
      .subscribe({
        next: (response: DownloadQueueModel) => {
          let updateFound: boolean = false;
          if(this.isQueueChanged(this.downloadQueue.inProgressDownloads, response.inProgressDownloads)) {
            this.downloadQueue.inProgressDownloads = response.inProgressDownloads;
            updateFound = true;
          }
          if(this.isQueueChanged(this.downloadQueue.pendingDownloads, response.pendingDownloads)) {
            this.downloadQueue.pendingDownloads = response.pendingDownloads;
            updateFound = true;
          }
          if(this.isQueueChanged(this.downloadQueue.completedDownloads, response.completedDownloads)) {
            this.downloadQueue.completedDownloads = response.completedDownloads;
            updateFound = true;
          }
          if(this.isQueueChanged(this.downloadQueue.failedDownloads, response.failedDownloads)) {
            this.downloadQueue.failedDownloads = response.failedDownloads;
            updateFound = true;
          }
          if(updateFound) {
            this.changeDetectorRef.detectChanges();
          }
          // if(this.isQueueChanged(this.downloadQueue, response)) {
          //   this.downloadQueue = response
          //   this.changeDetectorRef.detectChanges();
          // }
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
        }
      })
  }

  stopPolling(): void {
    console.info("Stopping download queue polling");
    if(this.queueUpdateSubscription) {
      this.queueUpdateSubscription.unsubscribe();
    }
  }

  isQueueChanged(queue1: Video[], queue2: Video[]): boolean {
    return JSON.stringify(queue1) !== JSON.stringify(queue2);
  }

  updateDownloadQueue(): Observable<DownloadQueueModel> {
    return this.downloadService.getDownloadQueue();
  }

  formatDownloadDate(date: Date): string {
    return formatDistance(date, new Date(), { addSuffix: true })
  }

  formatDownloadDate_Long(date: Date): string {
    return formatRelative(date, new Date());
  }
}