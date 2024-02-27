import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Token } from '../../interfaces/user';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterComponent {
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private cookies = inject(CookieService);
  private router = inject(Router);
  loading = signal(false);
  type = signal('password')
  data: FormGroup;

  constructor(){
    this.data = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  toggleType() {
    let inputPwd = document.getElementById('password') as HTMLInputElement;
    let inputPwd2 = document.getElementById('passwordconfirm') as HTMLInputElement;
    if (inputPwd && inputPwd2) {
      if (inputPwd.type === 'password' && inputPwd2.type === 'password') {
        inputPwd.type = 'text';
        inputPwd2.type = 'text'
        this.type.set('text');
      } else {
        this.type.set('password');
        inputPwd.type = 'password';
        inputPwd2.type = 'password';
      }
    } else {
      console.log('No se encontró el elemento con id "password"');
    }
  }

  submit(){
      this.loading.set(true);
      let token = this.authService.login(this.data.value)

      token.subscribe(
            (res) => {
           this.loading.set(false);
           let token = res as unknown as Token;
           this.cookies.set('token', token.token)
           this.router.navigate(['']);
        },
        (err) => {
          this.loading.set(false);
          console.log(err);
        }
      )
  }
 }
