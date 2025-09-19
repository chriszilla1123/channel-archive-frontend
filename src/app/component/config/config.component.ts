import {Component} from "@angular/core";
import {ConfigService} from "../../service/config/config.service";
import {Channel} from "../../model/channel.model";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrl: './config.component.css'
})
export class ConfigComponent {
  channels: Channel[] = [];
  editingEnabled: boolean = false; //Set true when editing is enabled
  saveInProgress: boolean = false; //Set true when a save request is in progress

  constructor(
    private configService: ConfigService,
  ) {
  }

  ngOnInit() {
    this.fetchChannels();
  }

  fetchChannels() {
    this.configService.getConfig().subscribe({
      next: (response: any) => {
        this.channels = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  saveChanges() {
    if (this.saveInProgress) {
      return;
    }
    this.saveInProgress = true;
    let channelsCopy = JSON.parse(JSON.stringify(this.channels));
    channelsCopy = channelsCopy.filter((channel: Channel) => {
      return channel != null && this.validateChannel(channel)
    })
    this.configService.updateChannels(channelsCopy).subscribe({
      next: (response: Channel[]) => {
        this.editingEnabled = false;
        this.channels = response;
      },
      error: (error: HttpErrorResponse) => {
        this.fetchChannels();
        this.saveInProgress = false;
      }
    })
  }

  validateChannel(channel: Channel): boolean {
    return channel.channelName != null && channel.channelId != null && channel.channelDir != null
      && channel.channelName.length > 0 && channel.channelId.length > 0 && channel.channelDir.length > 0;
  }

  enableEditing() {
    this.editingEnabled = true;
    this.saveInProgress = false;
  }

  discardChanges() {
    this.editingEnabled = false;
    this.fetchChannels();
  }

  moveChannelUp(index: number) {
    if (index == 0) {
      return;
    }
    let temp: Channel = this.channels[index - 1];
    this.channels[index - 1] = this.channels[index];
    this.channels[index] = temp;
  }

  moveChannelDown(index: number) {
    if (index == this.channels.length - 1) {
      return;
    }
    let temp: Channel = this.channels[index + 1];
    this.channels[index + 1] = this.channels[index];
    this.channels[index] = temp;
  }

  deleteChannel(index: number) {
    delete this.channels[index];
  }

  addChannel() {
    this.channels.push({
      channelId: "",
      channelName: "",
      channelDir: "",
      videos: [],
      enabled: true
    });
  }

}