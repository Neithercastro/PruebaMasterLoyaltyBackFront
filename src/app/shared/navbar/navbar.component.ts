import { Component } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { Observable } from 'rxjs';
import { UsuarioModel } from '../../models/auth/usuario.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
   usuario$!: Observable<UsuarioModel | null>;

  constructor(private authService: AuthService) {
    this.usuario$ = this.authService.usuario$;
  }

  logout() {
    this.authService.logout();
  }
  
}
