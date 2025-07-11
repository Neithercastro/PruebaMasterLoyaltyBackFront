import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArticuloService } from '../../../core/producto/articulo.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/auth/auth.service';
import { TiendaService } from '../../../core/tienda/tienda.service';

@Component({
  selector: 'app-agregar-articulo',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './agregar-articulo.component.html',
  styleUrl: './agregar-articulo.component.css'
})
export class AgregarArticuloComponent {
  formArticulo: FormGroup;
  imagenSeleccionada: File | null = null;
  User: number | undefined;

  constructor(private fb: FormBuilder, private articuloService: ArticuloService, private authService: AuthService, private tiendaService: TiendaService) {
    this.formArticulo = this.fb.group({
      codigo: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [null, [Validators.required, Validators.min(0)]],
      stock: [null, [Validators.required, Validators.min(0)]],
      estado: ['Activo', Validators.required],
      imagen: [null]
    });
  }

  onImagenSeleccionada(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.imagenSeleccionada = file;
    }
  }

  onSubmit() {
    
    const Usuario = this.authService.idUsuario;
    this.tiendaService.obtenerTiendaPorUsuario(Usuario!).subscribe({
    next: tienda => {
      const idTienda = tienda.idTienda;
      if (this.formArticulo.invalid) return;

      const formData = new FormData();
      formData.append('IdTienda', idTienda.toString());
      formData.append('Codigo', this.formArticulo.value.codigo);
      formData.append('Descripcion', this.formArticulo.value.descripcion);
      formData.append('Precio', this.formArticulo.value.precio.toString());
      formData.append('Stock', this.formArticulo.value.stock.toString());
      formData.append('Estado', this.formArticulo.value.estado.toString());

      if (this.imagenSeleccionada) {
        formData.append('Imagen', this.imagenSeleccionada);
      }

      //SE ENVIA EL FORMDATA AL BACK
      this.articuloService.agregarArticulo(formData).subscribe({
        next: () => {
          alert('Artículo agregado correctamente');
          this.formArticulo.reset();
          this.imagenSeleccionada = null;
        },
        error: err => {
          console.error('Error al agregar artículo:', err);
          alert('Error al agregar artículo');
        }
      });
    },
    error: err => console.error('No se encontró tienda para este usuario', err)
    });
    
  }
}

