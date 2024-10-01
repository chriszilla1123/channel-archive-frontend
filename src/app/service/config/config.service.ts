import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Channel } from "../../model/channel.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
  })
export class ConfigService {
    constructor(
        private httpClient: HttpClient
    ) {

    }

    getConfig(): Observable<Channel[]> {
        return new Observable<Channel[]>((observer) => {
            this.httpClient.get(environment.url + "/config/channels").subscribe({
                next: (response: any) => {
                    observer.next(response);
                    observer.complete();  
                },
                error: (error: unknown) => {
                    console.error(error);
                    observer.error(error);
                }
            });  
        })
    }

    updateChannels(channels: Channel[]): Observable<Channel[]> {
        return new Observable<Channel[]>((observer) => {
            this.httpClient.put(environment.url + "/config/channels/update", channels).subscribe({
                next: (response: any) => {
                    observer.next(response);
                    observer.complete();  
                },
                error: (error: unknown) => {
                    console.error(error);
                    observer.error(error);
                }
            });  
        })
    }
}