import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Token } from '@angular/compiler';



@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './auth.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AuthComponent {
  private authService = inject(AuthService);
  data: FormGroup;
  fb = inject(FormBuilder);
  loading = signal(false);
  router = inject(Router);
  type = signal('password')

  constructor(){
    this.data = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required, Validators.minLength(4)]].toString()
    });
  }

  toggleType() {
    let inputPwd = document.getElementById('password') as HTMLInputElement;
    if (inputPwd) {
      if (inputPwd.type === 'password') {
        inputPwd.type = 'text';
        this.type.set('text');
      } else {
        this.type.set('password');
        inputPwd.type = 'password';
      }
    } else {
      console.log('No se encontró el elemento con id "password"');
    }
  }

  submit(){
      this.loading.set(true);
      let token = this.authService.login(this.data.value)
      token.subscribe(
        (res:string) => {
          if (res === 'e') {
            this.loading.set(false);
            return;
          }
          const result = res[0];
          if(result[0]){
            console.log(result[0]);
          }
          console.log(result[1]);

          this.loading.set(false);

          console.log(token);


        },
        (err) => {
          this.loading.set(false);
          console.log(err);
        }
      )

  }

}
