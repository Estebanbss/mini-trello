import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild, inject, signal } from '@angular/core';
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

// variables para el drag and drop
draggingList = signal(false);
isFirstDragOver = signal(false)
listId:any;

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
    this.cdr.detectChanges();
    // Buscar el elemento input dentro del elemento nativo del componente
    const inputElement = this.elRef.nativeElement.querySelector('input');

    if (inputElement) {
      inputElement.select();
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

    if(this.newBoardName === '' || this.newBoardName === undefined){
      return;
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
    const data = {
      name: this.listName,
      boardId: this.boardId(),
      pos: this.Lists.length
    }

    if(this.listName === '' || this.listName === undefined){
      return;
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

    if (this.listNameFor === '' || this.listNameFor === undefined) {
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
          this.cdr.markForCheck();
        }
    ).then(() => {
        this.selectList = null;
    });
}

  updatingList(list:any) {
  this.mainService.updateList(list.id, list).then(
    (res:any) =>
      {
          this.cdr.detectChanges();
          this.cdr.markForCheck();

      }
  )
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
        {
            this.Lists = this.Lists.filter((item:any) => item.id !== list.id);
            this.cdr.markForCheck();

        }
      )
  }

///*listas fin

///!cards funciones

///crear tarjeta
createCard(list:any){

this.cancelCreatingCard();
const data:Card = {
  title : this.cardName,
  description : '',
  comment : '',
  labels : '',
  cover : '',
  listId : list.id,
  pos : list.cards.length,
}

if(this.cardName === '' || this.cardName === undefined){
  return;
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

startCreatingCard(i:any){
this.creatingCardBoolean.set(true);
this.creatingCardChoose.set(i);
this.cancelEditingBoardName()
this.cancelCreatingList()
this.cancelEditingListName()
this.cancelEditingCardName()
this.cdr.detectChanges();
this.cdr.markForCheck();
this.selectText()
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
  if(this.cardNameFor === '' || this.cardNameFor === undefined){
    return;
  }
  // Actualiza el nombre en la card local
  this.Lists[updatedListIndex].cards[updatedCardIndex].title = this.cardNameFor;


  const data: Card = {
      id: this.selectCard.id,
      title: this.cardNameFor,
      description: this.selectCard.description,
      comment: this.selectCard.comment,
      labels: this.selectCard.labels,
      cover: this.selectCard.cover,
      listId: this.selectCard.listId,
      pos: this.selectCard.pos,
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

//!funciones cards fin


//todo:funciones para drog and drop

  onDragStartList(list:any){
    this.draggingList.set(true);
    this.selectList = list;
    this.cdr.detectChanges();
    this.cdr.markForCheck();
  }

  onDropList(){
    this.draggingList.set(false);
    const listElement = this.getListElement(this.selectList);
    listElement?.classList.remove('hidden');
    this.isFirstDragOver.set(false);
    this.cdr.detectChanges();
    this.cdr.markForCheck();
  }


  onDragOverList(event: any, listPos: any) {
      // Detener la propagación del evento dragover mientras se procesa un cambio de posición
      if (this.selectList) {
          event.preventDefault();
          event.stopPropagation();
      }

      // Encuentra los índices de las listas seleccionada y de destino
      let selectedIndex: any = null;
      let targetIndex: any = null;

      selectedIndex = this.findIndexList(this.selectList);
      targetIndex = this.findIndexList(listPos);
      this.cdr.detectChanges();

      if (selectedIndex !== targetIndex) {
          this.changePosList(selectedIndex, targetIndex);
          selectedIndex = this.findIndexList(this.selectList);
          targetIndex = this.findIndexList(listPos);
      }

      if (!this.isFirstDragOver()) {
          this.changeSizePreviewList(this.selectList);
          this.isFirstDragOver.set(true);
          this.cdr.detectChanges();
          this.cdr.markForCheck();
      }
  }


  onDragEnd(){
    this.draggingList.set(false)
    this.isFirstDragOver.set(false)
    const listElement = this.getListElement(this.selectList);
    listElement?.classList.remove('hidden');
    this.cdr.detectChanges();
  }

  changePosList(selectedIndex:any, targetIndex:any){
      // Intercambia las posiciones de las listas en el arreglo
      if (selectedIndex > -1 && targetIndex > -1) {
        const temp = this.Lists[selectedIndex].pos;
        this.Lists[selectedIndex].pos = this.Lists[targetIndex].pos;
        this.Lists[targetIndex].pos = temp;
        const ListElement = this.getListElement(this.Lists[targetIndex]);
        ListElement?.classList.remove('hidden');


        this.updatingList(this.Lists[selectedIndex]);
        this.updatingList(this.Lists[targetIndex]);
        this.cdr.markForCheck();
        this.cdr.detectChanges();
      }
      this.Lists.sort(this.customSort);
      this.selectList = this.Lists[targetIndex];

      this.cdr.markForCheck();
      this.cdr.detectChanges();

  }

  changeSizePreviewList(list: { id: any; }){
      const listElement = this.getListElement(list);
      const previewElement = document.getElementById('preview');
      if (listElement && previewElement) {
        // Obtener las dimensiones del div inferior
        const width = listElement.offsetWidth;
        const height = listElement.offsetHeight;
        // Aplicar las dimensiones al elemento preview
        previewElement.style.width = width + 'px';
        previewElement.style.height = height + 'px';
        // Otros manejadores de eventos dragstart...
      }
      listElement?.classList.add('hidden');

      this.cdr.detectChanges();
  }

  getListElement(list:any){
    const listId = `list_${list.id}`;
    return document.getElementById(listId);
  }

  findIndexList(list:any){
  return this.Lists.findIndex((item:any) => item?.id === list?.id);
  }

//todo:funciones para drog and drop fin

//?* Listener para cerrar los botones de editar y eliminar

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
