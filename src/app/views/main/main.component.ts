import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent
  ],
  templateUrl: './main.component.html',
  styles: `

      `,

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MainComponent {

 }
