import { Component } from "@angular/core";
import { environment } from "../../../environments/environment";
import { LoginCredentials } from "../../model/login-credentials.model";
import { LoginService } from "../../service/login/login.service";

@Component({
    selector: "app-main",
    templateUrl: "./main.component.html",
    styleUrl: "./main.component.css",
})
export class MainComponent {
    streamedApiResponse: string = "";
    dryRun: boolean = false;

    constructor(
      private loginService: LoginService
    ) {}

    async start() {
        this.streamedApiResponse = "";
        let ref = this;
        let url = environment.url + "/download";
        let requestBody = {dryRun: this.dryRun};
        let loginCredentials: LoginCredentials | null = this.loginService.getStoredCredentials();
        if(!loginCredentials) {
          return;
        }
        fetch(url, {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "Authorization": "Basic " + window.btoa(loginCredentials.username 
                                            + ":" + loginCredentials.password)
          },
          body: JSON.stringify(requestBody)
        }).then(response => {
          const reader = response.body?.getReader();
          const decoder = new TextDecoder();
    
          function read() {
            reader?.read().then(({ done, value }) => {
              if(done) {
                return;
              }
              ref.streamedApiResponse += decoder.decode(value, {stream:true}).replace(/(?:\t)/g, "&emsp;&emsp;&emsp;&emsp;").replace(/(?:\r\n|\r|\n)/g, '<br>');
              read();
            });
          }
    
          read();
        }).catch((err) => {
          console.error(err);
        })
      }
    
      formUpdate(event: any) {
        this.dryRun = event.dryRun;
      }
}