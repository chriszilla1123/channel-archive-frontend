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

@NgModule({
  declarations: [
    HeaderComponent,
    MainComponent,
    DownloadQueueComponent,
    LoginComponent,
    ConfigComponent,
    LoginFormComponent,
    DownloadOptionsFormComponent,
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
  ],
  exports: [
    HeaderComponent,
    MainComponent,
    LoginComponent,
    ConfigComponent,
    LoginFormComponent,
    DownloadOptionsFormComponent,
  ],
})
export class AppModule {

}