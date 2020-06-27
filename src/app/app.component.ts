import { Component, OnInit,HostListener  } from '@angular/core';
import { SidebarService } from './sidebar/sidebar.service';
import{AuthService} from './auth.service'
import { Router } from '@angular/router';
import {User} from './user'
import { promise } from 'protractor';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'colapptn';
  // esta_logeado:boolean=false;
  private _currentUser: User ={
    id:0
    ,username: ''
    ,password: ''
    ,firstName: ''
    ,lastName: ''
    ,authdata: ''
    ,authlogeado:false
  };

  @HostListener('window:unload')
    private onUnload(): void {
        localStorage.removeItem('currentUser');
    }

  constructor(
              public sidebarservice: SidebarService
              ,public _authservice:AuthService
              ,public _router:Router
              )
              {
                this._authservice.currentUser.subscribe(x => {
                  if(x !== null)
                    this._currentUser = x
                });

   }

   ngOnInit(){
     if(this._authservice.isLoggedIn()){
      this._currentUser.authlogeado= true;
     };
     return this._currentUser.authlogeado;
   }

   logout(){
     this._currentUser.authlogeado=false;
    this._authservice.logout();
    this._router.navigateByUrl('/login');
  }

  toggleSidebar() {
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
  }
  toggleBackgroundImage() {
    this.sidebarservice.hasBackgroundImage = !this.sidebarservice.hasBackgroundImage;
  }
  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  hideSidebar() {
    this.sidebarservice.setSidebarState(true);
  }
  // $('.my-box').boxWidget(options)
  collapse() {
    $('.title').slideToggle(); //
  }

}
