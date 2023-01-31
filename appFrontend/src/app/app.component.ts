import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ApiResponse } from './interface/api-response';
import { Page } from './interface/page';
import { UserService } from './service/user.service';
import {map, startWith,catchError} from 'rxjs/operators'
import { off } from 'process';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  usersState$: Observable<{appState: string, appData?: ApiResponse<Page>, error?: HttpErrorResponse}>;
  responseSubject = new BehaviorSubject<ApiResponse<Page>>(null);
  private currentPageSubject = new BehaviorSubject<number>(0);
  currentPage$ = this.currentPageSubject.asObservable();

  constructor(private userService: UserService){}

  ngOnInit(): void{
    this.usersState$ = this.userService.users$().pipe(
      map((response: ApiResponse<Page>)=>{
        this.responseSubject.next(response);
        this.currentPageSubject.next(response.data.page.number);
        console.log(response);
        return ({appState: 'APP_LOADED', appData: response});
      }
    ),
    startWith({appState: 'APP_LOADING'}),
    catchError((error: HttpErrorResponse)=> of({appState: 'APP_ERROR', error}))
    )
  }
goToPage(name?: string, pageNumber?: number): void {
  this.usersState$ = this.userService.users$(name, pageNumber).pipe(
    map((response: ApiResponse<Page>)=> {
      this.responseSubject.next(response);
      this.currentPageSubject.next(pageNumber);
      console.log(response);
      return ({ appState: 'APP_LOADED', appData: response});
    }),
    startWith({ appState: 'APP_LOADED', appData: this.responseSubject.value}),
    catchError((error: HttpErrorResponse)=> of({ appState: 'APP_ERROR', error}))
  );
}

goToNextOfPreviousPage(direction?: string, name?: string): void {
    this.goToPage(name, direction === 'forward' ? this.currentPageSubject.value + 1 : this.currentPageSubject.value - 1);
}



}
