import {Component} from "@angular/core";
import {BrowseService} from "../../service/browse/browse.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Channel} from "../../model/channel.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-browse-channels',
  templateUrl: './browse-channels.component.html',
  styleUrl: 'browse-channels.component.css'
})
export class BrowseChannelsComponent {
  channels: Channel[] = [];

  constructor(
    private browseService: BrowseService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.fetchChannels();
  }

  fetchChannels() {
    this.browseService.getChannels().subscribe({
      next: (response: any) => {
        this.channels = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  onChannelClicked(channel: Channel) {
    this.router.navigate(['/browse-videos'], {
      state: { channel: channel }
    });
  }
}