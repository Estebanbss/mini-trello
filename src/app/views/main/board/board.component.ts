import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MainService } from '../../../services/main.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

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
  Lists:any = []
  boardId:any
  boardName:any
  newBoardName?: string;
  editing: boolean = false;
  constructor() {
    this.boardId = this.Aroute.snapshot.paramMap.get('id');
    this.boardName = this.Aroute.snapshot.paramMap.get('boardName');
  }

  ngOnInit(): void {

    this.mainService.getListsByBoardId(this.boardId)
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

  }

  updateBoardName() {

  }


  startEditing() {
    this.newBoardName = this.boardName;
    this.editing = true;
  }

  cancelEditing() {
    this.editing = false;
  }
}
