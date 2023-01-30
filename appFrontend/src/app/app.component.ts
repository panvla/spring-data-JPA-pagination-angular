import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
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

  constructor(private userService: UserService){}

  ngOnInit(): void{
    this.usersState$ = this.userService.users$().pipe(
      map((response: ApiResponse<Page>)=>{
        console.log(response);
        return ({appState: 'APP_LOADED', appData: response});
      }
    ),
    startWith({appState: 'APP_LOADING', }),
    catchError((error: HttpErrorResponse)=> of({appState: 'APP_ERROR', error}))
    )
  }

}
