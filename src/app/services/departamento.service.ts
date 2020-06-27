import { Injectable } from '@angular/core';

import { HttpClientModule, HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GLOBAL } from './global';
import { Departamento } from '../models/departamento';

@Injectable({
  providedIn:"root"
})
export class DepartamentoService{
    public server: string;
    public url: string;
    public metodo: string;
    public name: string;

    departamentoSeleccionado : Departamento;
    departamentoList : Departamento[];

    constructor(
        public _http: HttpClient
        // public httpClient: HttpClient
    ){
        this.server = GLOBAL.server;
        this.url = GLOBAL.url_config;
        this.metodo = 'mDepto';
    }

    getDepartamentoList(departamento: Departamento):Observable<any>{
        departamento.departamentoId     =   0;
        departamento.opcionDML          =   4;
        departamento.departamentoNombre =   '';
        departamento.estadoId           =   0;

        let body = JSON.stringify(departamento);
        let headers = new HttpHeaders({"Content-Type": "application/json; charset=utf-8"});

        return this._http.post(this.server + this.url+ this.metodo , body,{headers: headers});
    }

}
