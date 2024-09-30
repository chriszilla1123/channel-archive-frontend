import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ConfigService } from "../../service/config/config.service";
import { Channel } from "../../model/channel.model";

@Component({
    selector: 'app-config',
    templateUrl: './config.component.html',
    styleUrl: './config.component.css'
})
export class ConfigComponent {
    channels: Channel[] = [];

    constructor(
        private router: Router,
        private configService: ConfigService,
    ) {
    }

    ngOnInit() {
        this.configService.getConfig().subscribe({
            next: (response: any) => {
                this.channels = response;
                console.log(this.channels);
            },
            error: (error: unknown) => {
                console.log(error);
            }
        });
    }
}