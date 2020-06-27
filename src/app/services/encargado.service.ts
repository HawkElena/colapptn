import { Injectable } from '@angular/core';

import { HttpClientModule, HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GLOBAL } from './global';
//importar modelos
import { Encargado } from '../models/encargado'
import { Genero } from '../models/genero';

@Injectable({
  providedIn: "root"
})
export class EncargadoService{
    public url      : string;
    public metodo   : string;
    public msg : string;
    public identity : number;

    encargadoSeleccionado  : Encargado;
    encargadoList          : Encargado[]; /**se usa en la tabla que lista los ancargados de un alumno */
    encargadoList2         : Encargado[]; /**se usa en la tabla que lista los ancargados en el MODAL para asociar un encargado a un alumno y tambien para llenar el formulario para editar*/
    genero              : Genero[];

    constructor( public _http: HttpClient ){
        // this.server = GLOBAL.server;
        this.url    = GLOBAL.url_inscripcion;
        this.metodo = 'mRepresentante';
    }

    postEncargado(enca: Encargado):Observable<any>{
        let data = JSON.stringify(enca);
        let headers = new HttpHeaders({"Content-Type": "application/json; charset=utf-8"});
        // console.log(alu);
        return this._http.post(this.url+ this.metodo , data,{headers: headers});


    }

    getEncargadoList(enca: Encargado):Observable<any>{

        let body = JSON.stringify(enca);
        let headers = new HttpHeaders({"Content-Type": "application/json; charset=utf-8"});
        // console.log(body);
        return this._http.post(this.url+ this.metodo , body,{headers: headers});

    }


}
