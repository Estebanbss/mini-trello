import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, computed, inject, signal } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { RouterModule } from '@angular/router';
import { User } from '../../interfaces/user';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  template: `

<header class=" w-full   fixed z-50 ">
    <nav class="bg-white     border-gray-800 border-b-[1px] border-opacity-15 p-[8px] max-h-[48px] min-h-[48px] h-[48px] dark:bg-gray-800 dark:border-b-[1px] dark:border-gray-100 dark:border-opacity-15 ">

        <div class="flex flex-wrap justify-between items-center mx-auto my-auto ">

        <div class="flex dark:bg-white    dark:hover:bg-opacity-10  dark:bg-opacity-0  bg-black rounded-sm bg-opacity-0 hover:bg-opacity-10  items-center justify-center w-[32px] h-[32px]">
            <button class="w-[32px] h-[32px] mx-auto flex items-center justify-center">
            <svg class="dark:fill-white fill-slate-700" width="20" height="20" role="presentation" focusable="false" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4 5C4 4.44772 4.44772 4 5 4H7C7.55228 4 8 4.44772 8 5V7C8 7.55228 7.55228 8 7 8H5C4.44772 8 4 7.55228 4 7V5ZM4 11C4 10.4477 4.44772 10 5 10H7C7.55228 10 8 10.4477 8 11V13C8 13.5523 7.55228 14 7 14H5C4.44772 14 4 13.5523 4 13V11ZM11 4C10.4477 4 10 4.44772 10 5V7C10 7.55228 10.4477 8 11 8H13C13.5523 8 14 7.55228 14 7V5C14 4.44772 13.5523 4 13 4H11ZM10 11C10 10.4477 10.4477 10 11 10H13C13.5523 10 14 10.4477 14 11V13C14 13.5523 13.5523 14 13 14H11C10.4477 14 10 13.5523 10 13V11ZM17 4C16.4477 4 16 4.44772 16 5V7C16 7.55228 16.4477 8 17 8H19C19.5523 8 20 7.55228 20 7V5C20 4.44772 19.5523 4 19 4H17ZM16 11C16 10.4477 16.4477 10 17 10H19C19.5523 10 20 10.4477 20 11V13C20 13.5523 19.5523 14 19 14H17C16.4477 14 16 13.5523 16 13V11ZM5 16C4.44772 16 4 16.4477 4 17V19C4 19.5523 4.44772 20 5 20H7C7.55228 20 8 19.5523 8 19V17C8 16.4477 7.55228 16 7 16H5ZM10 17C10 16.4477 10.4477 16 11 16H13C13.5523 16 14 16.4477 14 17V19C14 19.5523 13.5523 20 13 20H11C10.4477 20 10 19.5523 10 19V17ZM17 16C16.4477 16 16 16.4477 16 17V19C16 19.5523 16.4477 20 17 20H19C19.5523 20 20 19.5523 20 19V17C20 16.4477 19.5523 16 19 16H17Z" ></path></svg>

            </button>
        </div>

        <div class="dark:bg-white   dark:hover:bg-opacity-10 dark:bg-opacity-0  bg-black rounded-sm bg-opacity-0 hover:bg-opacity-10 w-[91px] h-[32px] my-auto p-2 items-center mr-auto">

          <a  [routerLink]="['/']" (click)="emitRoute(); boardsS.set(false)"  class="flex items-center my-auto">
              <svg class="dark:fill-white fill-slate-700 object-cover" viewBox="9.512 10.62 163.685 38.524" xmlns="http://www.w3.org/2000/svg">
                <path d="M 43.233 10.876 C 45.865 10.889 47.991 13.027 47.991 15.659 L 47.991 44.347 C 47.991 46.979 45.865 49.117 43.233 49.13 L 14.538 49.13 C 11.897 49.13 9.756 46.989 9.756 44.347 L 9.756 15.653 C 9.754 14.382 10.258 13.163 11.156 12.265 C 12.053 11.368 13.27 10.864 14.538 10.864 L 43.233 10.864 L 43.233 10.876 Z M 26.397 18.141 C 26.397 16.874 25.37 15.847 24.103 15.847 L 17.038 15.847 C 15.764 15.84 14.729 16.873 14.732 18.147 L 14.732 39.85 C 14.746 41.112 15.776 42.127 17.038 42.12 L 24.103 42.12 C 25.361 42.12 26.384 41.108 26.397 39.85 L 26.397 18.141 Z M 43.045 18.141 C 43.045 16.874 42.018 15.847 40.751 15.847 L 33.668 15.847 C 32.399 15.847 31.37 16.878 31.374 18.147 L 31.374 30.285 C 31.374 31.552 32.401 32.579 33.668 32.579 L 40.751 32.579 C 42.018 32.579 43.045 31.552 43.045 30.285 L 43.045 18.141 Z M 31.858 40.071 L 31.027 42.566 L 30.249 40.071 L 27.29 40.071 L 27.29 46.843 L 29.579 46.843 L 29.579 43.884 L 30.044 45.601 L 31.901 45.601 L 32.42 43.873 L 32.42 46.843 L 34.709 46.843 L 34.709 40.071 L 31.858 40.071 Z M 37.593 39.661 L 35.217 39.661 L 35.217 41.259 L 37.593 41.259 L 37.593 39.661 Z M 37.593 41.508 L 35.217 41.508 L 35.217 46.843 L 37.593 46.843 L 37.593 41.508 Z M 40.422 43.581 C 40.458 43.567 40.499 43.556 40.546 43.549 C 40.593 43.541 40.641 43.538 40.692 43.538 C 40.764 43.538 40.818 43.558 40.854 43.598 C 40.89 43.637 40.908 43.703 40.908 43.797 L 40.908 46.843 L 43.284 46.843 L 43.284 43.149 C 43.284 42.573 43.153 42.137 42.89 41.843 C 42.627 41.547 42.243 41.4 41.739 41.4 C 41.408 41.4 41.119 41.455 40.87 41.567 C 40.621 41.679 40.404 41.85 40.217 42.08 L 40.184 42.08 L 40.098 41.508 L 38.046 41.508 L 38.046 46.843 L 40.422 46.843 L 40.422 43.581 Z M 46.092 39.661 L 43.716 39.661 L 43.716 41.259 L 46.092 41.259 L 46.092 39.661 Z M 46.092 41.508 L 43.716 41.508 L 43.716 46.843 L 46.092 46.843 L 46.092 41.508 Z" fill-rule="evenodd" transform="matrix(0.9999999999999999, 0, 0, 1, 0, 0)"/>
                <path d="M 81.217 15.916 L 81.217 25.51 L 74.993 25.51 L 74.993 45.26 L 64.369 45.26 L 64.369 25.51 L 58.145 25.51 L 58.145 15.916 L 81.217 15.916 Z M 92.775 45.26 L 82.479 45.26 L 82.479 22.141 L 92.12 22.141 L 92.401 23.919 L 92.588 23.919 C 93.244 23.108 93.922 22.515 94.624 22.141 C 95.326 21.766 96.067 21.579 96.847 21.579 C 97.222 21.579 97.487 21.579 97.643 21.579 C 97.799 21.579 97.971 21.595 98.157 21.626 L 98.157 31.594 C 97.752 31.532 97.378 31.493 97.034 31.477 C 96.691 31.462 96.348 31.454 96.005 31.454 C 95.319 31.454 94.718 31.493 94.203 31.571 C 93.689 31.649 93.213 31.782 92.775 31.969 L 92.775 45.26 Z M 119.779 36.789 L 119.779 44.277 C 118.687 44.714 117.213 45.08 115.356 45.377 C 113.5 45.674 111.589 45.822 109.623 45.822 C 105.817 45.822 103.064 44.878 101.363 42.99 C 99.663 41.103 98.813 38.053 98.813 33.841 C 98.813 29.691 99.741 26.626 101.597 24.645 C 103.454 22.664 106.317 21.673 110.185 21.673 C 113.867 21.673 116.55 22.391 118.235 23.826 C 119.92 25.261 120.762 27.601 120.762 30.846 C 120.762 31.969 120.747 32.897 120.715 33.63 C 120.684 34.363 120.622 35.136 120.528 35.947 L 108.875 35.947 C 108.906 36.508 109.101 36.89 109.46 37.093 C 109.819 37.296 110.419 37.398 111.261 37.398 C 112.759 37.398 114.304 37.335 115.895 37.21 C 117.486 37.085 118.781 36.945 119.779 36.789 Z M 111.776 30.331 C 111.714 29.863 111.574 29.551 111.355 29.395 C 111.137 29.239 110.793 29.161 110.325 29.161 C 109.827 29.161 109.46 29.317 109.226 29.629 C 108.992 29.941 108.875 30.534 108.875 31.407 L 111.823 31.407 C 111.823 31.189 111.823 31.002 111.823 30.846 C 111.823 30.69 111.808 30.518 111.776 30.331 Z M 132.601 14.138 L 132.601 45.26 L 122.305 45.26 L 122.305 14.138 L 132.601 14.138 Z M 144.863 14.138 L 144.863 45.26 L 134.567 45.26 L 134.567 14.138 L 144.863 14.138 Z M 170.649 33.747 C 170.649 38.053 169.706 41.142 167.818 43.014 C 165.93 44.886 162.818 45.822 158.481 45.822 C 154.269 45.822 151.196 44.855 149.262 42.92 C 147.328 40.985 146.36 37.928 146.36 33.747 C 146.36 29.442 147.296 26.353 149.168 24.481 C 151.04 22.609 154.145 21.673 158.481 21.673 C 162.725 21.673 165.814 22.64 167.748 24.574 C 169.682 26.509 170.649 29.566 170.649 33.747 Z M 156.656 33.607 C 156.656 34.636 156.781 35.338 157.03 35.713 C 157.28 36.087 157.764 36.274 158.481 36.274 C 159.199 36.274 159.691 36.087 159.955 35.713 C 160.221 35.338 160.353 34.636 160.353 33.607 C 160.353 32.577 160.221 31.875 159.955 31.501 C 159.691 31.126 159.199 30.939 158.481 30.939 C 157.764 30.939 157.28 31.126 157.03 31.501 C 156.781 31.875 156.656 32.577 156.656 33.607 Z"  transform="matrix(0.9999999999999999, 0, 0, 1, 0, 0)"/>
              </svg>
          </a>
        </div>
        <div class="relative mr-auto">
          <button id="Button" (click)="boardsS.set(!boardsS())" [ngClass]="[boardsS() ? 'flex hover:dark:bg-blue-900  p-1 px-3 gap-1 rounded-sm  flex-row items-center button font-semibold hover:bg-opacity-30 hover:bg-blue-500 dark:font-semibold fill-blue-500 text-blue-500 bg-blue-400 bg-opacity-25 dark:fill-blue-500 dark:text-blue-500 dark:bg-opacity-50 dark:bg-blue-800' : 'flex p-1 px-3 gap-1 rounded-sm flex-row items-center dark:font-semibold font-semibold dark:fill-white dark:text-white hover:dark:bg-white hover:dark:bg-opacity-15 hover:bg-black hover:bg-opacity-15']"  >
          Boards
          <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 -960 960 960" width="16"><path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"/></svg>
        </button>
        <div id="Container" *ngIf="boardsS()" class="dont absolute max-w-[300px] min-h-[200px] max-h-[200px] overflow-y-scroll scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-400
         dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-600 min-w-[250px] shadow-xl dark:bg-gray-700 mt-3 -left-20 rounded-xl bg-white dark:border-gray-500 border-[0.5px] p-2">
          @if(boards.length > 0){

              <button [routerLink]="['/board',board.id, board.name]" (click)="emitRoute();  boardsS.set(false)" class="w-full h-[50px] flex items-center p-2 dark:bg-white  dark:hover:bg-opacity-10 dark:bg-opacity-0 dark:text-gray-300 text-gray-700  bg-black rounded-sm bg-opacity-0 hover:bg-opacity-10 " *ngFor="let board of boards">
                <span>{{board.name}}</span>
                <svg class="ml-auto fill-gray-700 dark:fill-gray-300" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
              </button>
          }@else{
            <img class="pointer-events-none" src="assets/Img/come.svg">
            <p class="dark:text-gray-300 text-gray-700 text-center leading-4 my-5">You don't have boards, create one!</p>
          }
        </div>
        </div>
        <div class="flex dark:bg-white  dark:hover:bg-opacity-10 dark:bg-opacity-0  bg-black rounded-full bg-opacity-0 hover:bg-opacity-10  items-center justify-center w-[32px] h-[32px]">
            <button (click)="toggleTheme()" class="w-[24px] h-[24px]  rounded-full">
              @if (theme() === 'dark') {
                <img   src="assets/Img/sun.svg" class="object cover">
              }@else {
                <img  src="assets/Img/moon.svg" class="object cover">
              }

            </button>
        </div>
        <div class="flex dark:bg-white dark:hover:bg-opacity-10 dark:bg-opacity-0  bg-black rounded-full bg-opacity-0 hover:bg-opacity-10  items-center justify-center w-[32px] h-[32px]">
            <button  class="w-[24px] h-[24px] rounded-full overflow-hidden">
              @if(user){
                @if (user.photo!==null && user.photo!==undefined){
                <img [src]="user.photo" class="object cover">
              }@else{
                <svg class="fill-purple-500" width="24" height="24" viewBox="0 0 24 24">
                <defs>
                </defs>
                <circle cx="12" cy="12" r="11" class="random-color" />
                <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="12">
                  {{user.username.charAt(0)}}
                </text>
              </svg>
              }
              }

            </button>
        </div>

        </div>

    </nav>

</header>


  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  themeService = inject(ThemeService)
  mainService = inject(MainService)
  cdr = inject(ChangeDetectorRef);
  user!: User;
  boards:any = [];
  constructor() {
    this.themeService.getTheme();
    this.theme.set(this.themeService.getTheme());
    const value = localStorage.getItem('user');
    if(value !== null && value !== undefined){
      const parse = JSON.parse(value);
      this.user = parse as unknown as User;
    }else{
      this.mainService.getUserData().then((res) => {
        res.subscribe((data) => {
          this.user = data;
          localStorage.setItem('user', JSON.stringify(data));
          this.cdr.markForCheck();
        })
      })
    }
    this.getBoards();
  }

  ngOnInit() {
    // Suscripción al evento boardCreated para ejecutar getBoards() cuando se cree un nuevo tablero
    this.mainService.boardCreated.subscribe(() => {
      this.getBoards();
      this.cdr.markForCheck();
    });


    this.mainService.noBoards.subscribe(() => {
      this.boards = [];
      this.getBoards()
      this.cdr.markForCheck();
    } );


  }

  emitRoute(){
    this.mainService.changeRoute.emit();
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


  theme = signal(this.themeService.getTheme());
  perfil = signal(false);
  boardsS = signal(false);
  // hacemos un signal para verificar el tema y dentro del computed verificamos si ya está definido en localstorage
  toggleTheme() {
    this.themeService.toggleTheme();
    this.theme.set(this.themeService.getTheme());

  }

  // @HostListener('document:click', ['$event'])
  // onClickOutside(event: Event) {
  //   const Container = document.getElementById('Container');
  //   const Button = document.getElementById('Button');

  //   if (!Button?.contains(event.target as Node) && !Container?.contains(event.target as Node)) {
  //     this.boardsS.set(false);
  //       }
  // }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.isButtonElement(event.target) && event.target !== document.getElementsByClassName('dont')[0]) {
      this.boardsS.set(false);
    }
}
private isButtonElement(target: EventTarget | null): boolean {
  return target instanceof HTMLButtonElement;
}
}
