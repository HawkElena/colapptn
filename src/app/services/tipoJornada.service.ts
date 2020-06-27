import { Injectable } from '@angular/core';
// import { Http, Response, Headers, RequestOptions } from '@angular/http';

// import 'rxjs/add/operator/map';
// import { Observable } from 'rxjs/observable';
import { HttpClientModule, HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GLOBAL } from './global';
import { TipoJornada } from '../models/tipoJornada';
import { Estado } from '../models/estado';

@Injectable({
  providedIn:"root"
})
export class TipoJornadaService{
    public server   :  string;
    public url      :  string;
    public metodo   :  string;

    // tipoJornadaSeleccionado : TipoJornada;
    tipoJornadaList : TipoJornada[];


    constructor(
        public _http: HttpClient
        // public httpClient: HttpClient
    ){
        this.server = GLOBAL.server;
        this.url = GLOBAL.url_config;
        this.metodo = 'mTipoJornada';
    }

    // postTipoJornada(jornada: TipoJornada){
    //     alert('Guardar tipoJornada');
    //     let data = JSON.stringify(jornada);
    //     let headers = new Headers({"Content-Type": "application/json; charset=utf-8"});
    //     // console.log(jornada);
    //     return this._http.post(this.server + this.url+ this.metodo , data,{headers: headers})
    //                      .map(res => res.json());
    // }

    getTipoJornadaList(jornada: TipoJornada):Observable<any>{
        // alert('listar tipoJornadas');
        jornada.jornadaId = 0;
        jornada.colegioId = 3;
        jornada.opcionDML = 2;
        jornada.error = '';
        let body = JSON.stringify(jornada);
        let headers = new HttpHeaders({"Content-Type": "application/json; charset=utf-8"});

        return this._http.post(this.server + this.url+ this.metodo , body,{headers: headers});

    }

}
