import { Injectable } from '@angular/core';
// import { Http, Response, Headers, RequestOptions } from '@angular/http';

// import 'rxjs/add/operator/map';
// import { Observable } from 'rxjs/observable';
import { HttpClientModule, HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GLOBAL } from './global';
import { Ciclo } from '../models/ciclo';
import { Estado } from '../models/estado';

@Injectable({
  providedIn: "root"
})
export class CicloService{
    public server: string;
    public url: string;
    public metodo: string;
    public name: string;

    cicloSeleccionado : Ciclo;
    cicloList : Ciclo[];
    cicloSiguienteList : Ciclo[]; /**ciclo habilitado para inscripcion en inscripcion.component */


    constructor(
        public _http: HttpClient
        // public httpClient: HttpClient
    ){
        this.server = GLOBAL.server;
        this.url = GLOBAL.url_config;
        this.metodo = 'mCiclo';
    }

    postCiclo(cic: Ciclo):Observable<any>{
        let data = JSON.stringify(cic);
        let headers = new HttpHeaders({"Content-Type": "application/json; charset=utf-8"});
        console.log(cic);
        return this._http.post(this.server + this.url+ this.metodo , data,{headers: headers});

    }

    getCicloList(cic: Ciclo):Observable<any>{
        let body = JSON.stringify(cic);
        let headers = new HttpHeaders({"Content-Type": "application/json; charset=utf-8"});

        return this._http.post(this.server + this.url+ this.metodo , body,{headers: headers});


    }

}
