import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { PoPageModule, PoTableModule, PoBreadcrumbModule, PoDynamicModule, PoLoadingModule } from '@po-ui/ng-components';
import { PoPageDynamicSearchModule, PoPageDynamicTableModule } from '@po-ui/ng-templates';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PoModule,
    PoTemplatesModule,
    PoPageDynamicSearchModule,
    PoPageDynamicTableModule,
    PoPageModule,
    PoTableModule,
    PoBreadcrumbModule,
    PoDynamicModule,
    PoLoadingModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    PoModule,
    PoTemplatesModule,
    PoPageDynamicSearchModule,
    PoPageDynamicTableModule,
    PoPageModule,
    PoTableModule,
    PoBreadcrumbModule,
    PoDynamicModule,
    PoLoadingModule,
  ]
})
export class SharedModule { }