import { Component } from "@angular/core";
import { MenuItem } from "primeng/api";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    items: MenuItem[];

    constructor() {
        this.items = [
            {label: "Download", routerLink: [""]},
            {label: "Config", routerLink: ["/config"]},
            {label: "Login", routerLink: ["/login"]},
        ];
    }
}