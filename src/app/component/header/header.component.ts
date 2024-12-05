import {Component} from "@angular/core";
import {MenuItem} from "primeng/api";
import {ConfigService} from "../../service/config/config.service";

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
      error: (error: unknown) => {
        console.log(error);
      }
    })
  }
}