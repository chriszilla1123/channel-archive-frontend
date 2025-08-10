import {Component} from "@angular/core";
import {MenuItem} from "primeng/api";
import {ConfigService} from "../../service/config/config.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  items: MenuItem[];
  ytdlVersion: string | null;
  YTDL_VERSION_REF: string = "YTDL_VERSION";

  constructor(
    private configService: ConfigService,
  ) {
    this.items = [
      {label: "Download", routerLink: [""]},
      {label: "Config", routerLink: ["/config"]},
      {label: "Browse", routerLink: ["/browse/channels"]},
      {label: "Login", routerLink: ["/login"]},
    ];
    this.ytdlVersion = localStorage.getItem(this.YTDL_VERSION_REF);
    this.fetchYtdlVersion();
  }

  fetchYtdlVersion() {
    this.configService.getYtdlVersion().subscribe({
      next: (response: string) => {
        localStorage.setItem(this.YTDL_VERSION_REF, response);
        this.ytdlVersion = localStorage.getItem(this.YTDL_VERSION_REF);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    })
  }
}