export interface PaginacionResponse<T> {
  datos: T[];
  totalRegistros: number;
  paginaActual: number;
  totalPaginas: number;
}
