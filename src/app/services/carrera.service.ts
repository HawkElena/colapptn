import { Injectable } from '@angular/core';

import { HttpClientModule, HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


// import { Observable } from 'rxjs/observable';
import { GLOBAL } from './global';
import { Carrera } from '../models/carrera';
import { Estado } from '../models/estado';

@Injectable({
  providedIn:"root"
})
export class CarreraService{
    public server: string;
    public url: string;
    public metodo: string;
    public name: string;

    carreraSeleccionado : Carrera;
    seleccionadoParaBloquear : Carrera;
    carreraList : Carrera[];


    constructor(
        public _http: HttpClient
        // public httpClient: HttpClient
    ){
        this.server = GLOBAL.server;
        this.url = GLOBAL.url_config;
        this.metodo = 'mCarrera';
    }

    postCarrera(cic: Carrera):Observable<any>{
        // alert('Guardar carrera');
        let data = JSON.stringify(cic);
        let headers = new HttpHeaders({"Content-Type": "application/json; charset=utf-8"});
        console.log(cic);
        return this._http.post(this.server + this.url+ this.metodo , data,{headers: headers});

    }

    getCarreraList(cic: Carrera):Observable<any>{
        // alert('listar carreras');
        cic.carreraId = 0;
        cic.colegioId = 3;
        cic.opcionSelect = 0;
        cic.opcionDML = 2;
        cic.error = '';
        let body = JSON.stringify(cic);
        let headers = new HttpHeaders({"Content-Type": "application/json; charset=utf-8"});
        // console.log(body);
        return this._http.post(this.server + this.url+ this.metodo , body,{headers: headers});
    }

}
