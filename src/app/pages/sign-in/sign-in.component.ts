import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PoDialogService, PoLanguage, PoModalComponent } from '@po-ui/ng-components';
import { PoPageLogin, PoPageLoginLiterals } from '@po-ui/ng-templates';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { LoadSpinnerService } from 'src/app/services/load-spinner/load-spinner.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  @ViewChild('advancedModal', { static: true }) advancedModal: PoModalComponent;

  returnUrl: string = '';

  languages: Array<PoLanguage> = [
    { language: 'pt', description: 'Português' },
  ];
  
  constructor(
    private authenticationService: AuthenticationService,
    private loadSpinnerService: LoadSpinnerService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    if (this.authenticationService.currentUserValue.access_token &&
      this.authenticationService) {
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
  }
  
  public customLiterals: PoPageLoginLiterals = {
    forgotPassword: 'Versão Do Sistema: 1.0',
    forgotYourPassword: 'Versão Do Sistema: 1.0',
    highlightInfo: '',
    iForgotMyPassword: 'Esqueci minha senha',
    ifYouTryHarder: 'Se tentar mais... ',
    loginErrorPattern: 'Login obrigatório',
    loginHint: '',
    loginLabel: 'Insira seu usuário',
    loginPlaceholder: 'Insira seu usuário de acesso',
    passwordErrorPattern: 'Senha obrigatória',
    passwordLabel: 'Insira sua senha',
    passwordPlaceholder: 'Insira sua senha de acesso',
    customFieldErrorPattern: 'Campo customizado inválido',
    customFieldPlaceholder: 'Por favor insira um valor',
    registerUrl: 'Novo registro',
    rememberUser: 'Lembrar usuário',
    rememberUserHint: '',
    submitLabel: 'Acessar sistema',
  };



  signIn(credentials: PoPageLogin): void {
    if (credentials.login && credentials.password) {
      this.loadSpinnerService.active(true, 'Entrando...');
  
      this.authenticationService
        .postToken(credentials)
        .pipe(first())
        .subscribe(
          (data) => {
            this.loadSpinnerService.active(false);
            this.router.navigate([this.returnUrl]);
            window.location.reload();
          },
          (error) => {
            console.error(error); 
            this.loadSpinnerService.active(false);
          }
        );
    }
  }
}  