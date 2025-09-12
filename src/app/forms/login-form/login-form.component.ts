import {Component, EventEmitter, Output} from "@angular/core";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {LoginCredentials} from "../../model/login-credentials.model";
import {LoginService} from "../../service/login/login.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  @Output() formSubmit = new EventEmitter<LoginCredentials>();
  form: FormGroup;
  username = new FormControl('');
  password = new FormControl('');


  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
  ) {
    this.form = this.formBuilder.group({
      username: [''],
      password: ['']
    })
  }

  onSubmit() {
    const username = this.form.get('username')?.value;
    const password = this.form.get('password')?.value;
    this.loginService.validateAndStoreCredentials(username, password).subscribe({
      next: (response: LoginCredentials) => {
        this.formSubmit.emit(response);
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    })
  }
}