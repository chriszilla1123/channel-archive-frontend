import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DownloadOptionsFormComponent } from './forms/download-options-form/download-options-form.component';
import { AppModule } from './app.module';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AppModule,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'channel-archive-frontend';
  streamedApiResponse: string = "";
  dryRun: boolean = false;

  constructor() {

  }

  async start() {
    this.streamedApiResponse = "";
    let ref = this;
    let url = environment.url + "/download";
    let requestBody = {dryRun: this.dryRun}
    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
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
