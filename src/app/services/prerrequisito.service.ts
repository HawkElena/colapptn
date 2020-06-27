import { Injectable } from '@angular/core';

import { HttpClientModule, HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


import { GLOBAL } from './global';
import { Prerrequisito } from '../models/prerrequisito';

@Injectable({
  providedIn:"root"
})
export class PrerrequisitoService{
    public server: string;
    public url: string;
    public metodo: string;
    public name: string;

    prerrequisitoSeleccionado  : Prerrequisito;
    prerrequisitoList          : Prerrequisito[];

    constructor(
        public _http: HttpClient
    ){
        this.server = GLOBAL.server;
        this.url = GLOBAL.url_config;
        this.metodo = 'mPrerrequisito';
    }

    postPrerrequisito(pre: Prerrequisito):Observable<any>{
        let data = JSON.stringify(pre);
        let headers = new HttpHeaders({"Content-Type": "application/json; charset=utf-8"});
        console.log('Prerrequisito: ');
        console.log(data);
        return this._http.post(this.server + this.url+ this.metodo , data,{headers: headers});
    }

}
