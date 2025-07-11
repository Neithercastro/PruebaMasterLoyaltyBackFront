import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ArticuloService } from '../../../core/producto/articulo.service';
import { AuthService } from '../../../core/auth/auth.service';
import { CommonModule } from '@angular/common';
import { TiendaService } from '../../../core/tienda/tienda.service';

@Component({
  selector: 'app-editar-articulo',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './editar-articulo.component.html',
  styleUrl: './editar-articulo.component.css'
})
export class EditarArticuloComponent implements OnInit{
  articulos: any[] = [];
  formularios: { [id: number]: FormGroup } = {};
  imagenesSeleccionadas: { [id: number]: File | null } = {};
  paginaActual = 1;
  totalPaginas = 1;



  constructor(private articuloService: ArticuloService, private authService: AuthService, private fb: FormBuilder, private tiendaService: TiendaService) {}

  cargarArticulos(pagina: number = 1): void {
    const Usuario = this.authService.idUsuario;
      this.tiendaService.obtenerTiendaPorUsuario(Usuario!).subscribe({
      next: tienda => {
        const idTienda = tienda.idTienda;
        if (!idTienda) return;

        this.articuloService.obtenerArticulosPorTienda(idTienda, pagina).subscribe({
          next: res => {
            this.articulos = res.datos;
            this.paginaActual = res.paginaActual;
            this.totalPaginas = res.totalPaginas;

            this.formularios = {};
            this.imagenesSeleccionadas = {};

            //console.log('Informacion:\n', this.articulos);
            this.articulos.forEach(art => {
              this.formularios[art.idArticulo] = this.fb.group({
                descripcion: [art.descripcion],
                precio: [art.precio],
                stock: [art.stock],
                estado: [art.estado ? true : false]

                
              });
            });
          },
          error: err => console.error('Error al cargar artículos:', err)
        });
      },
      error: err => console.error('No se encontró tienda para este usuario', err)
    });
      
  }
  ngOnInit(): void {
    this.cargarArticulos();
  }

  cambiarPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.cargarArticulos(pagina);
    }
  }

  onImagenSeleccionada(event: Event, id: number) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.imagenesSeleccionadas[id] = file;
    }
  }

  guardarCambios(idArticulo: number) {
    const form = this.formularios[idArticulo];
   
    if (!form) return;

    const formData = new FormData();
    formData.append('IdArticulo', idArticulo.toString());
    formData.append('Descripcion', form.value.descripcion.toString());
    formData.append('Precio', form.value.precio);
    formData.append('Stock', form.value.stock);
    formData.append('Estado', form.value.estado.toString());

    const imagen = this.imagenesSeleccionadas[idArticulo];
    if (imagen) {
      formData.append('Imagen', imagen);
    }

    this.articuloService.editarArticulo(formData).subscribe({
      next: () => {
        //alert('Artículo actualizado correctamente')
        // Actualiza los datos en memoria
        const form = this.formularios[idArticulo];
        const articulo = this.articulos.find(a => a.idArticulo === idArticulo);
        if (articulo && form) {
          articulo.descripcion = form.value.descripcion;
          articulo.precio = form.value.precio;
          articulo.stock = form.value.stock;
          articulo.estado = form.value.estado;

          // Si se cambió la imagen, puedes volver a cargar la lista o actualizar solo la imagen
          if (this.imagenesSeleccionadas[idArticulo]) {
            this.cargarArticulos(this.paginaActual); // 👈 si prefieres recargar solo los datos
          }
        }

        // Limpia la imagen seleccionada
        this.imagenesSeleccionadas[idArticulo] = null;
      }
      ,
      error: err => alert('Error al actualizar artículo')
    });
  }


}
