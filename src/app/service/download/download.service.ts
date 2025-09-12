import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, Observer} from "rxjs";
import {Channel} from "../../model/channel.model";
import {Injectable} from "@angular/core";
import {DownloadQueueModel} from "../../model/download-queue.model";
import {DownloadRequestModel} from "../../model/download-request.model";
import {NotificationService} from "../notification/notification.service";
import {EnvironmentService} from "../environment/environment.service";

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  constructor(
    private httpClient: HttpClient,
    private environmentService: EnvironmentService,
    private notificationService: NotificationService
    ) {}

  downloadArchive(requestModel: DownloadRequestModel): Observable<Channel[]> {
    return new Observable<Channel[]>((observer: Observer<Channel[]>) => {
      this.httpClient.post<Channel[]>(this.environmentService.API_URL + "/download", requestModel).subscribe({
        next: (response: Channel[]) => {
          observer.next(response);
          observer.complete();
        },
        error: (error: HttpErrorResponse) => {
          this.notificationService.notifyHttpErrorResponse(error);
          observer.error(error);
        }
      });
    });
  }

  downloadOneOff(requestModel: DownloadRequestModel): Observable<boolean> {
    return new Observable<boolean>((observer: Observer<boolean>) => {
      this.httpClient.post<boolean>(this.environmentService.API_URL + "/download/oneoff", requestModel).subscribe({
        next: (response: boolean) => {
          observer.next(response);
          observer.complete();
        },
        error: (error: HttpErrorResponse) => {
          this.notificationService.notifyHttpErrorResponse(error);
          observer.error(error);
        }
      });
    });
  }

  getDownloadQueue(): Observable<DownloadQueueModel> {
    return new Observable<DownloadQueueModel>((observer: Observer<DownloadQueueModel>) => {
      this.httpClient.get(this.environmentService.API_URL + "/download/queue").subscribe({
        next: (response: any) => {
          observer.next(response);
          observer.complete();
        },
        error: (error: HttpErrorResponse) => {
          this.notificationService.notifyHttpErrorResponse(error);
          observer.error(error);
        }
      });
    });
  }
}