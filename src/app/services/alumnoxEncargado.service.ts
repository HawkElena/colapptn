import { Injectable } from '@angular/core';
import { HttpClientModule, HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GLOBAL } from './global';
//importar modelos
import { AlumnoxEncargado } from '../models/alumnoxEncargado'

@Injectable({
  providedIn: 'root'
})
export class AlumnoxEncargadoService{
    public url      : string;
    public metodo   : string;
    public msg : string;

    alumnoxEncargadoSeleccionado  : AlumnoxEncargado;
    alumnoxEncargadoList          : AlumnoxEncargado[];

    constructor( public _http: HttpClient ){
        // this.server = GLOBAL.server;
        this.url    = GLOBAL.url_inscripcion;
        this.metodo = 'mAlumnoxEncargado';
    }

    postAlumnoxEncargado(aluEnca: AlumnoxEncargado):Observable<any>{
        let data = JSON.stringify(aluEnca);
        let headers = new HttpHeaders({"Content-Type": "application/json; charset=utf-8"});
        // console.log(alu);
        return this._http.post(this.url+ this.metodo , data,{headers: headers});

    }

    getAlumnoxEncargadoList(aluEnca: AlumnoxEncargado):Observable<any>{
        // alert('Vamos a listar alumnoxEncargados');
        let body = JSON.stringify(aluEnca);
        let headers = new HttpHeaders({"Content-Type": "application/json; charset=utf-8"});
        // console.log(body);
        return this._http.post(this.url+ this.metodo , body,{headers: headers});


    }


}
