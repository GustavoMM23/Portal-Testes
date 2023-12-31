import { Component } from '@angular/core';

import { AuthenticationService } from './services/authentication/authentication.service';
import Token from './models/token'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'teste';
  currentUser?: Token;

  constructor(
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(data => this.currentUser = data);
  }
}
