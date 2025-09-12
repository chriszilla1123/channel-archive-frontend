import {Video} from "../../model/video.model";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {NotificationService} from "../notification/notification.service";
import {EnvironmentService} from "../environment/environment.service";

@Injectable({
  providedIn: 'root'
})
export class StreamService {
  constructor(
    private httpClient: HttpClient,
    private environmentService: EnvironmentService,
    private notificationService: NotificationService,
  ) {
  }

  getVideoLink(video: Video) {
    return new Observable<any>((observer) => {
      this.httpClient.get(this.environmentService.API_URL + "/stream/video?path=" + encodeURI(<string>video.path)).subscribe({
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