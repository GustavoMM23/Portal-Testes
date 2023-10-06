import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidosFormComponent } from './pedidos-form/pedidos-form.component';
import { PedidosListComponent } from './pedidos-list/pedidos-list.component';

const routes: Routes = [
  { path: '', component: PedidosListComponent },
  { path: 'new', component: PedidosFormComponent },
  { path: 'edit/:id', component: PedidosFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
