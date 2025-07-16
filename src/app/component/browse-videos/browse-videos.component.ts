import {Component, Input, OnInit} from "@angular/core";
import {Channel} from "../../model/channel.model";
import {Location} from "@angular/common";

@Component({
  selector: 'app-browse-videos',
  templateUrl: './browse-videos.component.html',
  styleUrl: 'browse-videos.component.css'
})
export class BrowseVideosComponent implements OnInit{
  browseItemTextMaxLength = 100;
  isChannelConfigured = false;
  @Input({required: true}) channel!: Channel;

  constructor(private location: Location) {
  }

  ngOnInit() {
    // @ts-ignore
    this.channel = this.location.getState().channel;
    this.isChannelConfigured = this.channel.channelName != null && this.channel.channelName.length > 0;
  }
}