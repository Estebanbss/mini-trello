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

cardName?: string;
cardNameFor?: string;
selectCard: any;
indexCard = signal(-1);
creatingCardChoose = signal(-1);
creatingCardBoolean = signal(false);
editCardName = signal(false);
updatingCardNameBoolean = signal(false);
buttonEditChooseCard = signal(-1);


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

  customSort(a: { pos: number; }, b: { pos: number; }) {
    return a.pos - b.pos;
  }

  selectText() {
    const inputElement = this.elRef.nativeElement.querySelector('input');
    if (inputElement) {
      inputElement.select()
    }
  }


/// función para obtener listas y tarjetas
  getListsAndCards(){
    this.mainService.getListsByBoardId(this.boardId())
    .then(

      (res:any) =>
        {res.subscribe(
          (data:any) =>
          {
            this.Lists = data.sort(this.customSort);
            this.Lists.forEach((list:any) => {
              this.mainService.getCardsByListId(list.id)
              .then(
                (res:any) =>
                  {res.subscribe(
                    (data:any) =>
                    {
                      list.cards = data.sort(this.customSort);
                      this.cdr.detectChanges();
                      this.cdr.markForCheck();
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
    this.cancelCreatingList()
    this.cancelCreatingCard()
    this.cancelEditingListName()
    this.cancelEditingCardName()
    this.cdr.markForCheck();
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
    this.cancelEditingBoardName()
    this.cancelCreatingCard()
    this.cancelEditingCardName()
    this.cancelEditingListName()
    this.cdr.detectChanges();
    this.cdr.markForCheck();
    this.selectText()
  }

/// cambiar booleano de boton de crear lista a false
  cancelCreatingList(){
    this.creatingList.set(false);
  }

///cambiar booleano de boton de editar nombre de lista
  startEditingListName(list:any){

    this.listNameFor = list.name;
    this.selectList = list;
    this.updatingListNameBoolean.set(true);
    this.buttonEditChooseList.set(-1);
    this.cancelEditingBoardName()
    this.cancelCreatingCard()
    this.cancelCreatingList()
    this.cancelEditingCardName()
    this.cdr.markForCheck();
    this.cdr.detectChanges();
    this.selectText()
  }

/// cambiar booleano de boton de editar nombre de lista a false
  cancelEditingListName(){
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

this.cancelCreatingCard();
const data:Card = {
  Title : this.cardName,
  Description : '',
  Comment : '',
  Labels : '',
  Cover : '',
  ListId : list.id,
  Pos : list.cards.length,
}

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
  this.cancelEditingCardName();
  this.mainService.deleteCard(card.id).then(
    (res:any) =>
      {res.subscribe(
        (data:any) =>
        {
          this.Lists.forEach((list:any) => {
            list.cards = list.cards.filter((item:any) => item.id !== card.id);
          });
          this.cdr.markForCheck();
        });
      }
    )
}

///función bool para cambiar el botón de editar tarjeta

startCreatingCard(){
this.creatingCardBoolean.set(true);
this.cancelEditingBoardName()
this.cancelCreatingList()
this.cancelEditingListName()
this.cancelEditingCardName()
this.cdr.detectChanges();
this.cdr.markForCheck();
}

///función bool para cambiar el botón de editar tarjeta a false

cancelCreatingCard(){
this.creatingCardBoolean.set(false);
this.creatingCardChoose.set(-1);
}

//función hover para activar el boton de editar en la card
hoverEditCardName(list:any){
  this.editCardName.set(true);
  this.selectList = list;
  this.cdr.detectChanges();
}

//función hover para desactivar el boton de editar en la card
hoverEditCardNameOut(){
  this.editCardName.set(false);
  this.cancelEditingCardName()
  this.selectList = null;
  this.cdr.detectChanges();
}

//función para cambiar el bool de editar nombre de card
startEditingCardName(card:any, list:any){
  this.cardNameFor = card.title;
  this.selectCard = card;
  this.selectList = list;
  this.updatingCardNameBoolean.set(true);
  this.buttonEditChooseCard.set(-1);
  this.cancelEditingBoardName()
  this.cancelCreatingList()
  this.cancelEditingListName()
  this.cancelCreatingCard()
  this.cdr.detectChanges();
  this.cdr.markForCheck();
  this.selectText()

}

//función para cambiar el bool de editar nombre de card a false

cancelEditingCardName(){
  this.updatingCardNameBoolean.set(false);
}

updatingCardName() {
  this.cancelEditingCardName();
  if (!this.selectCard) {
      console.error("selectCard is null");
      return;
  }

  const updatedListIndex = this.Lists.findIndex((list: { id: any; }) => list.id === this.selectList.id);
  if (updatedListIndex === -1) {
      console.error("List not found in local list array");
      return;
  }

  const updatedCardIndex = this.Lists[updatedListIndex].cards.findIndex((card: { id: any; }) => card.id === this.selectCard.id);
  if (updatedCardIndex === -1) {
      console.error("Card not found in local card array");
      return;
  }

  // Actualiza el nombre en la card local
  this.Lists[updatedListIndex].cards[updatedCardIndex].title = this.cardNameFor;


  const data: Card = {
      Id: this.selectCard.id,
      Title: this.cardNameFor,
      Description: this.selectCard.description,
      Comment: this.selectCard.comment,
      Labels: this.selectCard.labels,
      Cover: this.selectCard.cover,
      ListId: this.selectCard.listId,
      Pos: this.selectCard.pos,
  };


  this.mainService.updateCard(this.selectCard.id, data).then(
      (res: any) => {
          res.subscribe(
              (data: any) => {
                  this.cdr.detectChanges();
                  this.cdr.markForCheck();
              });
      }
  ).then(() => {
      this.selectList = null;
      this.selectCard = null;
  });
}


goCard(){
  console.log('goCard')
}

//!funciones cards fin

// Listener para cerrar los botones de editar y eliminar

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.isButtonElement(event.target) && event.target !== document.getElementsByClassName('dont')[0] && !this.isInputElement(event.target)) {
    // Lógica para clics fuera de los botones y elementos con la clase "dont" que no tienen la clase "si".
    this.buttonEditChooseList.set(-1);
    this.deleteButtonList.set(false);
    this.editButtonList.set(false);
    this.cancelCreatingList();
    this.cancelCreatingCard();
    this.cancelEditingListName();
    this.cancelEditingCardName();
    this.cdr.detectChanges();
    this.cdr.markForCheck();
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
