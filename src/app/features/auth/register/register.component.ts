import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Route, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-register',
  imports: [RouterModule,CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  formCliente: FormGroup;
  formTienda: FormGroup;
  mensaje: string = '';
  tipo: 'success' | 'error' = 'success';


  constructor(private fb: FormBuilder, private authService: AuthService, private router : Router){
    this.formCliente = this.fb.group({
      usuario: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      direccion: ['', [Validators.required]]
    });

    this.formTienda = this.fb.group({
      usuario: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      sucursal: ['', [Validators.required]],
      direccion: ['', [Validators.required]]
    });
  }

  // Métodos para enviar cada uno más adelante
  onRegistrarCliente() {
    if (this.formCliente.valid) {
      const data = this.formCliente.value;
      // conectar con el backend
      this.authService.registerCliente(data).subscribe({
      next: (response) => {
        alert('Cliente registrado correctamente');
        this.formCliente.reset();
        this.router.navigate(['/Login']);

      },
      error: err => {
        
        console.error('Error al registrar cliente:\n', err);
        this.mostrarAlerta(err.error || 'Error inesperado al registrar cliente', 'error');

      }
    });

      //console.log('Registrando cliente:', data);
    }
  }

  onRegistrarTienda() {
    if (this.formTienda.valid) {
      const data = this.formTienda.value;

      this.authService.registerTienda(data).subscribe({
      next: (response) => {
        this.mostrarAlerta(response.mensaje, 'success');

        //console.log(response);
        this.formTienda.reset();
        this.router.navigate(['/Login']);

      },
      error: err => {
        console.log(data);
        console.error('Error al registrar tienda:\n', err);
        this.mostrarAlerta(err.error || 'Error inesperado al registrar tienda', 'error');

      }
    });

      // conectar con el backend
      //console.log('Registrando tienda:', data);
    }
  }

  mostrarAlerta(mensaje: string, tipo: 'success' | 'error') {
  this.mensaje = mensaje;
  this.tipo = tipo;

  setTimeout(() => this.cerrarAlerta(), 3000); // cierre automático
}

cerrarAlerta() {
  this.mensaje = '';
}





}
