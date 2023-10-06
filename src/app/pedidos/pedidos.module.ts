import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';

import { PedidosRoutingModule } from './pedidos-routing.module';
import { PedidosFormComponent } from './pedidos-form/pedidos-form.component';
import { PedidosListComponent } from './pedidos-list/pedidos-list.component';

@NgModule({
  declarations: [
    PedidosFormComponent,
    PedidosListComponent,
  ],
  imports: [
    SharedModule,

    PedidosRoutingModule
  ]
})
export class PedidosModule { }
