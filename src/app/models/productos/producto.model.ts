export interface ProductoModel {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagenUrl: string;
  tiendaId: number;
  tiendaNombre?: string;
}
