  import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
  import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
  import { Router } from '@angular/router';
  import { PoBreadcrumb, PoComboOption, PoTableDetail, PoTagType} from '@po-ui/ng-components';
  import { Subscription } from 'rxjs';
  import {
   PoDisclaimer, PoDisclaimerGroup,
    PoModalComponent, PoModalAction, PoNotificationService, PoPageFilter, PoPageAction,
    PoTableAction, PoTableColumn, PoTableComponent, PoDialogService
  } from '@po-ui/ng-components';
  
  import { environment } from 'src/environments/environment';
  import { CurrencyPipe, DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';

  @Component({
    selector: 'app-pedidos-list',
    templateUrl: './pedidos-list.component.html',
    styleUrls: ['./pedidos-list.component.css'],
  })
  export class PedidosListComponent implements OnInit, OnDestroy {

    private pedidosSub: Subscription;
    private page: number = 1;
    private searchTerm: string = '';
    private searchFilters: any;
    private loadingTimeout = 1000;
    detail: any;
    totalExpanded = 0;

    public readonly advancedFilterPrimaryAction: PoModalAction = {
      action: this.onConfirmAdvancedFilter.bind(this),
      label: 'Pesquisar'
    };

    public readonly advancedFilterSecondaryAction: PoModalAction = {
      action: () => this.advancedFilter.close(),
      label: 'Cancelar'
    };

    public readonly actions: Array<PoPageAction> = [
    
      { action: this.onNewCustomer.bind(this), label: 'Cadastrar', icon: 'po-icon-user-add' },
      { label: 'Exportar' }, // Isso aqui nem faz nada
      { action: this.loadData.bind(this), label: 'Atualizar Lista' }, // Não testei, mas deve funcionar 
    ];
    public email: string;
    
    public columns: PoTableColumn[] = [
      { property: "nome_razao_social", type: "string", label: "Razão Social " },
      { property: "nome_fantasia", type: "string", label: "Nome Fantasia" },
      { property: "cnpj", type: "string", label: "CNPJ" },
      { property: "inscricao_municipal", type: "string", label: "Inscrição Municipal", visible: false },
      { property: "fone", type: "string", label: "Fone" },
      { property: "email", type: "string", label: "E-Mail" },
      { property: "logradouro", type: "string", label: "Logradouro" },
      { property: "numero", type: "string", label: "Número" },
      { property: "complemento", type: "string", label: "Complemento" },
      { property: "bairro", type: "string", label: "Bairro" },
      { property: "codigo_municipio", type: "string", label: "Código Municipio" },    
      { property: "client_id", type: "string", label: "ID Cliente" },
      { property: "client_secret", type: "string", label: "Chave Cliente" },
    ];
    
    public columnsservicos: PoTableColumn[] = [
      { property: "nome", type: "string", label: "Nome" },
      { property: "descricao", type: "string", label: "Descrição" },
      { property: "CNPJEmissor", type: "string", label: "CNPJ Emissor" },
      { property: "CTribNac", type: "string", label: "CTribNac" },
      { property: "CTribMun", type: "string", label: "CTribMun" },
    ];

    public columnsclientes: PoTableColumn[] = [
      { property: "cnpj", type: "string", label: "CNPJ" },
      { property: "cnpjEmissor", type: "string", label: "CNPJ Emissor" },
      { property: "cMun", type: "string", label: "cMun" },
      { property: "CEP", type: "string", label: "CEP" },
      { property: "logradouro", type: "string", label: "Logradouro" },
      { property: "numero", type: "string", label: "Número" },
      { property: "bairro", type: "string", label: "Bairro" },
      { property: "nome", type: "string", label: "Nome" },
      { property: "fone", type: "string", label: "Fone" },
      { property: "email", type: "string", label: "E-Mail" },
      { property: "cidade", type: "string", label: "Cidade" },
      { property: "estado", type: "string", label: "Estado" },
      { property: "pais", type: "string", label: "País" },

    ];
    public readonly disclaimerGroup: PoDisclaimerGroup = {
      change: this.onChangeDisclaimerGroup.bind(this),
      disclaimers: [],
      title: 'Filtros aplicados em nossa pesquisa'
    };

    public readonly filter: PoPageFilter = {
      action: this.onActionSearch.bind(this),
      placeholder: 'Pesquisa rápida ...'
    };
        
    public fornecedorOptions: Array<PoComboOption> = []; 

    public readonly tableActions: Array<PoTableAction> = [
      { action: (pedidos) => this.openVisualizarModal(pedidos), label: 'Visualizar' },

      { action: (pedidos) => this.openEditModal(pedidos), label: 'Editar Cadastro' },

    ];

    public readonly tableActions2: Array<PoTableAction> = [
      { action: (pedidos) => this.openEditModal(pedidos), label: 'Editar' },
      { action: (pedidos) => this.openEditModal(pedidos), label: 'Loren' },
    ];
    
    public nome_razao_social: string;
    public pedidos: Array<any> = [];
    public pedidos2: Array<any> = [];
    public pedidos3: Array<any> = [];
    public hasNext: boolean = false;
    public loading: boolean = true;
    public status: Array<string> = [];

    @ViewChild('advancedFilter', { static: true }) advancedFilter: PoModalComponent;
    @ViewChild('table', { static: true }) table: PoTableComponent;
    @ViewChild('advancedEdit', { static: true }) advancedEdit: PoModalComponent; 
    @ViewChild('visualizarModal', { static: true }) visualizarModal: PoModalComponent; 
    @ViewChild('selectedHero', { static: true }) selectedHero: PoModalComponent;
    
    constructor(
      private httpClient: HttpClient,
      private router: Router,
    ) {}

    ngOnInit() {
      this.loadData();

      this.loadDataServicos();

      this.loadDataClientes();
          
      setTimeout(() => {
        this.loading = false;
      }, this.loadingTimeout);
    }

    ngOnDestroy() {
    }

    openAdvancedFilter() {
      this.advancedFilter.open();
    }
 
    public openEditModal(pedidos: any) {

      this.advancedEdit.open();
    }

    public openVisualizarModal(pedidos: any) {
      this.nome_razao_social = pedidos.nome_razao_social;

      this.visualizarModal.open();
    }

    closeAdvancedEditModal() {
      this.advancedEdit.close();
    }

    private loadData(params: { page?: number; search?: string; } = {}) {
      const apiUrl = 'https://notasfiscais.conceitho.com/empresas';
    
      const httpParams = new HttpParams({
        fromObject: {
          ...params, 
        }
      });
    
      this.pedidosSub = this.httpClient.get(apiUrl, { params: httpParams }).subscribe(
        (response: Array<any>) => {
          this.pedidos = !params.page || params.page === 1
            ? response.map(item => ({
                ...item,
              }))
            : [...this.pedidos, ...response.map(item => ({
                ...item,
              }))];
        },
        error => {
          console.error('Erro:', error);
          this.loading = false;
        }
      );
    }

    private loadDataServicos(params: { page?: number; search?: string; } = {}) {
      const apiUrl = 'https://notasfiscais.conceitho.com/servicos';
    
      const httpParams = new HttpParams({
        fromObject: {
          ...params, 
        }
      });
    
      this.pedidosSub = this.httpClient.get(apiUrl, { params: httpParams }).subscribe(
        (response: Array<any>) => {
          this.pedidos2 = !params.page || params.page === 1
            ? response.map(item => ({
                ...item,
              }))
            : [...this.pedidos2, ...response.map(item => ({
                ...item,
              }))];
        },
        error => {
          console.error('Erro:', error);
          this.loading = false;
        }
      );
    }

    private loadDataClientes(params: { page?: number; search?: string; cInitDate?: string; cEndDate?: string; } = {}) {
      const apiUrl = 'https://notasfiscais.conceitho.com/clientes';
    
      const httpParams = new HttpParams({
        fromObject: {
          ...params, 
        }
      });
    
      this.pedidosSub = this.httpClient.get(apiUrl, { params: httpParams }).subscribe(
        (response: Array<any>) => { 
          this.pedidos3 = !params.page || params.page === 1
            ? response.map(item => ({
                ...item,
              }))
            : [...this.pedidos3, ...response.map(item => ({
                ...item,
              }))];
        },
        error => {
          console.error('Erro:', error);
          this.loading = false;
        }
      );
    }
    
    private onNewCustomer() {
      this.router.navigateByUrl('/pedidos/new');
    }

    private onActionSearch(searchTerm) {
      this.searchTerm = searchTerm;

      this.disclaimerGroup.disclaimers = [
        {
          label: `Pesquisa rápida: ${this.searchTerm}`,
          property: 'search',
          value: this.searchTerm,
        },
      ];

      this.loadData({ search: this.searchTerm });
    }

   public readonly breadcrumb: PoBreadcrumb = {
      items: [{ label: 'Home' },]
    };
    
    private onChangeDisclaimerGroup(disclaimers: Array<PoDisclaimer>) {
      
    }

    private onConfirmAdvancedFilter() {

    }

    showMore(event) {
      let params: any = {
        page: ++this.page,
      };
    
      if (event) {
        params.order = `${event.type === 'ascending' ? '' : '-'}${event.column.property}`;
      }
    
      if (this.searchTerm) {
        params.search = this.searchTerm;
      } else {
        params = { ...params, ...this.searchFilters };
      }

    }
    
    sortBy(event) {
      let params: any = {};
    
      this.page = 1;
    
      if (event) {
        params.order = `${event.type === 'ascending' ? '' : '-'}${event.column.property}`;
      }
      if (this.searchTerm) {
        params.search = this.searchTerm;
      } else {
        params = { ...params, ...this.searchFilters };
      }
    }
  }
