import {Component} from '@angular/core';
// import {AuthService} from '../auth.service'
// import {Router} from '@angular/router'
@Component ({
    selector: 'home',
    templateUrl: '../views/home.html'
})

export class HomeComponent {
    public titulo = 'Pagina Principal';

    constructor(
      // private _authservice:AuthService, private router:Router
      ) {

  }

  // logout(){
  //   this._authservice.logout();
  //   this.router.navigateByUrl('/login');
  // }

}
