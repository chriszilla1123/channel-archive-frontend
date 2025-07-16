import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Channel} from "../../model/channel.model";
import {NotificationService} from "../notification/notification.service";

@Injectable({
  providedIn: 'root',
})
export class BrowseService {
  constructor(
    private httpClient: HttpClient,
    private notificationService: NotificationService,
  ) {};

  getChannels(): Observable<Channel> {
    return new Observable<Channel>((observer) => {
      this.httpClient.get<Channel>(environment.url + "/browse/channels").subscribe({
        next: (response: Channel) => {
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