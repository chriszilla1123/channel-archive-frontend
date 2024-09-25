import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { MainComponent } from './component/main/main.component';

export const routes: Routes = [
    { path: '', component: MainComponent},
    { path: 'login', component: LoginComponent}
];
