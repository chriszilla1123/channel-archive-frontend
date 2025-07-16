import {Routes} from '@angular/router';
import {LoginComponent} from './component/login/login.component';
import {MainComponent} from './component/main/main.component';
import {ConfigComponent} from './component/config/config.component';
import {BrowseChannelsComponent} from "./component/browse-channels/browse-channels.component";
import {BrowseVideosComponent} from "./component/browse-videos/browse-videos.component";

export const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'login', component: LoginComponent},
  {path: 'config', component: ConfigComponent},
  {path: 'browse-channels', component: BrowseChannelsComponent},
  {path: 'browse-videos', component: BrowseVideosComponent},
];