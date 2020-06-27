import { Injectable } from '@angular/core';

import { HttpClientModule, HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// import { Observable } from 'rxjs/observable';
import { GLOBAL } from './global';
import { CarreraJornada } from '../models/carrerajornada';

@Injectable({
  providedIn:"root"
})
export class CarreraJornadaService{
    public server   : string;
    public url      : string;
    public metodo   : string;

    carJorSeleccionado : CarreraJornada;
    seleccionadoParaBloquear : CarreraJornada;
    carJorList : CarreraJornada[];    
    carJorList_aux : CarreraJornada[];//para llenar el select carrera jornada en el formulario prerequisito en el html carrera-jornada-grado

    constructor(
        public _http: HttpClient
        // public httpClient: HttpClient
    ){
        this.server = GLOBAL.server;
        this.url = GLOBAL.url_config;
        this.metodo = 'mCarreraJornada';
    }

    postCarJornada(carJor: CarreraJornada):Observable<any>{
        // alert('Guardar carJornada en services ');
        let data = JSON.stringify(carJor);
        let headers = new HttpHeaders({"Content-Type": "application/json; charset=utf-8"});
        // console.log(data);
        return this._http.post(this.server + this.url+ this.metodo , data,{headers: headers});
    }

    getCarJornadaList(carJor: CarreraJornada):Observable<any>{
        // alert('listar carJornadas en service');
        carJor.colegioId = 3;
        carJor.opcionDML = 2;
        // carJor.nivelId  = 12;

        let body = JSON.stringify(carJor);
        let headers = new HttpHeaders({"Content-Type": "application/json; charset=utf-8"});

        return this._http.post(this.server + this.url+ this.metodo , body,{headers: headers});

    }

}
