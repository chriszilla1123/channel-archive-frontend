import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { DownloadOptionsFormComponent } from "./forms/download-options-form/download-options-form.component";
import { MainComponent } from "./component/main/main.component";
import { LoginComponent } from "./component/login/login.component";
import { LoginFormComponent } from "./forms/login-form/login-form.component";
import { MenubarModule } from "primeng/menubar";
import { HeaderComponent } from "./component/header/header.component";

@NgModule ({
    declarations: [
        HeaderComponent,
        MainComponent,
        LoginComponent,
        LoginFormComponent,
        DownloadOptionsFormComponent,
    ],
    imports: [
        ReactiveFormsModule,
        MenubarModule,
    ],
    exports: [
        HeaderComponent,
        MainComponent,
        LoginComponent,
        LoginFormComponent,
        DownloadOptionsFormComponent,
    ],
})
export class AppModule {

}