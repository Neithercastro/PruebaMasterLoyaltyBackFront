export interface AgregarProductoCarritoDTO {
  idCliente: number;
  idArticulo: number;
  idTienda: number;
  producto: string;
  precio: number;
  cantidad: number;
}
