import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { MainService } from '../../../services/main.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Board } from '../../../interfaces/board';
import { CookieService } from 'ngx-cookie-service';
import { sign } from 'crypto';

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
  editing: boolean = false;
  creating: boolean = false;
  constructor() {
    this.boardId.set(parseInt(this.Aroute.snapshot.paramMap.get('id')!));
    this.boardName.set(this.Aroute.snapshot.paramMap.get('boardName')!);
  }



  ngOnInit(): void {

    this.mainService.getListsByBoardId(this.boardId())
    .then(
      (res:any) =>
        {res.subscribe(
          (data:any) =>
          {
            this.Lists = data;
            console.log('Lists: ',this.Lists);
            this.Lists.forEach((list:any) => {
              this.mainService.getCardsByListId(list.id)
              .then(
                (res:any) =>
                  {res.subscribe(
                    (data:any) =>
                    {
                      list.cards = data;
                      console.log('Cards: ',list.cards);
                    });
                  }
              )
            });

          });
        }
      )

      this.mainService.changeRoute.subscribe(() => {
        this.Aroute.params.subscribe(params => {
          this.boardId.set(parseInt(params['id']));
          this.boardName.set(params['boardName']);
        });
      });
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

  startCreating(){
    this.creating = true;
  }

  cancelCreating(){
    this.creating = false;
  }
}
