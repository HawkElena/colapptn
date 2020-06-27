import { Injectable } from '@angular/core';
import { User } from './user';
import { BehaviorSubject, Observable } from 'rxjs';
import { logging } from 'protractor';
// import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  public _usuer: User = {
                        id:0
                        ,username: ''
                        ,password: ''
                        ,firstName: ''
                        ,lastName: ''
                        ,authdata: ''
                        ,authlogeado:false
                        };

  constructor() {
    this.currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public login(userInfo: User) {
    // localStorage.setItem('ACCESS_TOKEN', "access_token");
    //estas son las cuatro mejoras hoy 2 de junio
    userInfo.authlogeado=true;
    this._usuer.authlogeado= true;
    localStorage.setItem('currentUser', JSON.stringify(userInfo));
    this.currentUserSubject.next(userInfo);
    return userInfo;
  }

  public isLoggedIn() {
    // para cuando se implemente el token de acceso
    // if(localStorage.getItem('ACCESS_TOKEN') == null){
    //   let _currentUser = {"username":"a","password":"a","authlogeado":false}
    //   localStorage.setItem('currentUser', JSON.stringify(_currentUser ));
    // }
    // return localStorage.getItem('ACCESS_TOKEN') !== null;

    // por el momento esta solo para ejemplo de logging

    if(localStorage.getItem('currentUser') == null){
      this._usuer.authlogeado= false;
      localStorage.setItem('currentUser', JSON.stringify(this._usuer));
    }
    return this._usuer.authlogeado;

  }

  public logout() {
    // localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('currentUser');
    // this._usuer =JSON.parse(localStorage.getItem('currentUser'));
    // this._usuer.authlogeado=false;
    // this._usuer.username="";
    // this._usuer.password="";
    // localStorage.setItem('currentUser', JSON.stringify(this._usuer));
  }
  public getToken() {
    // return localStorage.getItem('ACCESS_TOKEN');
    return this._usuer.authlogeado;
  }
}
