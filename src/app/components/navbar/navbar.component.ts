import { Component, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { PoDialogService, PoNotificationService, PoToolbarAction, PoToolbarProfile, PoModalModule, PoModalComponent } from '@po-ui/ng-components';
import { LoadSpinnerService } from 'src/app/services/load-spinner/load-spinner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  providers: [PoNotificationService]
})
export class NavbarComponent {
  notificationActions: Array<PoToolbarAction> = [

    { icon: 'po-icon-message', label: 'Teste', }
  ];

  profile: PoToolbarProfile = {
    avatar: 'https://icons-for-free.com/iconfiles/png/512/avatar+human+people+profile+user+icon-1320168139431219590.png',
    title: this.getUserName(),
  };

  getUserName(): string {
    return this.authenticationService.currentUserValue?.username || '';
  }

  
  profileActions: Array<PoToolbarAction> = [
    { icon: 'po-icon-settings', label: 'Configurações', action: item => this.openModal(item) },
    { icon: 'po-icon-exit', label: 'Sair', type: 'danger', separator: true, action: this.logout.bind(this) }
  ];

  logout(): void  {
    this.loadSpinnerService.active(true, 'Saindo...');

    setTimeout(() => {
      this.authenticationService.deleteToken();
      this.router.navigate(['/log-in']);
      this.loadSpinnerService.active(false);
      window.location.reload();
    }, 1000);
  }

  @ViewChild('Modal', { static: true }) Modal: PoModalComponent; 


  constructor(private poDialog: PoDialogService,
    private router: Router,
    private authenticationService: AuthenticationService,
     private poNotification: PoNotificationService,
     private loadSpinnerService: LoadSpinnerService,  
 ){}

  getNotificationNumber() {

  }

  onClickNotification(item: PoToolbarAction) {

  }

  public openModal(gestaonotas: any) {

    this.Modal.open();
  }

  showAction(item: PoToolbarAction): void {

  }
}