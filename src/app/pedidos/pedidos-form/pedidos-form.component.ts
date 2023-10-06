import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { PoModalComponent, PoNotificationService, PoSelectOption, PoTableColumn } from '@po-ui/ng-components';

import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';

const actionInsert = 'insert';
const actionUpdate = 'update';

@Component({
  selector: 'app-pedidos-form',
  templateUrl: './pedidos-form.component.html'
})
export class PedidosFormComponent implements OnDestroy, OnInit {

  @ViewChild('modal') modal: PoModalComponent;

  private readonly url: string = environment.apiUrl + '';
  private action: string = actionInsert;
  private pedidosSub: Subscription;
  private paramsSub: Subscription;
  public pedidos: string;
  public state: string = '';

  constructor(
    private poNotification: PoNotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient) { }

    public columns: PoTableColumn[] = [
      { property: 'id', type: 'string', label: 'Id', },
      { property: 'code', type: 'string', label: 'Código do Produto', },
    
    ];

  ngOnDestroy() {

  }

  ngOnInit() {
    this.paramsSub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.loadData(params['id']);
        this.action = actionUpdate;
      }
    });
  }

  cancel() {
    this.router.navigateByUrl('/pedidos');
  }

  get isUpdateOperation() {
    return this.action === actionUpdate;
  }

  get title() {
    return this.isUpdateOperation ? 'Atualizando Empresa' : 'Nova Empresa';
  }

  private loadData(id) {
    this.pedidosSub = this.httpClient.get(`${this.url}/${id}`)
      .pipe(
        map((pedidos: any) => {
          this.state = pedidos.uf;

          return pedidos;
        })
      )
      .subscribe(response => this.pedidos = response);
  }

  newProduct: { id: string, code: string } = { id: '', code: '' };
  addedProducts: { id: string, code: string }[] = [];

  addProduct(form: NgForm) {
    if (form.valid) {
      this.addedProducts.push({ ...this.newProduct });
      this.newProduct = { id: '', code: '' };
      form.resetForm();
      this.modal.close();
    }
  }

  


}
