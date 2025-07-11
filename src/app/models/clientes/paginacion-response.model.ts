import { VentaDTO } from "./compras.models";


export interface PaginacionResponseVenta {
  datos: VentaDTO[];
  totalRegistros: number;
  paginaActual: number;
  totalPaginas: number;
}