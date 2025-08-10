import {Video} from "../../model/video.model";
import {environment} from "../../../environments/environment";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {getXHRResponse} from "rxjs/internal/ajax/getXHRResponse";
import {NotificationService} from "../notification/notification.service";

@Injectable({
  providedIn: 'root'
})
export class StreamService {
  constructor(
    private httpClient: HttpClient,
    private notificationService: NotificationService,
  ) {
  }

  getVideoLink(video: Video) {
    return new Observable<any>((observer) => {
      this.httpClient.get(environment.url + "/stream/video?path=" + encodeURI(<string>video.path)).subscribe({
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