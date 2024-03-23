import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild, inject, signal } from '@angular/core';
import { MainService } from '../../../services/main.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
    FormsModule,
    RouterModule,
  ],
  templateUrl: './board.component.html',
  styles: `
  .placeholder-align-top::placeholder {
  text-align: top;
}
textarea::after {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 24px;
    width: 100%;
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
buttonEditChooseList = signal(false);
selectEditList = signal(-1);

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
cardReady = signal(false)
onDescription = signal(false)
onComment = signal(false)
onLabel = signal(false)

// variables para el drag and drop

  lisent = signal('');

  // LISTS
  draggingList = signal(false);
  isFirstDragOverList = signal(false)
  listId:any;

  // CARDS
  draggingCard = signal(false);
  isFirstDragOverCard = signal(false)
  cardId:any;

// variables para detallitos

initialHeight: number = 37; // Altura inicial del textarea en píxeles
user:any;

  constructor() {
    this.boardId.set(parseInt(this.Aroute.snapshot.paramMap.get('id')!));
    this.boardName.set(this.Aroute.snapshot.paramMap.get('boardName')!);
  }

  go(){
    console.log("go")
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
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
    const textareaElement = this.elRef.nativeElement.querySelector('textarea');

    if (inputElement) {
      inputElement.select();
    }
    if (textareaElement) {
      textareaElement.select();
    }
  }

  selectTextById(id: any) {
    this.cdr.detectChanges();
    const inputElement = document.getElementById(id) as HTMLInputElement;
    if (inputElement) {
      inputElement.select();
      this.cdr.detectChanges()
      setTimeout(() => {
        inputElement.style.height = 'auto';
        inputElement.style.height = inputElement.scrollHeight + 'px';
      }, 50); // Ajusta la altura después de un breve retraso
    }
  }
  

  adjustTextareaHeight(event: any) {
    const textarea = event.target as HTMLTextAreaElement;
    if (!textarea || textarea.tagName !== 'TEXTAREA') return;

    // Ajustar la altura del textarea según el contenido
    textarea.style.height = 'auto'; // Establecer la altura a automática para que se ajuste según el contenido
    const scrollHeight = textarea.scrollHeight;

    // Si el scrollHeight es mayor que la altura inicial, ajustar la altura del textarea
    if (scrollHeight > this.initialHeight) {
      textarea.style.height = scrollHeight + 'px'; // Ajustar la altura al scrollHeight del textarea
    } else {
      textarea.style.height = this.initialHeight + 'px'; // Mantener la altura inicial
    }
  }

  blurTextArea(event: any) {
    // Desenfoca el elemento textarea
    this.elRef.nativeElement.querySelector('textarea').blur();
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

                    })
                  }

              )

            });
            console.log(this.Lists)
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
    this.Lists.push(data);
    this.cdr.detectChanges();
    this.cdr.markForCheck();
    this.selectText()
    this.mainService.createList(data).then(
      (res:any) =>
        {res.subscribe(
          (data:any) =>
          {
            this.Lists[this.Lists.length - 1].id = data.id;
            this.cdr.detectChanges();
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

//función para actualizar la list
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
    this.buttonEditChooseList.set(false);
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
    this.mainService.deleteList(this.selectList.id).then(
      (res:any) =>
        {
            this.Lists = this.Lists.filter((item:any) => item.id !== this.selectList.id);
            this.cdr.markForCheck();

        }
      )
  }

//función para activar el edit list
  buttonEditList(list:any){
    this.selectList = list;
    this.cdr.markForCheck();
    this.cdr.detectChanges();
    const listElement = this.getListElement(list);
    const rect = listElement!.getBoundingClientRect();
    const x = rect.right + window.scrollX;
    const y = rect.top + window.scrollY;
    this.cdr.detectChanges();
    this.cdr.markForCheck();
    const updatingList = document.getElementById('updatingList');
    if(updatingList !== null){
    updatingList.style.transform = `translate(${x}px,${y}px)`
    }
  }
///*listas fin

///!cards funciones

///crear tarjeta
createCard(list:any){
  console.log(list)
const data:Card = {
  title : this.cardName,
  description : '',
  comment : '',
  labels : '',
  cover : '',
  listId : list.id,
  pos: list.cards?.length !== 0 && list.cards?.length !== undefined ? list.cards[list.cards.length - 1]?.pos + 1 : 0
}

if(this.cardName === '' || this.cardName === undefined){
  return;
}
if(list.cards === undefined){
  list.cards = [];
}
list.cards.push(data);
this.mainService.createCard(data).then(
  (res:any) =>
    {res.subscribe(
      (data:any) =>
      {
        this.Lists.forEach((item:any) => {
          if(item.id === list.id){
            item.cards[item.cards.length - 1].id = data.id;
          }
        })

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
  this.selectEditList.set(list.id)
  this.cdr.detectChanges();
}

//función hover para desactivar el boton de editar en la card
hoverEditCardNameOut(){
  this.editCardName.set(false);
  this.cancelEditingCardName()
  this.selectEditList.set(-1)
  this.cdr.detectChanges();
}

//función para cambiar el bool de editar nombre de card
startEditingCardName(card:any, list:any){
  this.cardNameFor = card.title;
  this.selectCard = card;
  this.selectList = list;
  this.updatingCardNameBoolean.set(true);
  this.buttonEditChooseCard.set(-1);
  this.cdr.detectChanges();
  const cardElement = this.getCardElement(card);
  const rect = cardElement!.getBoundingClientRect();
  const x = rect.left + window.scrollX;
  const y = rect.top + window.scrollY - 50;
  const updatingCard = document.getElementById('updatingCard');
  if(updatingCard !== null){
    updatingCard.style.transform = `translate(${x}px,${y}px)`
  }
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

//función para actualizar el nombre de la Card
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



  try{
    this.mainService.updateCard(this.selectCard.id, data).then(
      (res:any) =>
        {
            this.selectCard = null;
            this.selectList = null;
            this.cdr.detectChanges();
            this.cdr.markForCheck();
        }
    )
  }catch(e){
    console.error(e);
  }
}

//función para actualizar la card
updatingCard(card:any) {
  this.mainService.updateCard(card.id, card).then(
    (res:any) =>
      {
          this.cdr.detectChanges();
          this.cdr.markForCheck();

      }
  )
}

//!funciones cards fin

//todo:funciones para drog and drop

// LISTS DRAG FUNCIONES

  onDragStartList(event:any, list:any){
    this.lisent.set('list')
    event.dataTransfer?.setDragImage(event.target.parentElement as HTMLElement, 150, 50);
    this.selectList = list;
    this.cdr.detectChanges();
    this.cdr.markForCheck();
  }

  onDropList(){
    if(this.lisent() !== 'list') return
    this.lisent.set('')
    this.draggingList.set(false);
    const listElement = this.getListElement(this.selectList);
    listElement?.classList.remove('hidden');
    this.isFirstDragOverList.set(false);
    this.cdr.detectChanges();
    this.cdr.markForCheck();
  }

  onDragOverList(event: any, listPos: any) {
    if(this.lisent() !== 'list') return
      this.draggingList.set(true)
      // Detener la propagación del evento dragover mientras se procesa un cambio de posición
        if (this.draggingList()) {
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
          this.cdr.detectChanges();
          this.Lists.sort(this.customSort);
          this.Lists[selectedIndex].cards.sort(this.customSort);
          this.Lists[targetIndex].cards.sort(this.customSort);
          this.cdr.detectChanges();
          this.cdr.markForCheck();
      }

      if (!this.isFirstDragOverList()) {
          this.changeSizePreviewList(this.selectList);
          this.isFirstDragOverList.set(true);
          this.cdr.detectChanges();
          this.cdr.markForCheck();
      }
  }

  onDragEndList(){
    if(this.lisent() !== 'list') return
    this.lisent.set('')
    this.draggingList.set(false)
    this.isFirstDragOverList.set(false)
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

// CARDS DRAG FUNCIONES

  onDragStartCard(event:any, card:any, list:any){
    this.lisent.set('card')
    event.dataTransfer?.setDragImage(event.target.parentElement as HTMLElement, 150, 50);
    this.selectCard = card;
    this.selectList = list;
    this.cdr.detectChanges();
    this.cdr.markForCheck();

  }

  onDropCard(){
    if(this.lisent() !== 'card') return
    this.lisent.set('')
    this.draggingCard.set(false);
    const cardElement = this.getCardElement(this.selectCard);
    cardElement?.classList.remove('hidden');
    this.isFirstDragOverCard.set(false);
    this.cdr.detectChanges();
    this.cdr.markForCheck();
    //for de listas elementos para asignarles atributo draggable true
  }

  onDragOverCard(event?:any, cardPos?:any, listPos?:any){
    if(this.lisent() !== 'card') return
    this.draggingCard.set(true);
        // Detener la propagación del evento dragover mientras se procesa un cambio de posición
      if(this.draggingCard()){
        event.preventDefault();
        event.stopPropagation();
      }

    let cardPosi = cardPos;
    let listPosi = listPos;

    if (cardPosi === undefined) {


      const destinationListIndex = this.findIndexList(listPos);

      // Verificar si la lista de destino existe y no está vacía
      if (destinationListIndex !== -1 && this.Lists[destinationListIndex].cards.length > 0) {
        const destinationList = this.Lists[destinationListIndex];
        const sourceListIndex = this.findIndexList(this.selectList);

        // Eliminar la tarjeta de la lista de origen
        const updatedSourceList = this.Lists[sourceListIndex].cards.filter((item: any) => item.id !== this.selectCard.id);
        this.Lists[sourceListIndex].cards = updatedSourceList;

        // Actualizar la lista de origen
        this.updatingList(this.Lists[sourceListIndex]);

        // Establecer la tarjeta en la nueva lista
        this.selectCard.listId = destinationList.id;

        // Insertar la tarjeta en la lista de destino y ajustar las posiciones
        const targetIndex = destinationList.cards.length;
        destinationList.cards.splice(targetIndex, 0, this.selectCard);

        // Actualizar la lista de destino
        this.updatingList(destinationList);
      } else {

        // Si la lista de destino está vacía o no existe, simplemente agregamos la tarjeta
        const destinationList = this.Lists[destinationListIndex];
        if (destinationList) {
          const sourceListIndex = this.findIndexList(this.selectList);
          this.selectCard.listId = destinationList.id;
          destinationList.cards.push(this.selectCard);
          this.updatingCard(this.selectCard);
          this.updatingList(destinationList);
          this.selectList = destinationList;
          const updatedSourceList = this.Lists[sourceListIndex].cards.filter((item: any) => item.id !== this.selectCard.id);
          this.Lists[sourceListIndex].cards = updatedSourceList;
          this.updatingList(this.Lists[sourceListIndex]);
          this.updatingList(destinationList);
          this.cdr.detectChanges();
          this.changeSizePreviewCard(this.selectCard);
        }
      }

      // Realizar las detecciones de cambios
      this.cdr.markForCheck();
      this.cdr.detectChanges();


    }
    else{

      // Encuentra los índices de las listas seleccionada y de destino
      let selectedIndexCard: any = null;
      let targetIndexCard: any = null;
      let selectedIndexList: any = null;
      let targetIndexList: any = null;


      selectedIndexCard = this.findIndexCard(this.selectCard);
      targetIndexCard = this.findIndexCard(cardPos);
      selectedIndexList = this.findIndexList(this.selectList);
      targetIndexList = this.findIndexList(listPos);
      this.cdr.detectChanges();
      this.cdr.markForCheck();

      if (selectedIndexCard !== targetIndexCard || selectedIndexList !== targetIndexList) {

          this.changePosCard(selectedIndexCard, targetIndexCard, selectedIndexList, targetIndexList);
          selectedIndexCard = this.findIndexCard(this.selectCard);
          targetIndexCard = this.findIndexCard(cardPos);
          selectedIndexList = this.findIndexList(this.selectList);
          targetIndexList = this.findIndexList(listPos);
          this.cdr.detectChanges();
      }



      if (!this.isFirstDragOverCard()) {
          this.changeSizePreviewCard(this.selectCard);
          this.isFirstDragOverCard.set(true);
          this.cdr.detectChanges();
          this.cdr.markForCheck();
      }
    }

  }

  onDragEndCard(){
    if(this.lisent() !== 'card') return
    this.lisent.set('')
    this.draggingCard.set(false)
    this.isFirstDragOverCard.set(false)
    const cardElement = this.getCardElement(this.selectCard);
    cardElement?.classList.remove('hidden');
    this.cdr.detectChanges();
  }

  changePosCard(selectedIndexCard:any, targetIndexCard:any, selectedIndexList:any, targetIndexList:any){
    // Intercambia las posiciones de las listas en el arreglo
    if (selectedIndexList > -1 && targetIndexList > -1 && selectedIndexCard > -1 && targetIndexCard > -1) {
      if (selectedIndexList === targetIndexList) {
        // Intercambiar la posición de las tarjetas dentro de la misma lista
        const tempPos = this.Lists[selectedIndexList].cards[selectedIndexCard].pos;
        this.Lists[selectedIndexList].cards[selectedIndexCard].pos = this.Lists[targetIndexList].cards[targetIndexCard].pos;
        this.Lists[targetIndexList].cards[targetIndexCard].pos = tempPos;


        // Actualizar las tarjetas afectadas
        this.updatingCard(this.Lists[selectedIndexList].cards[selectedIndexCard]);
        this.updatingCard(this.Lists[targetIndexList].cards[targetIndexCard]);
      } else {
        // Intercambiar la lista de la tarjeta seleccionada
        this.Lists[selectedIndexList].cards[selectedIndexCard].listId = this.Lists[targetIndexList].id;

        // Mover la tarjeta de una lista a otra y actualizar la posición
        const tempCard = this.Lists[selectedIndexList].cards.splice(selectedIndexCard, 1)[0];
        tempCard.pos = this.Lists[targetIndexList].cards[targetIndexCard].pos;
        //

        // Insertar la tarjeta en la nueva lista y ajustar las posiciones de las tarjetas en esa lista
        this.Lists[targetIndexList].cards.splice(targetIndexCard, 0, tempCard);

        this.Lists[targetIndexList].cards.forEach((card: { pos: any; }, index: any) => {
          card.pos = index;
          this.updatingCard(card);
          this.cdr.detectChanges();
        });
        this.changeSizePreviewCard(this.Lists[targetIndexList].cards[targetIndexCard]);
        this.cdr.detectChanges();
        // Actualizar las listas afectadas
        this.updatingList(this.Lists[selectedIndexList]);
        this.updatingList(this.Lists[targetIndexList]);
      }

      // Realizar las detecciones de cambios
      this.cdr.detectChanges();
      this.cdr.markForCheck();
    }






    this.Lists.sort(this.customSort);

    this.Lists.find((list: { id: any; }) => list.id === this.Lists[selectedIndexList].id)?.cards.sort(this.customSort);
    this.Lists.find((list: { id: any; }) => list.id === this.Lists[targetIndexList].id)?.cards.sort(this.customSort);


    this.selectList = this.Lists[targetIndexList];
    this.selectCard = this.Lists[targetIndexList].cards[targetIndexCard];

    this.cdr.markForCheck();
    this.cdr.detectChanges();
  }

  changeSizePreviewCard(card:{id:any}){

    const cardElement = this.getCardElement(card);
    const previewElement = document.getElementById('preview2');
    if (cardElement && previewElement) {
      // Obtener las dimensiones del div inferior
      const width = cardElement.offsetWidth;
      const height = cardElement.offsetHeight;
      // Aplicar las dimensiones al elemento preview
      previewElement.style.width = width + 'px';
      previewElement.style.height = height + 'px';
    }
    cardElement?.classList.add('hidden');

    this.cdr.detectChanges();
  }

  getCardElement(card:any){
    const cardId = `card_${card?.id}`;
    return document.getElementById(cardId);
  }

  findIndexCard(card: any) {
     return this.Lists.find((list: { id: any; }) => list?.id === card?.listId)?.cards.findIndex((item: { id: any; }) => item?.id === card?.id);
}

//todo:funciones para drog and drop fin

goCard(card:any, list:any){
  this.selectCard = card
  this.selectList = list
  this.cardNameFor = card.title
  this.cardReady.set(true)
  this.cdr.detectChanges();
}

updateCard(){
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



  try{
    this.mainService.updateCard(this.selectCard.id, data).then(
      (res:any) =>
        {
            this.selectCard = this.Lists[updatedListIndex].cards[updatedCardIndex];
            this.selectList = this.Lists[updatedListIndex];
            this.cardNameFor = this.Lists[updatedListIndex].cards[updatedCardIndex].title;
            this.cdr.detectChanges();
            this.cdr.markForCheck();
        }
    )
  }catch(e){
    console.error(e);
  }

}

onSubmit(event: any) {
  event.preventDefault(); // Evita el envío automático del formulario
  this.updateCard();
  this.blurTextArea(event);
}

cancelCard(){
  this.cardReady.set(false)
  this.cardNameFor = ''
  this.cdr.detectChanges();
}

startEditDescrip(){
  this.onDescription.set(true)
  this.selectTextById('description')
  this.cdr.detectChanges()
}

startEditComment(){
  this.onComment.set(true)
  this.selectTextById('comment')
  this.cdr.detectChanges()
}

startEditLabel(){
  this.onLabel.set(true)
  this.cdr.detectChanges()
}

updateCardLabel(label:any){
  this.selectCard.labels = label
  this.updateCard()
  this.onLabel.set(false)
  this.cdr.detectChanges()
  
}


//?* Listener para cerrar los botones de editar y eliminar

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.isButtonElement(event.target) && event.target !== document.getElementsByClassName('dont')[0] && !this.isInputElement(event.target) && !this.isTextAreaElement(event.target)) {
    // Lógica para clics fuera de los botones y elementos con la clase "dont" que no tienen la clase "si".
    this.buttonEditChooseList.set(false);
    this.deleteButtonList.set(false);
    this.editButtonList.set(false);
    this.cancelCreatingList();
    this.cancelCreatingCard();
    this.cancelEditingListName();
    this.cancelEditingCardName();
    this.cardReady.set(false)
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

  private isTextAreaElement(target: EventTarget | null): boolean {
    return target instanceof HTMLTextAreaElement;
  }

}
