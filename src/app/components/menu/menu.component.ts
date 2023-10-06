import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { PoMenuItem } from '@po-ui/ng-components';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { LoadSpinnerService } from '../../services/load-spinner/load-spinner.service';
import { Location } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SignInComponent} from '../../pages/sign-in/sign-in.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  styles: [
    `
      .sample-menu-header-text-color {
        color: #FFFFFF;
      }
    `
  ]
})
export class MenuComponent implements OnInit {
  canSeeCreateUsersMenu: boolean = false;
  @ViewChild('menu', { static: true }) menu: ElementRef;

  
  menus: Array<PoMenuItem> = [
    { label: 'Dashboards', shortLabel: 'Dashboards',  icon: 'po-icon-home', link: './home' },

    {
      label: 'Empresas',
      shortLabel: 'Empresas',
      icon: 'po-icon po-icon-pallet-full',
      link: './pedidos'
    
  },

  




  ];

  isCollapsed: boolean = true;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private loadSpinnerService: LoadSpinnerService,
    private location: Location,
    private http: HttpClient,
    private authService: AuthenticationService // Inject HttpClient here
  ) {
  }

  async ngOnInit(): Promise<void> {

    //await this.updateBadgeValue();


  
  }    

  

  logout(): void  {
    this.loadSpinnerService.active(true, 'Saindo...');

    setTimeout(() => {
      this.authenticationService.deleteToken();
      this.router.navigate(['/log-in']);
      this.loadSpinnerService.active(false);
      window.location.reload();
    }, 1000);
  }

  getUserName(): string {
    return this.authenticationService.currentUserValue?.username || '';
  }

  ngAfterViewInit() {
    // Adicionando os ouvintes de eventos ao elemento do menu

   // setInterval(() => {
   //   this.updateBadgeValue();
    //}, 60000);
  }

// async updateBadgeValue(): Promise<void> {
//   try {
//     const apiUrl = 'http://10.139.250.241:8083/rest/api/com/purchaseorderapproval2/v1/purchaseorderlist';
// 
//     const httpParams = new HttpParams()
//       .set('cUser', this.getUserId()); // Adiciona o parâmetro cUser com o valor do UserID
// 
//     // Make the HTTP request with the specified parameters
//     const response = await this.http.get(apiUrl, { params: httpParams }).toPromise();
// 
//     // Assuming the API response is in the format shown in your example
//     const purchaseOrders = response['purchaseOrders'];
// 
//     // Update the badge value based on the number of records received from the API
//     const badgeValue = purchaseOrders.length > 0 ? purchaseOrders.length : -1;
// 
//     // Update the badge value for the submenu item
//     this.menus[1].subItems[0].badge.value = badgeValue;
//   } catch (error) {
//     // Handle the error
//   }
// }

  getUserId(): string {
    return localStorage.getItem('userId') || '';
  }
  

  
  

  onMenuMouseEnter(): void {
    this.isCollapsed = false;
  }

  onMenuMouseLeave(): void {
    this.isCollapsed = true;
  }
}