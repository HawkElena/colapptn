import { Injectable } from '@angular/core';

import { HttpClientModule, HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GLOBAL } from './global';
import { Municipio } from '../models/municipio';

@Injectable({
  providedIn:"root"
})
export class MunicipioService{
    public server: string;
    public url: string;
    public metodo: string;
    public name: string;

    municipioSeleccionado : Municipio;
    municipioList : Municipio[];

    constructor(
        public _http: HttpClient
        // public httpClient: HttpClient
    ){
        this.server = GLOBAL.server;
        this.url = GLOBAL.url_config;
        this.metodo = 'mMuni';
    }

    getMunicipioList(municipio: Municipio):Observable<any>{
        municipio.municipioId     =   0;
        municipio.opcionDML       =   4;
        municipio.municipioNombre =   '';
        municipio.estadoId        =   0;

        let body = JSON.stringify(municipio);
        let headers = new HttpHeaders({"Content-Type": "application/json; charset=utf-8"});

        return this._http.post(this.server + this.url+ this.metodo , body,{headers: headers});
    }

}
