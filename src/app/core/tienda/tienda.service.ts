import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TiendaDTO } from '../../models/tienda/tienda.dto';

@Injectable({
  providedIn: 'root'
})
export class TiendaService {
  private apiUrl = 'https://localhost:7172/api/Tienda';

  constructor(private http: HttpClient) {}

  obtenerTiendaPorUsuario(idUsuario: number): Observable<TiendaDTO> {
    return this.http.get<TiendaDTO>(`${this.apiUrl}/PorUsuario/${idUsuario}`);
  }
}
