import { Injectable } from '@angular/core';
// import { Http, Response, Headers, RequestOptions } from '@angular/http';

// import 'rxjs/add/operator/map';
// import { Observable } from 'rxjs/observable';
import { HttpClientModule, HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GLOBAL } from './global';
import { Estado } from '../models/estado';

@Injectable({
  providedIn: "root"
})
export class EstadoService{
    public server: string;
    public url: string;
    public metodo: string;
    public name: string;

    estadoSeleccionado : Estado;
    estadoList : Estado[];


    constructor(
        public _http: HttpClient
        // public httpClient: HttpClient
    ){
        this.server = GLOBAL.server;
        this.url = GLOBAL.url_config;
        this.metodo = 'mEstado';
    }

    getEstadoList(est: Estado):Observable<any>{
        est.estadoId = 0;
        est.colegioId = 3;
        est.opcionDML = 2;
        est.error = '';
        let body = JSON.stringify(est);
        let headers = new HttpHeaders({"Content-Type": "application/json; charset=utf-8"});

        return this._http.post(this.server + this.url+ this.metodo , body,{headers: headers});


    }

}
