import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { MainService } from '../../../services/main.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Board } from '../../../interfaces/board';
import { CookieService } from 'ngx-cookie-service';
import { sign } from 'crypto';
import { distinct, distinctUntilChanged } from 'rxjs';

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
export default class BoardComponent {
  mainService = inject(MainService);
  Aroute = inject(ActivatedRoute);
  cookies = inject(CookieService);
  router = inject(Router);
  cdr = inject(ChangeDetectorRef);
  Lists:any = []
  boardId = signal(-1)
  boardName = signal('');
  newBoardName?: string;
  listName?: string;
  listNameFor?: string;
  updatingListNameB: boolean = false;
  selectList:any;
  editing: boolean = false;
  creating: boolean = false;
  constructor() {
    this.boardId.set(parseInt(this.Aroute.snapshot.paramMap.get('id')!));
    this.boardName.set(this.Aroute.snapshot.paramMap.get('boardName')!);
  }



  ngOnInit(): void {
    this.getListsAndCards();
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

  updateBoardName() {
    this.cancelEditing();
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


  startEditing() {
    this.newBoardName = this.boardName();
    this.editing = true;
  }

  cancelEditing() {
    this.editing = false;
  }

  createList(){
    this.cancelCreating();
    const data = {
      name: this.listName,
      boardId: this.boardId()
    }

    this.mainService.createList(data).then(
      (res:any) =>
        {res.subscribe(
          (data:any) =>
          {
            console.log(this.Lists)
            this.Lists.push(data);
            this.cdr.markForCheck();
            console.log(this.Lists)
          });
        }
      )
  }

  updatingList(){
    this.cancelUpdatingListName();
    const data = {
      id: this.selectList.id,
      name: this.listNameFor,
      boardId: this.selectList.boardId
    }

     this.mainService.updateList(this.selectList.id, data).then(
       (res:any) =>
          {res.subscribe(
            (data:any) =>
            {
               this.selectList = null;
               this.cdr.markForCheck();
            });
          }
       )

  }

  startCreating(){
    this.creating = true;
  }

  cancelCreating(){
    this.creating = false;
  }

  startUpdatingListName(list:any){
    this.listNameFor = list.name;
    this.selectList = list;
    console.log(this.selectList);
    this.updatingListNameB = true;
  }

  cancelUpdatingListName(){
    console.log("ola")
    this.selectList = null;
    this.updatingListNameB = false;
  }
}
