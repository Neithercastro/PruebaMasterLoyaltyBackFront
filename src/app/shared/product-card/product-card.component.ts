import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductoModel } from '../../models/productos/producto.model';
import { ArticuloDTO } from '../../models/productos/articulo.dto';
import { FormControl, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AgregarProductoCarritoDTO } from '../../models/carrito/agregar-producto-carrito.model';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
@Input() producto!: ArticuloDTO;
@Input() agregado: boolean = false;
@Output() agregar = new EventEmitter<{ producto: ArticuloDTO; cantidad: number }>();




  cantidadControl!: FormControl;

  ngOnInit(): void {
    this.cantidadControl = new FormControl(1, [
      Validators.required,
      Validators.min(1),
      Validators.max(this.producto.stock)
    ]);
  }

  agregarAlCarrito(): void {
    if (this.cantidadControl.valid) {
      this.agregar.emit({
        producto: this.producto,
        cantidad: this.cantidadControl.value
      });
    }
  }


}
