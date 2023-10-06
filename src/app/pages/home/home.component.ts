import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PoBreadcrumb, PoChartOptions, PoChartSerie, PoChartType, PoDialogService, PoModalComponent, PoTableColumn } from '@po-ui/ng-components';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient,
    private poAlert: PoDialogService
    ) {
  }

  ngOnInit(): void {
  }

  public readonly itemsAccountDetails: Array<any> = [
    { dateUpdate: '03-05-2018', statement: '-56.45' },
    { dateUpdate: '02-05-2018', statement: '-14.99' },
    { dateUpdate: '02-05-2018', statement: '-657.56' },
    { dateUpdate: '12-05-2017', statement: '3547.29' }
  ];

  public readonly itemsSavingsDetails: Array<any> = [
    { dateUpdate: '03-05-2018', statement: '-300' },
    { dateUpdate: '03-05-2018', statement: '2000' },
    { dateUpdate: '02-05-2018', statement: '1500' },
    { dateUpdate: '02-05-2018', statement: '-200' },
    { dateUpdate: '12-05-2017', statement: '2000' }
  ];

  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: './home' }]
  };

  participationByCountryInWorldExportsType: PoChartType = PoChartType.Line;

  categories: Array<string> = ['2010', '2011', '2012', '2013', '2014', '2015'];

  categoriesColumn: Array<string> = ['Consumo', 'Gastos', 'Excluido'];

 participationByCountryInWorldExports: Array<PoChartSerie> = [
    { label: 'Alterações Notas', data: [35, 32, 25, 29, 33, 33], color: 'color-10' },
    { label: 'Alterações Pedidos', data: [15, 17, 23, 19, 22, 18] },
    { label: 'Alterações Fornecedores', data: [8, 7, 6, 9, 10, 11] },
    { label: 'Alterações Conta Contabil', data: [5, 6, 5, 4, 5, 5] },
    { label: 'Alterações Admin', data: [7, 6, 10, 10, 4, 6] }
  ];

  evolutionOfCoffeeAndSomeCompetitors: Array<PoChartSerie> = [
    { label: '2014', data: [91, 40, 42], type: PoChartType.Column },
    { label: '2017', data: [93, 52, 18], type: PoChartType.Column },
    { label: '2020', data: [95, 21, -17], type: PoChartType.Column },
    { label: '2023', data: [34, 27, 79], type: PoChartType.Line, color: 'color-10' }
  ];

  options: PoChartOptions = {
    axis: {
      minRange: 0,
      maxRange: 40,
      gridLines: 5
    }
  };

  optionsColumn: PoChartOptions = {
    axis: {
      minRange: -20,
      maxRange: 100,
      gridLines: 7
    }
  };
  
}
