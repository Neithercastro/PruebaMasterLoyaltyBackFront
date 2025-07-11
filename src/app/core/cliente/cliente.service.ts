import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClienteDTO } from '../../models/clientes/cliente.dto';
import { PaginacionResponseVenta } from '../../models/clientes/paginacion-response.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'https://localhost:7172/api/Cliente';

  constructor(private http: HttpClient) {}

  obtenerClientePorUsuario(idUsuario: number): Observable<ClienteDTO> {
    return this.http.get<ClienteDTO>(`${this.apiUrl}/PorUsuario/${idUsuario}`);
  }

  obtenerHistorial(idCliente: number, pagina: number): Observable<PaginacionResponseVenta> {
  return this.http.get<PaginacionResponseVenta>(`https://localhost:7172/api/Ventas/historial/${idCliente}?pagina=${pagina}`);
}

}
