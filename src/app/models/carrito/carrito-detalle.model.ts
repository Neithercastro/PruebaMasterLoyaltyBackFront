export interface CarritoDetalleDTO {
  idCarritoComprasDetalle: number;
  idArticulo: number;
  producto: string;
  precio: number;
  cantidad: number;
  subtotal: number;
  imagen: string;
  stock: number; // 👈 asegúrate de que el backend incluya esto
}