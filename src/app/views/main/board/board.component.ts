import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { MainService } from '../../../services/main.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Board } from '../../../interfaces/board';
import { CookieService } from 'ngx-cookie-service';
import { sign } from 'crypto';
import { distinct, distinctUntilChanged } from 'rxjs';
import { List } from '../../../interfaces/list';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './board.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BoardComponent   {
  mainService = inject(MainService);
  Aroute = inject(ActivatedRoute);
  cookies = inject(CookieService);
  router = inject(Router);
  cdr = inject(ChangeDetectorRef);
  elRef = inject(ElementRef);
  Lists:any = []
  boardId = signal(-1)
  boardName = signal('');
  deleteButton = signal(false);
  editButton = signal(false);
  buttonEditChoose = signal(-1);
  creating = signal(false);
  newBoardName?: string;
  listName?: string;
  listNameFor?: string;
  updatingListNameBoolean = signal(false);
  selectList:any;
  editing: boolean = false;
  constructor() {
    this.boardId.set(parseInt(this.Aroute.snapshot.paramMap.get('id')!));
    this.boardName.set(this.Aroute.snapshot.paramMap.get('boardName')!);
  }



  ngOnInit(): void {
    this.getListsAndCards();
    // Listener para cambiar de ruta
      this.mainService.changeRoute
      .pipe(
        distinctUntilChanged(
          (prev, curr) => {
            return prev === curr
          }
        )
      )
      .subscribe(() => {
        this.Aroute.params
        .pipe(
          distinctUntilChanged(
            (prev, curr) => {
              return prev['id'] === curr['id']
            }
          )
        )
        .subscribe(params => {
          this.boardId.set(parseInt(params['id']));
          this.boardName.set(params['boardName']);
          this.getListsAndCards();
        });
      });
  }


/// función para obtener listas y tarjetas
  getListsAndCards(){
    this.Lists = [];
    this.mainService.getListsByBoardId(this.boardId())
    .then(

      (res:any) =>
        {res.subscribe(
          (data:any) =>
          {
            this.Lists = data;
            this.Lists.forEach((list:any) => {
              this.mainService.getCardsByListId(list.id)
              .then(
                (res:any) =>
                  {res.subscribe(
                    (data:any) =>
                    {
                      list.cards = data;

                    });
                  }
              )
            });
            this.cdr.markForCheck();
          });
        }

      )
  }

/// función para actualizar el nombre del Board
  updateBoardName() {
    this.cancelEditingBoardName();
    const data:Board = {
      Id: this.boardId(),
      name: this.newBoardName!,
      accountId: parseInt(this.cookies.get('user.id'))
    }
    this.mainService.updateBoard(this.boardId(), data)
    .then(
      (res:any) =>
        {res.subscribe(
          (data:any) =>
          {
            this.boardName.set(this.newBoardName!);
            this.router.navigate(['/board/' + this.boardId() + '/' + this.newBoardName]);
            this.mainService.boardCreated.emit();
          });
        }
      )

  }

 /// función de cambio de botón de editar nombre de Board
  startEditingBoardName() {
    this.newBoardName = this.boardName();
    this.editing = true;
    this.cdr.detectChanges();
    this.selectText()
  }
/// función de cambio de botón de editar nombre de Board a false
  cancelEditingBoardName() {
    this.editing = false;
  }


////////// *Listas funciones

///crear lista
  createList(){
    this.cancelCreatingList();
    const data = {
      name: this.listName,
      boardId: this.boardId(),
      pos: this.Lists.length
    }

    this.mainService.createList(data).then(
      (res:any) =>
        {res.subscribe(
          (data:any) =>
          {
            this.Lists.push(data);
            this.cdr.markForCheck();
          });
        }
      )
  }

/// actualizar nombre de lista
  updatingListName() {
    if (!this.selectList) {
        console.error("selectList is null");
        return;
    }

    const updatedListIndex = this.Lists.findIndex((list: { id: any; }) => list.id === this.selectList.id);
    if (updatedListIndex === -1) {
        console.error("List not found in local list array");
        return;
    }

    // Actualiza el nombre en la lista local
    this.Lists[updatedListIndex].name = this.listNameFor;

    const data: List = {
        id: this.selectList.id,
        name: this.listNameFor,
        boardId: this.selectList.boardId,
    };

    this.mainService.updateList(this.selectList.id, data).then(
        (res: any) => {
            res.subscribe(
                (data: any) => {
                    this.cdr.markForCheck();
                });
        }
    ).then(() => {
        this.selectList = null;
    });
}

///cambiar booleano de boton de crear lista
  startCreatingList(){
    this.creating.set(true);
  }

/// cambiar booleano de boton de crear lista a false
  cancelCreatingList(){
    this.creating.set(false);
    this.listName = '';
  }

///cambiar booleano de boton de editar nombre de lista
  startUpdatingListName(list:any){
    this.listNameFor = list.name;
    this.selectList = list;
    this.updatingListNameBoolean.set(true);
    this.cdr.detectChanges();
    this.buttonEditChoose.set(-1);
    this.selectText()
  }

/// cambiar booleano de boton de editar nombre de lista a false
  cancelUpdatingListName(){
    this.updatingListNameBoolean.set(false);
  }

///eliminar lista

  deleteList(list:any){
    this.mainService.deleteList(list.id).then(
      (res:any) =>
        {res.subscribe(
          (data:any) =>
          {
            this.Lists = this.Lists.filter((item:any) => item.id !== list.id);
            this.cdr.markForCheck();
          });
        }
      )
  }



  // Listener para cerrar los botones de editar y eliminar

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    console.log(event.target)
    const dontElements = document.querySelectorAll('.dont');
    const buttons = document.querySelectorAll('button');

    let clickedInside = false;

    dontElements.forEach(element => {
      if (element.contains(event.target as Node)) {
        console.log('clicked inside')
        clickedInside = true;
      }
    });

    buttons.forEach(button => {
      if (button.contains(event.target as Node)) {
        console.log('clicked inside')
        clickedInside = true;
      }
    });

    if (!clickedInside) {
      console.log('clicked outside')
      this.buttonEditChoose.set(-1);
      this.deleteButton.set(false);
      this.editButton.set(false);

    }
  }


//select text in input field

selectText() {
  const inputElement = this.elRef.nativeElement.querySelector('input');
  if (inputElement) {
    inputElement.select()
  }
}


}
