import { Component, OnInit } from '@angular/core';
import { AgregarProductoCarritoDTO } from '../../../models/carrito/agregar-producto-carrito.model';
import { CarritoService } from '../../../core/carrito/carrito.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';
import { ClienteService } from '../../../core/cliente/cliente.service';
import { ActualizarCantidadCarritoDTO } from '../../../models/carrito/actualizar-cantidad-producto-carrito.model';
import { EliminarProductoCarritoDTO } from '../../../models/carrito/eliminar-producto-carrito.model';
import { CarritoDetalleDTO } from '../../../models/carrito/carrito-detalle.model';

@Component({
  selector: 'app-carrito',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css'
})
export class CarritoComponent implements OnInit {
  carrito: CarritoDetalleDTO[] = [];
  idCliente!: number;

  constructor(private carritoService: CarritoService, private authService: AuthService, private clienteService: ClienteService){}

  ngOnInit(): void {
    const idUsuario = this.authService.idUsuario;

    this.clienteService.obtenerClientePorUsuario(idUsuario!).subscribe({
      next: (cliente) => {
        this.idCliente = cliente.idCliente;

        this.carritoService.obtenerCarrito(this.idCliente).subscribe({
          next: (data) => {
            this.carrito = data.detalles;
            console.log('Carrito cargado:', this.carrito);
          },
          error: err => console.error('Error al obtener productos del carrito', err)
        });
      },
      error: (err) => {
        console.error('Error al obtener cliente', err);
      }
    });
  }

  aumentar(item: CarritoDetalleDTO): void {
    if (item.cantidad < item.stock) {
      item.cantidad++;

      const dto: ActualizarCantidadCarritoDTO = {
        idCarritoComprasDetalle: item.idCarritoComprasDetalle,
        nuevaCantidad: item.cantidad
      };

      this.carritoService.actualizarCantidad(dto).subscribe({
        next: () => console.log('Cantidad aumentada'),
        error: err => console.error('Error al aumentar cantidad', err)
      });
    }
  }

  disminuir(item: CarritoDetalleDTO): void {
    if (item.cantidad > 1) {
      item.cantidad--;

      const dto: ActualizarCantidadCarritoDTO = {
        idCarritoComprasDetalle: item.idCarritoComprasDetalle,
        nuevaCantidad: item.cantidad
      };

      this.carritoService.actualizarCantidad(dto).subscribe({
        next: () => console.log('Cantidad disminuida'),
        error: err => console.error('Error al disminuir cantidad', err)
      });
    }
  }

  eliminar(item: CarritoDetalleDTO): void {
    const dto: EliminarProductoCarritoDTO = {
      idCarritoComprasDetalle: item.idCarritoComprasDetalle
    };

    this.carritoService.eliminarProducto(dto).subscribe({
      next: () => {
        this.carrito = this.carrito.filter(p => p.idCarritoComprasDetalle !== item.idCarritoComprasDetalle);
        console.log('Producto eliminado');
      },
      error: err => console.error('Error al eliminar producto', err)
    });
  }

  pagar(): void {
    this.carritoService.finalizarCompra(this.idCliente).subscribe({
      next: () => {
        alert('Pago procesado correctamente');
        this.carrito = []; // Limpia el carrito local
      },
      error: err => console.error('Error al procesar pago', err)
    });
  }

  get total(): number {
    return this.carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  }

}
