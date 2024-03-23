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
      Email: ['', [Validators.required, Validators.email]],
      Pwd: ['', [Validators.required, Validators.minLength(4)]],
      PwdConfirm: ['', Validators.required],
      Atype: ['User'],
      Photo: [''], // Nuevo campo para la confirmación de la contraseña



    }, { validators: this.passwordMatchValidator }); // Agrega validadores personalizados

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
      const data = {
        Username: this.data.value.Email.split('@')[0],
        Email: this.data.value.Email,
        Pwd: this.data.value.Pwd,
        Atype: this.data.value.Atype,
        Photo: null
      }

      this.authService.register(data).subscribe((res: any) => {
        console.log(res);
        alert('Usuario registrado correctamente');
        this.router.navigate(['/login']);
      })
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const pwd = formGroup.get('Pwd');
    const pwdConfirm = formGroup.get('PwdConfirm');

    if (pwd && pwdConfirm && pwd.value !== pwdConfirm.value) {
      pwdConfirm.setErrors({ mismatch: true });
    } else {
      pwdConfirm!.setErrors(null);
    }
  }

 }
