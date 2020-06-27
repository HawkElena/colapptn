import { Injectable } from '@angular/core';

import { HttpClientModule, HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GLOBAL } from './global';
import { Grado } from '../models/grado';

@Injectable({
  providedIn:"root"
})
export class GradoService{
    public server   : string;
    public url      : string;
    public metodo   : string;

    gradoSeleccionado : Grado;
    gradoList : Grado[];

    constructor(
        public _http: HttpClient
    ){
        this.server = GLOBAL.server;
        this.url = GLOBAL.url_config;
        this.metodo = 'mGrado';
    }

    // postCarJornadaGrado(gra: Grado){
    //     // alert('Guardar carJornada en services ');
    //     let data = JSON.stringify(gra);
    //     let headers = new Headers({"Content-Type": "application/json; charset=utf-8"});
    //     // console.log(data);
    //     return this._http.post(this.server + this.url+ this.metodo , data,{headers: headers})
    //                      .map(res => res.json());
    // }

    getGradoList(gra: Grado):Observable<any>{
        // alert('listar carJornadas en service');
        gra.colegioId = 3;
        gra.opcionDML = 2;

        let body = JSON.stringify(gra);
        let headers = new HttpHeaders({"Content-Type": "application/json; charset=utf-8"});

        return this._http.post(this.server + this.url+ this.metodo , body,{headers: headers});

    }

}
