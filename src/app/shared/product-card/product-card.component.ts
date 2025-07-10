import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductoModel } from '../../models/productos/producto.model';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
@Input() producto!: ProductoModel;
@Output() agregar = new EventEmitter<void>();
}
