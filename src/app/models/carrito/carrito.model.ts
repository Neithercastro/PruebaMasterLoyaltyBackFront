import { CarritoDetalleDTO } from "./carrito-detalle.model";

export interface CarritoDTO {
  idCarritoCompras: number;
  idCliente: number;
  total: number;
  detalles: CarritoDetalleDTO[];
}
