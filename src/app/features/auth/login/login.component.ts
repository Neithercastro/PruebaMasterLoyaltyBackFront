import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterModule, CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errorMsg: string | null = null;
  formLogin: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService){
    this.formLogin = this.fb.group({
      usuario: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onLogearse() {
    if (this.formLogin.valid) {
      const data = this.formLogin.value;
      // conectar con el backend
      this.authService.login(data).subscribe({
      next: () => {
        //alert('Cliente registrado correctamente');
        this.formLogin.reset();

      },
      error: err => {
        console.error('Error al iniciar sesion:\n', err);
        this.errorMsg = err.error || 'Error al iniciar sesión';
        setTimeout(() => this.errorMsg = null, 4000);

        //alert('Error al iniciar sesion');
      }
    });

      //console.log('Registrando cliente:', data);
    }
}

}
