import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener, inject, signal } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { MainService } from '../../services/main.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './main.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MainComponent {
  private mainService = inject(MainService);
  private cookies = inject(CookieService);
  private fb = inject(FormBuilder);
  user:any
  button = signal('Home');
  loading = signal(false);
  buttonCreateBoard = signal(false);
  buttonCreateBoard2 = signal(false);
  boards:any = []
  accountId:any
  name: FormGroup;

  constructor() {
  if (localStorage.getItem('user') === null) {
    this.getUserData()
  }else{
     this.user = JSON.parse(localStorage.getItem('user') || '{}');
     this.cookies.set('user.id',this.user.id)

  }

  this.name = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
  });

  this.getBoards()

  }

  getBoards(){
    this.mainService.getBoards().then((res) => {
      res.subscribe((data) => {
        this.boards = data;
      })
    })
  }

  createBoard(name:string, accountId:number){
    const data = {
      name: name,
      accountId: accountId
    }
    console.log(data)
    let board = this.mainService.createBoard(data)
    board.then((res) => {
      res.subscribe((data) => {
        console.log(data)
        this.loading.set(false);
        this.buttonCreateBoard.set(false);
        this.buttonCreateBoard2.set(false);
        this.getBoards()
      } )
    } )
  }

  getUserData(){
    const user = this.mainService.getUserData()
    user.then((res) => {
      res.subscribe((data) => {
        localStorage.setItem('user', JSON.stringify(data));
          this.user = data;

      } )
    } )
  }

  submit(){
    console.log(this.name.value.name)
    console.log(this.user.id)
    this.loading.set(true);
    this.createBoard(this.name.value.name, this.user.id)

    this.getUserData()
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const Button = document.getElementById('ButtonC');
    const Button2 = document.getElementById('ButtonD');
    const Content = document.getElementById('ContentC');
    const Content2 = document.getElementById('ContentD');

    if (!Button?.contains(event.target as Node) && !Button2?.contains(event.target as Node) && !Content?.contains(event.target as Node) && !Content2?.contains(event.target as Node)){
      console.log('click outside');
      this.buttonCreateBoard.set(false);
      this.buttonCreateBoard2.set(false);
        }
  }

}
