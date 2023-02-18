import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  angForm: FormGroup;
  noRegister = "none";
  isLoading = false;

  logueado: boolean;

  fallido = "{message: 'Inicio de sesión fallido'}";
  exito = "{message: 'Inicio de sesión exitoso'}";

  constructor(private fb: FormBuilder, private dataService: ApiService, private router: Router) {
    this.angForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(3), Validators.email]],
      password: ['', Validators.required]
    });

    if (this.dataService.isLoggedIn()) {
      console.log("loggedin");
      this.logueado = true
    } else {
      this.logueado = false
    }
  }

  ngOnInit() {
  }
  postdata(angForm1: { value: { email: any; password: any; }; }) {
    this.dataService.userlogin(angForm1.value.email, angForm1.value.password)
      .pipe(first())
      .subscribe(
        data => {
          const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : '/dashboard';
          this.router.navigate([redirect]);
          this.isLoading = false;
        },
        error => {
          this.isLoading = false;
          this.noRegister = "block";
          /* $('#ModalFail').modal('show'); */
          /* alert("usuario o contraseña es incorrecta"); */
          console.log("{message: 'Inicio de sesión fallido'}")
        });
  }
  get email() { return this.angForm.get('email'); }
  get password() { return this.angForm.get('password'); }

  closeModal() {
    this.noRegister = "none";
  }

  loading() {
    this.isLoading = true;
  }

}
