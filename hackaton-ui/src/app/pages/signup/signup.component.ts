import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from '../../services/register.service';

interface signupForm {
  name: FormControl,
  email: FormControl,
  password: FormControl,
  passwordConfirm: FormControl
}

@Component({
  selector: 'app-signup',
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [
    LoginService
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm!: FormGroup;

  constructor(
    private router: Router,
    private registerService: RegisterService,
    private toastr: ToastrService
  ) {

    this.signupForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  submit() {
    this.registerService.register(this.signupForm.value.firstName, this.signupForm.value.lastName, this.signupForm.value.email, this.signupForm.value.password)
      .subscribe({
          next: () => {
          this.toastr.success("USUARIO REGISTRADO COM SUCESSO");
          // this.router.navigate(['/video-processor']);
        },
        error: () => this.toastr.error("ERRO AO REGISTRAR USUARIO")
      });
  }

  navigate() {
    this.router.navigate(["login"])
  }
}
