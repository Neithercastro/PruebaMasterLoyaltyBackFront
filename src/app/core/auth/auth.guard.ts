import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const usuario = this.authService.usuarioActual;

    if (!usuario) {
      this.router.navigate(['/login']);
      return false;
    }

    const tipoRuta = route.data['tipo']; // 'cliente' o 'tienda'
    if (tipoRuta && usuario.tipo !== tipoRuta) {
      const rutaCorrecta = usuario.tipo === 'Cliente' ? '/home' : '/tienda/home';
      this.router.navigate([rutaCorrecta]);
      return false;
    }

    return true;
  }
}
