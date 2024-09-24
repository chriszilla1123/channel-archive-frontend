import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { DownloadOptionsFormComponent } from "./forms/download-options-form/download-options-form.component";

@NgModule ({
    declarations: [
        DownloadOptionsFormComponent
    ],
    imports: [
        ReactiveFormsModule
    ],
    exports: [
        DownloadOptionsFormComponent
    ],
})
export class AppModule {

}