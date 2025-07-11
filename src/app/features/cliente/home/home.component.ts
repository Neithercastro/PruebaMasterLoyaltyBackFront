import { Component, OnInit } from '@angular/core';
import { ProductCardComponent } from "../../../shared/product-card/product-card.component";
import { CommonModule } from '@angular/common';
import { ArticuloService } from '../../../core/producto/articulo.service';
import { TiendaDTO } from '../../../models/tienda/tienda.dto';
import { ArticuloDTO } from '../../../models/productos/articulo.dto';
import { AgregarProductoCarritoDTO } from '../../../models/carrito/agregar-producto-carrito.model';
import { AuthService } from '../../../core/auth/auth.service';
import { CarritoService } from '../../../core/carrito/carrito.service';
import { ClienteService } from '../../../core/cliente/cliente.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule,ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  paginaActual = 1;
  totalPaginas = 1;
  idTiendaSeleccionada: number | null = null;
  tiendas: TiendaDTO[] = [];
  productosFiltrados: ArticuloDTO[] = [];

  constructor(private articuloService: ArticuloService, private authService: AuthService, private carritoService: CarritoService , private clienteService: ClienteService){}

  ngOnInit(): void {
    this.articuloService.listarTiendas(this.paginaActual).subscribe({
  next: res => {
    this.tiendas = res.datos;
    this.totalPaginas = res.totalPaginas;
    this.cargarProductos();
    },
      error: err => console.error('Error al cargar tiendas:', err)
    });

    
  }

  cargarProductos(pagina: number = 1) {
    this.paginaActual = pagina;
    if (this.idTiendaSeleccionada) {
    this.articuloService.buscarPorTienda(this.idTiendaSeleccionada, pagina).subscribe({
      next: res => {
        this.productosFiltrados = res.datos;
        this.totalPaginas = res.totalPaginas;
      },
      error: err => console.error('Error al cargar productos por tienda', err)
    });
  } else {
    this.articuloService.buscarTodos(pagina).subscribe({
      next: res => {
        this.productosFiltrados = res.datos;
        this.totalPaginas = res.totalPaginas;
      },
      error: err => console.error('Error al cargar todos los productos', err)
    });
  }

  }

  onFiltrarPorTienda(event: Event) {
  const id = +(event.target as HTMLSelectElement).value;
  this.idTiendaSeleccionada = id || null;
  this.cargarProductos(1);
}

  cambiarPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.cargarProductos(pagina);
    }
  }

  agregados: Set<number> = new Set();

  agregarAlCarrito(event: { producto: ArticuloDTO; cantidad: number }) {
    const Usuario = this.authService.idUsuario;
    this.clienteService.obtenerClientePorUsuario(Usuario!).subscribe({
      next: (cliente) => {
        const idCliente = cliente.idCliente;
        if (!idCliente) return;

        const dto: AgregarProductoCarritoDTO = {
          idCliente,
          idArticulo: event.producto.idArticulo,
          idTienda: event.producto.idTienda,
          producto: event.producto.descripcion,
          precio: event.producto.precio,
          cantidad: event.cantidad
        };

        this.carritoService.agregarProducto(dto).subscribe({
          next: () => {
            console.log('Agregado al carrito correctamente');
            this.agregados.add(event.producto.idArticulo);

            // Quitar el estado luego de un tiempo (opcional)
            setTimeout(() => this.agregados.delete(event.producto.idArticulo), 3000);
          },
          error: err => console.error('Error al agregar al carrito', err)
        });
      },
      error: err => console.error('Error al agregar al carrito', err)
    });
  }



}

  



