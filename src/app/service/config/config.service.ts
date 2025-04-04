import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../../../environments/environment";
import {Channel} from "../../model/channel.model";
import {Observable} from "rxjs";
import {NotificationService} from "../notification/notification.service";
import {NotificationLevel} from "../../enum/notification-level.enum";

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(
    private httpClient: HttpClient,
    private notificationService: NotificationService,
  ) {}

  getConfig(): Observable<Channel[]> {
    return new Observable<Channel[]>((observer) => {
      this.httpClient.get<Channel[]>(environment.url + "/config/channels").subscribe({
        next: (response: Channel[]) => {
          observer.next(response);
          observer.complete();
        },
        error: (error: HttpErrorResponse) => {
          this.notificationService.notifyHttpErrorResponse(error);
          observer.error(error);
        }
      });
    })
  }

  updateChannels(channels: Channel[]): Observable<Channel[]> {
    return new Observable<Channel[]>((observer) => {
      this.httpClient.put<Channel[]>(environment.url + "/config/channels/update", channels).subscribe({
        next: (response: Channel[]) => {
          this.notificationService.notify(NotificationLevel.SUCCESS, "Success", "Channel configuration saved successfully")
          observer.next(response);
          observer.complete();
        },
        error: (error: HttpErrorResponse) => {
          this.notificationService.notifyHttpErrorResponse(error);
          observer.error(error);
        }
      });
    })
  }

  getYtdlVersion(): Observable<string> {
    return new Observable(observer => {
      this.httpClient.get(environment.url + "/config/ytdl/version", {responseType: 'text'}).subscribe({
        next: (response: string) => {
          observer.next(response);
          observer.complete();
        },
        error: (error: HttpErrorResponse) => {
          this.notificationService.notifyHttpErrorResponse(error);
          observer.error(error);
        }
      })
    })
  }
}