import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AppModule } from './app.module';
import { LoginService } from './service/login/login.service';
import { LoginCredentials } from './model/login-credentials.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AppModule,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    console.log("Channel Archive Web Interface started...");

    this.loginService.getAndValidateStoredCredentials().subscribe({
      next: (loginCredentials: LoginCredentials) => {
        console.log("Validated login credentials and server is up");
      },
      error: (error: unknown) => {
        //TODO: Notification
        console.log("Navigating to login page after credentials failed to validate with message: " + error);
        this.router.navigate(['/login']);
      }
    })
  }
}
