import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthResponseDTO } from '../../models/auth/auth-response.dto';

import { TiendaRegistroDTO } from '../../models/auth/tienda-registro.dto';
import { UsuarioModel } from '../../models/auth/usuario.model';
import { ClienteRegistroDTO } from '../../models/auth/cliente-registro.dto';



@Injectable({ providedIn: 'root' })
export class AuthService {
  private usuarioSubject = new BehaviorSubject<UsuarioModel | null>(null);
  usuario$ = this.usuarioSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.cargarUsuarioDesdeStorage();
  }

    login(data: { usuario: string; password: string }): Observable<AuthResponseDTO> {
    return this.http.post<AuthResponseDTO>('https://localhost:7172/api/Auth/login', data).pipe(
      tap(res => {
        const usuario: UsuarioModel = {
          id: res.id,
          usuario: res.usuario,
          tipo: res.tipoUsuario
        };

        this.usuarioSubject.next(usuario);
        localStorage.setItem('usuario', JSON.stringify(usuario));
        localStorage.setItem('token', res.token);

        const ruta = res.tipoUsuario === 'Cliente' ? '/home' : '/tienda/home';
        this.router.navigate([ruta]);
      })
    );
  }
    get usuarioActual(): UsuarioModel | null {
        return this.usuarioSubject.value;
    }

    get idUsuario(): number | null {
  return this.usuarioSubject.value?.id ?? null;
}


  registerCliente(data: ClienteRegistroDTO): Observable<any> {
    return this.http.post('https://localhost:7172/api/Cliente/registro', data);
  }

  registerTienda(data: TiendaRegistroDTO): Observable<any> {
    return this.http.post('https://localhost:7172/api/Tienda/registro', data);
  }

  logout(): void {
    this.usuarioSubject.next(null);
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  cargarUsuarioDesdeStorage(): void {
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      this.usuarioSubject.next(JSON.parse(usuario));
    }
  }

  
}