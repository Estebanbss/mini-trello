import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './register.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterComponent {

  type = signal('password')

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
 }
