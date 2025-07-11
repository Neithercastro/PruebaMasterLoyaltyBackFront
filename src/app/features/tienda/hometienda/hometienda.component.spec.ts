import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HometiendaComponent } from './hometienda.component';

describe('HometiendaComponent', () => {
  let component: HometiendaComponent;
  let fixture: ComponentFixture<HometiendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HometiendaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HometiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
