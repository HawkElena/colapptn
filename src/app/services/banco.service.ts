import { Injectable } from '@angular/core';
// import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';

import { HttpClientModule, HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GLOBAL } from './global';
//importar modelos
import { Banco } from '../models/banco';

@Injectable({
  providedIn: "root"
})
export class BancoService{
    public url      : string;
    public metodo   : string;
    public server   : string;

    bancoSeleccionado   : Banco;
    bancoList           : Banco[];


    constructor( public _http: HttpClient ){
        this.server = GLOBAL.server;
        this.url    = GLOBAL.url_config;
        this.metodo = 'mBanco';
    }

    // postPago(forma: banco){
    //     let data = JSON.stringify(forma);
    //     let headers = new Headers({"Content-Type": "application/json; charset=utf-8"});

    //     return this._http.post(this.url+ this.metodo , data,{headers: headers})
    //                      .map(res => res.json());

    // }

    getBancoList(ban: Banco):Observable<any>{
        let body = JSON.stringify(ban);
        let headers = new HttpHeaders({"Content-Type": "application/json; charset=utf-8"});
       console.log(body);
        return this._http.post(this.server+ this.url+ this.metodo , body,{headers: headers});
    }

}
