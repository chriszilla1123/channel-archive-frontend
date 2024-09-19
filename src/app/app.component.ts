import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'channel-archive-frontend';
  streamedApiResponse: string = "";

  constructor() {

  }

  async start() {
    let ref = this;
    let url = "http://localhost:8080/download";
    let requestBody = {dryRun: true}
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
}
