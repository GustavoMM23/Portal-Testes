import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PedidosFormComponent } from './pedidos-form.component';

describe('PedidosFormComponent', () => {
  let component: PedidosFormComponent;
  let fixture: ComponentFixture<PedidosFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidosFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
