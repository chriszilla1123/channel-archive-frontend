import {Component, ElementRef, Input, OnInit, ViewChild} from "@angular/core";
import {Channel} from "../../model/channel.model";
import {Location} from "@angular/common";
import {Video} from "../../model/video.model";
import {EnvironmentService} from "../../service/environment/environment.service";

@Component({
  selector: 'app-browse-videos',
  templateUrl: './browse-videos.component.html',
  styleUrl: 'browse-videos.component.css'
})
export class BrowseVideosComponent implements OnInit{
  browseItemTextMaxLength: number = 100;
  isChannelConfigured: boolean = false;
  playingVideoSource: String | null = null;
  @Input({required: true}) channel!: Channel;
  @ViewChild('videoPlayer', { static: false }) videoPlayerRef!: ElementRef<HTMLVideoElement>;

  constructor(
    private location: Location,
    private environmentService: EnvironmentService,
    ) {
  }

  ngOnInit() {
    // @ts-ignore
    this.channel = this.location.getState().channel;
    this.isChannelConfigured = this.channel.channelName != null && this.channel.channelName.length > 0;
  }

  onVideoClicked(video: Video) {
    this.playingVideoSource = this.environmentService.API_URL + "/stream/video?path=" + encodeURI(<string>video.path);
    console.log(this.playingVideoSource);

    //reload the video element
    setTimeout(() => {
      if (this.videoPlayerRef?.nativeElement) {
        this.videoPlayerRef.nativeElement.load();
        this.videoPlayerRef.nativeElement.play();
      }
    });
  }
}