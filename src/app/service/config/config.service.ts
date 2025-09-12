import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Channel} from "../../model/channel.model";
import {Observable} from "rxjs";
import {NotificationService} from "../notification/notification.service";
import {NotificationLevel} from "../../enum/notification-level.enum";
import {EnvironmentService} from "../environment/environment.service";

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(
    private httpClient: HttpClient,
    private environmentService: EnvironmentService,
    private notificationService: NotificationService,
  ) {}

  getConfig(): Observable<Channel[]> {
    return new Observable<Channel[]>((observer) => {
      this.httpClient.get<Channel[]>(this.environmentService.API_URL + "/config/channels").subscribe({
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
      this.httpClient.put<Channel[]>(this.environmentService.API_URL + "/config/channels/update", channels).subscribe({
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
      this.httpClient.get(this.environmentService.API_URL + "/config/ytdl/version", {responseType: 'text'}).subscribe({
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