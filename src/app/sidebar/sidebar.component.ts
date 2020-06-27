import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SidebarService } from './sidebar.service';
// import { MenusService } from './menus.service';
// import {User} from '../user'
// import{AuthService} from '../auth.service'
// import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class SidebarComponent implements OnInit {
  // private _currentUser: User ={
  //   id:0
  //   ,username: ''
  //   ,password: ''
  //   ,firstName: ''
  //   ,lastName: ''
  //   ,authdata: ''
  //   ,authlogeado:false
  // };

  menus = [];
  constructor(
              public sidebarservice: SidebarService
              // ,public _authservice:AuthService
              // ,public _router:Router
    ) {
    this.menus = sidebarservice.getMenuList();
   }

  ngOnInit() {
  }

  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  toggle(currentMenu) {
    if (currentMenu.type === 'dropdown') {
      this.menus.forEach(element => {
        if (element === currentMenu) {
          currentMenu.active = !currentMenu.active;
        } else {
          element.active = false;
        }
      });
    }
  }

  getState(currentMenu) {

    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }

  hasBackgroundImage() {
    return this.sidebarservice.hasBackgroundImage;
  }

//   logout(){
//     this._currentUser.authlogeado=false;
//    this._authservice.logout();
//    this._router.navigateByUrl('/login');
//  }
}
