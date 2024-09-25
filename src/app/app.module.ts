import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { DownloadOptionsFormComponent } from "./forms/download-options-form/download-options-form.component";
import { MainComponent } from "./component/main/main.component";
import { LoginComponent } from "./component/login/login.component";
import { LoginFormComponent } from "./forms/login-form/login-form.component";

@NgModule ({
    declarations: [
        MainComponent,
        LoginComponent,
        LoginFormComponent,
        DownloadOptionsFormComponent,
    ],
    imports: [
        ReactiveFormsModule
    ],
    exports: [
        MainComponent,
        LoginComponent,
        LoginFormComponent,
        DownloadOptionsFormComponent,
    ],
})
export class AppModule {

}