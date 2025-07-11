import { Component, OnInit } from '@angular/core';
import { VentaDTO } from '../../../models/clientes/compras.models';
import { ClienteService } from '../../../core/cliente/cliente.service';
import { AuthService } from '../../../core/auth/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-historial',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.css'
})
export class HistorialComponent implements OnInit {
  historial: VentaDTO[] = [];
  paginaActual = 1;
  totalPaginas = 1;
  idCliente!: number;

  constructor(private clienteService: ClienteService, private authService: AuthService) {}

  ngOnInit(): void {
    const idUsuario = this.authService.idUsuario;

    this.clienteService.obtenerClientePorUsuario(idUsuario!).subscribe({
      next: cliente => {
        this.idCliente = cliente.idCliente;
        this.cargarHistorial();
      }
    });
  }

  cargarHistorial(): void {
    this.clienteService.obtenerHistorial(this.idCliente, this.paginaActual).subscribe({
      next: res => {
        this.historial = res.datos;
        this.totalPaginas = res.totalPaginas;
      }
    });
  }

  cambiarPagina(pagina: number): void {
    this.paginaActual = pagina;
    this.cargarHistorial();
  }
}

