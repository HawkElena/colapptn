import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// // import { first } from 'rxjs/operators';

// // import { AccountService, AlertService } from '../_services';
// import { User } from  '../user';
// import { AuthService } from  '../auth.service';

import { FormBuilder, FormGroup, Validators } from  '@angular/forms';

import { User } from  '../user';
import { AuthService } from  '../auth.service';

@Component({
            selector:'login'
            ,templateUrl: 'login.component.html'
            ,styleUrls: ['../style_hawk/login.style.css'],
          })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    // loading = false;
    // submitted = false;
     returnUrl: string;
    isSubmitted  =  false;

    // @Output('esta_logeado') output_data_enviar = new EventEmitter;

    constructor(  private authService: AuthService
                  , private router: Router
                  , private formBuilder: FormBuilder
    ) {

    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    // get f() { return this.loginForm.controls; }
    get formControls() { return this.loginForm.controls; }

    // onSubmit() {
    //     this.submitted = true;

    //     // reset alerts on submit
    //     this.alertService.clear();

    //     // stop here if form is invalid
    //     if (this.loginForm.invalid) {
    //         return;
    //     }

    //     this.loading = true;
    //     this.accountService.login(this.f.username.value, this.f.password.value)
    //         .pipe(first())
    //         .subscribe(
    //             data => {
    //                 this.router.navigate([this.returnUrl]);
    //             },
    //             error => {
    //                 this.alertService.error(error);
    //                 this.loading = false;
    //             });
    // }

    login(){
      // console.log(this.loginForm.value);
      this.isSubmitted = true;
      if(this.loginForm.invalid){
        return;
      }
      this.authService.login(this.loginForm.value);
      // this.output_data_enviar.emit(true);
      // this.router.navigateByUrl('/inscripcion/1');
      // this.router.navigateByUrl('/admin');
      this.router.navigateByUrl('/home');

    }

}
