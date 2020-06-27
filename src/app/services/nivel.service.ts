import { Injectable } from '@angular/core';
// import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';

// import {HttpClient} from '@angular/common/http';
import { HttpClientModule, HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';
// import { Observable } from 'rxjs/observable';
import { GLOBAL } from './global';
// import { headersToString } from 'selenium-webdriver/http';
import { Nivel2 } from '../models/nivel2';

@Injectable({
  providedIn: 'root'
})
export class NivelService{
    public server: string;
    public url: string;
    public metodo: string;
    public name: string;

    nivelSeleccionado       : Nivel2;
    seleccionadoParaBloquear : Nivel2;
    nivelList               : Nivel2[];
    nivelListPrerrequisito    : Nivel2[]; // se ejecuta en el modal prerrequisito, asociar carrera/jor/gra prerrequsito

    // nivelList2: Array<any> = [];

    constructor(
        public _http: HttpClient
        // public httpClient: HttpClient
    ){
        this.server = GLOBAL.server;
        this.url = GLOBAL.url_config;
        this.metodo = 'mNivel';
    }

    postNivel(niv: Nivel2):Observable<any>{
        // niv.nivelId = 0;
        // niv.colegioId = 3;
        // niv.opcionSelect = 0;
        // niv.opcionDML = 1;
        let data = JSON.stringify(niv);
        let headers = new HttpHeaders({"Content-Type": "application/json; charset=utf-8"});
        console.log(niv);
        return this._http.post(this.server + this.url+ this.metodo , data,{headers: headers});


    }

    getNivelList(niv: Nivel2):Observable<any>{
        niv.nivelId = 0;
        niv.colegioId = 3;
        niv.opcionSelect = 0;
        niv.opcionDML = 2;
        niv.error = '';
        let body = JSON.stringify(niv);
        let headers = new HttpHeaders({"Content-Type": "application/json; charset=utf-8"});

        return this._http.post(this.server + this.url+ this.metodo , body,{headers: headers});
       
    }

}
