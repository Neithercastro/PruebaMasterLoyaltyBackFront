import { VentaDetalleDTO } from "./compras-detalle.model";



export interface VentaDTO {
  idVenta: number;
  fechaVenta: string;
  total: number;
  detalles: VentaDetalleDTO[];
}