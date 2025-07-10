import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RouterModule,CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  formCliente: FormGroup;
  formTienda: FormGroup;

  constructor(private fb: FormBuilder){
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
      console.log('Registrando cliente:', data);
    }
  }

  onRegistrarTienda() {
    if (this.formTienda.valid) {
      const data = this.formTienda.value;
      // conectar con el backend
      console.log('Registrando tienda:', data);
    }
  }




}
