import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import * as moment from "moment";
import Api from '../api';
import Token from '../../models/token';
import { PoPageLogin } from '@po-ui/ng-templates';
import { PoNotificationService } from '@po-ui/ng-components';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<Token>;
  public currentUser: Observable<Token>;

  constructor(private httpClient: HttpClient,
    private notificationService: PoNotificationService
    ) {
    this.currentUserSubject = new BehaviorSubject<Token>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Token {
    return this.currentUserSubject.value;
  }

  postToken({ login, password }: PoPageLogin): Observable<any> {
    const decodedPassword = decodeURIComponent(password);
    const apiUrl = `https://biviewer.com.br/site/api/apilogin.php?login=${encodeURIComponent(login)}&password=${encodeURIComponent(decodedPassword)}`; // PHP Feito pra testes de login, bem porco mesmo... Aproveite :)
  
    return this.httpClient.post<any>(apiUrl, {}).pipe(
      map(response => {
        if (response && response.acesso && response.acesso === "ok") {
          const manualToken: Token = {
            access_token: 'eyJhbGciOiAiSFMyNTYiLCAidHlwIjogIkpXVCJ9.eyAiZXhwIiA6IDE2OTY2MDA3NTEsICJtYWlsIiA6ICIiLCAicGFzc3dvcmQiIDogIiIgfQ.jiKfq3buX_cEL2Jl5FPf9nzcw6dpJKK_I6zUIU61hh8', // Isso aq vai expirar em breve, mas você já deve saber o que fazer pra mudar isso ...
            token_type: 'Bearer',
            username: login,
            refresh_token: 'refresh_token',
            operador: '',
            password: '',
          };
  
          localStorage.setItem('currentUser', JSON.stringify(manualToken));
          this.currentUserSubject.next(manualToken);
  
          return manualToken;
        } else {
          console.error('Erro na resposta do servidor:', response);
          throw new Error('Acesso negado');
        }
      }),
    );
  }

  deleteToken(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next({} as Token);
  }
}
