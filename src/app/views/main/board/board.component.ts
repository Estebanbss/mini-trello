import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, inject, signal } from '@angular/core';
import { MainService } from '../../../services/main.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Board } from '../../../interfaces/board';
import { CookieService } from 'ngx-cookie-service';
import { distinctUntilChanged } from 'rxjs';
import { List } from '../../../interfaces/list';
import { Card } from '../../../interfaces/cards';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './board.component.html',
  styles: `
  .placeholder-align-top::placeholder {
  text-align: top;
}

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BoardComponent   {

// Servicios e inyecciones

mainService = inject(MainService);
Aroute = inject(ActivatedRoute);
cookies = inject(CookieService);
router = inject(Router);
cdr = inject(ChangeDetectorRef);
elRef = inject(ElementRef);

// Variables relacionadas con el tablero (board)

boardId = signal(-1);
boardName = signal('');
newBoardName?: string;
editingBoardName: boolean = false;

// Variables relacionadas con las listas (list)

Lists: any = [];
listName?: string;
listNameFor?: string;
selectList: any;
creatingList = signal(false);
updatingListNameBoolean = signal(false);
deleteButtonList = signal(false);
editButtonList = signal(false);
buttonEditChooseList = signal(-1);

// Variables relacionadas con las tarjetas (card)

indexCard = signal(-1);
creatingCardChoose = signal(-1);
creatingCardBoolean = signal(false);
editCardName = signal(false);
updatingCardNameBoolean = signal(false);
cardName?: string;
cardNameFor?: string;
selectCard: any;

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
                      this.cdr.detectChanges();
                      this.cdr.markForCheck();
                      console.log(this.Lists)
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
    this.editingBoardName = true;
    this.cdr.detectChanges();
    this.selectText()
  }
/// función de cambio de botón de editar nombre de Board a false
  cancelEditingBoardName() {
    this.editingBoardName = false;
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
            this.listName = '';
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
    this.creatingList.set(true);
    this.cdr.detectChanges();
    this.selectText()
  }

/// cambiar booleano de boton de crear lista a false
  cancelCreatingList(){
    this.creatingList.set(false);
  }

///cambiar booleano de boton de editar nombre de lista
  startUpdatingListName(list:any){
    this.listNameFor = list.name;
    this.selectList = list;
    this.updatingListNameBoolean.set(true);
    this.cdr.detectChanges();
    this.buttonEditChooseList.set(-1);
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

///*listas fin

///!cards funciones

///crear tarjeta
createCard(list:any){
console.log(list)

const data:Card = {
  Title : this.cardName,
  Description : '',
  Comment : '',
  Labels : '',
  Cover : '',
  ListId : list.id,
  Pos : list.cards.length,
}

console.log(data)
this.mainService.createCard(data).then(
  (res:any) =>
    {res.subscribe(
      (data:any) =>
      {
        list.cards.push(data);
        this.cdr.detectChanges();
        this.cdr.markForCheck();
        this.cardName = '';
      });
    }
  )
}

///eliminar tarjeta

deleteCard(card:any){
console.log(card)
}

///función bool para cambiar el botón de editar tarjeta

startCreatingCard(card:any){
console.log(card)
this.creatingCardBoolean.set(true);
}

///función bool para cambiar el botón de editar tarjeta a false

cancelCreatingCard(){
this.creatingCardBoolean.set(false);
this.creatingCardChoose.set(-1);
}

//función hover para activar el boton de editar en la card
hoverEditCardName(){
  this.editCardName.set(true);
  this.cdr.detectChanges();
}

//función hover para desactivar el boton de editar en la card
hoverEditCardNameOut(){
  this.editCardName.set(false);
  this.cdr.detectChanges();
}

//función para cambiar el bool de editar nombre de card
startEditingCardName(card:any){
  this.cardNameFor = card.Title;
  this.selectCard = card;
  this.updatingCardNameBoolean.set(true);
  this.cdr.detectChanges();


}


// startUpdatingListName(list:any){
//   this.listNameFor = list.name;
//   this.selectList = list;
//   this.updatingListNameBoolean.set(true);
//   this.cdr.detectChanges();
//   this.buttonEditChoose.set(-1);
//   this.selectText()
// }

goCard(){
  console.log('goCard')
}

//!funciones cards fin
  // Listener para cerrar los botones de editar y eliminar

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const dontElements = document.querySelectorAll('.dont');
    const buttons = document.querySelectorAll('button');

    let clickedInside = false;

    dontElements.forEach(element => {
      if (element.contains(event.target as Node)) {
        clickedInside = true;

      }
    });

    buttons.forEach(button => {
      if (button.contains(event.target as Node)) {
        clickedInside = true;

      }
    });

    if (!clickedInside) {
      this.buttonEditChooseList.set(-1);
      this.deleteButtonList.set(false);
      this.editButtonList.set(false);
      this.cancelCreatingList();
      this.cancelCreatingCard();
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
