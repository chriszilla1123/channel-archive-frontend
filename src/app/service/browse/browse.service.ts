import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Channel} from "../../model/channel.model";
import {NotificationService} from "../notification/notification.service";
import {EnvironmentService} from "../environment/environment.service";

@Injectable({
  providedIn: 'root',
})
export class BrowseService {
  constructor(
    private httpClient: HttpClient,
    private environmentService: EnvironmentService,
    private notificationService: NotificationService,
  ) {};

  getChannels(): Observable<Channel> {
    return new Observable<Channel>((observer) => {
      this.httpClient.get<Channel>(this.environmentService.API_URL + "/browse/channels").subscribe({
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