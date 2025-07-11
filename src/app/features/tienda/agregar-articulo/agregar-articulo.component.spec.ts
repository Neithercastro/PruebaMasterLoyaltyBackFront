import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarArticuloComponent } from './agregar-articulo.component';

describe('AgregarArticuloComponent', () => {
  let component: AgregarArticuloComponent;
  let fixture: ComponentFixture<AgregarArticuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarArticuloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
