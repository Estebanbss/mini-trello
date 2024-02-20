import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './auth.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AuthComponent {

  type = signal('password')

  toggleType() {
    console.log(this.type())
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
