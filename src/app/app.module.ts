import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PoModule, PoLoadingModule, PoNavbarModule, PoMenuModule } from '@po-ui/ng-components';
import { PagesModule } from './pages/pages.module';
import { PoPageDynamicSearchModule, PoTemplatesModule } from '@po-ui/ng-templates';
import { ErrorInterceptor } from './interceptors/error/error.interceptor';
import { TokenInterceptor } from './interceptors/token/token.interceptor';
import { AuthenticationService } from '../app/services/authentication/authentication.service';
import { LoadSpinnerService } from './services/load-spinner/load-spinner.service';
import { SharedModule } from './shared/shared.module';
import { LoadSpinnerComponent } from './components/load-spinner/load-spinner.component';
import { MenuComponent } from '../app/components/menu/menu.component';
import { AppComponent } from './app.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProtheusInterceptor } from './shared/interceptos/protheus.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavbarComponent } from '../app/components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadSpinnerComponent,
    MenuComponent,
    NavbarComponent,
    NotificationComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    SharedModule,
    PagesModule,
    PoLoadingModule,
    PoNavbarModule,
    PoMenuModule,
    PoModule,
    PoTemplatesModule,
    PoPageDynamicSearchModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: ProtheusInterceptor, multi: true },
    AuthenticationService,
    LoadSpinnerService,
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
