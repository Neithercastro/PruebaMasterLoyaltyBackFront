export interface AuthResponseDTO {
  id: number;
  usuario: string;
  tipoUsuario: 'Cliente' | 'Tienda';
  token: string;
}

