import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, inject, signal } from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { MainService } from '../../services/main.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './main.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MainComponent {
  private mainService = inject(MainService);
  private cookies = inject(CookieService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  user:any
  button = signal('Home');
  loading = signal(false);
  buttonCreateBoard = signal(false);
  buttonCreateBoard2 = signal(false);
  boards:any = []
  accountId:any
  deleteButton = signal(false);
  editButton = signal(false);
  name: FormGroup;
  buttonedit = signal(-1);
  selectBoard = signal(-1);
  route  = signal('');

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


  this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      // Actualizar la ruta cuando se completa la navegación
      this.getRoute();
    }
  });
  this.getRoute();

  }

  getRoute() {
    this.route.set(this.router.url);
  }

  getBoards(){

    this.mainService.getBoards().then((res) => {
      res.subscribe((data) => {
          if (data !== null) {
            this.boards = data;
            this.cdr.markForCheck();
          }
      })
    })
  }

  ngOnInit() {
    this.getRoute();
    this.getBoards()
    // Suscripción al evento boardCreated para ejecutar getBoards() cuando se cree un nuevo tablero
    this.mainService.boardCreated.subscribe(() => {
      this.getBoards();
    });
    this.mainService.changeRoute.subscribe(() => {
      this.getRoute();
    });

  }

  createBoard(name:string, accountId:number){
    const data = {
      name: name,
      accountId: accountId
    }

    let board = this.mainService.createBoard(data)
    board.then((res) => {
      res.subscribe((data) => {

        this.loading.set(false);
        this.buttonCreateBoard.set(false);
        this.buttonCreateBoard2.set(false);
        this.mainService.boardCreated.emit();
      } )
    } )
  }

  deleteBoard(id:number){
    this.mainService.deleteBoard(id).then((res) => {
        this.deleteButton.set(false);
        
        this.getBoards()
        this.cdr.detectChanges();
        this.cdr.markForCheck();
        this.mainService.boardCreated.emit();
        if(this.boards.length === 1){
          this.boards = []
          this.getBoards()
          this.cdr.markForCheck();
          this.mainService.noBoards.emit();
          this.mainService.boardCreated.emit();
        }
    })

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

  cdrDm(){
    this.editButton.set(false);
    this.buttonedit.set(-1);
    this.cdr.detectChanges();
    this.cdr.markForCheck();
  }


@HostListener('document:click', ['$event'])
onClickOutside(event: Event) {
  if (!this.isButtonElement(event.target) && event.target !== document.getElementsByClassName('dont')[0] && !this.isInputElement(event.target)) {
  // Lógica para clics fuera de los botones y elementos con la clase "dont" que no tienen la clase "si".
  this.buttonCreateBoard.set(false);
  this.buttonCreateBoard2.set(false);
  this.buttonedit.set(-1);
  this.deleteButton.set(false);
  this.editButton.set(false);
  this.cdr.detectChanges();
  }

}

// Método para verificar si un elemento es un elemento de entrada (input)
private isInputElement(target: EventTarget | null): boolean {
  return target instanceof HTMLInputElement;
}

private isButtonElement(target: EventTarget | null): boolean {
  return target instanceof HTMLButtonElement;
}

}
