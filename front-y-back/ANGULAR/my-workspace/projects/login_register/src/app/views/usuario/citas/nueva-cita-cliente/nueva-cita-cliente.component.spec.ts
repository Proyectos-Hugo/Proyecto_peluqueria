import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaCitaClienteComponent } from './nueva-cita-cliente.component';

describe('NuevaCitaClienteComponent', () => {
  let component: NuevaCitaClienteComponent;
  let fixture: ComponentFixture<NuevaCitaClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevaCitaClienteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuevaCitaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
