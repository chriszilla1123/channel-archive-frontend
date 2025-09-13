import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DownloadOptionsFormComponent} from "./forms/download-options-form/download-options-form.component";
import {MainComponent} from "./component/main/main.component";
import {LoginComponent} from "./component/login/login.component";
import {LoginFormComponent} from "./forms/login-form/login-form.component";
import {MenubarModule} from "primeng/menubar";
import {HeaderComponent} from "./component/header/header.component";
import {ButtonModule} from "primeng/button";
import {CommonModule} from "@angular/common";
import {ConfigComponent} from "./component/config/config.component";
import {TableModule} from "primeng/table";
import {DownloadQueueComponent} from "./component/download-queue/download-queue.component";
import {AccordionModule} from "primeng/accordion";
import {TooltipModule} from "primeng/tooltip";
import {DialogModule} from "primeng/dialog";
import {InputTextModule} from "primeng/inputtext";
import {BrowseChannelsComponent} from "./component/browse-channels/browse-channels.component";
import {BrowseVideosComponent} from "./component/browse-videos/browse-videos.component";
import {AdminComponent} from "./component/admin/admin.component";

@NgModule({
  declarations: [
    HeaderComponent,
    MainComponent,
    DownloadQueueComponent,
    DownloadOptionsFormComponent,
    LoginComponent,
    ConfigComponent,
    BrowseChannelsComponent,
    BrowseVideosComponent,
    LoginFormComponent,
    AdminComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    MenubarModule,
    ButtonModule,
    AccordionModule,
    TooltipModule,
    DialogModule,
    InputTextModule,
  ],
  exports: [
    HeaderComponent,
    MainComponent,
    LoginComponent,
    ConfigComponent,
    LoginFormComponent,
    DownloadOptionsFormComponent,
    BrowseChannelsComponent,
    BrowseVideosComponent,
  ],
})
export class AppModule {

}