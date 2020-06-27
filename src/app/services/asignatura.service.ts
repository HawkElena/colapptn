import { Injectable } from '@angular/core';
import { HttpClientModule, HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Asignatura } from '../models/asignatura';

@Injectable({
  providedIn:"root"
})
export class AreaCnbService{
    public server: string;
    public url: string;
    public metodo: string;
    public name: string;

    asignaturaSeleccionada : Asignatura; 
    seleccionadoParaBloquear: Asignatura; 
    asignaturaList : Asignatura[];

    constructor(
        public _http: HttpClient        
    ){
        this.server = GLOBAL.server;
        this.url = GLOBAL.url_config;
        this.metodo = 'mArea_Cnb';
    }

    postAreaCnb(asi: Asignatura):Observable<any>{       
        let data = JSON.stringify(asi);
        let headers = new HttpHeaders({"Content-Type": "application/json; charset=utf-8"});
        console.log(asi);
        return this._http.post(this.server + this.url+ this.metodo , data,{headers: headers});

    }

    getAreaCnbList(asi: Asignatura):Observable<any>{
        let body = JSON.stringify(asi);
        let headers = new HttpHeaders({"Content-Type": "application/json; charset=utf-8"});        
        return this._http.post(this.server + this.url+ this.metodo , body,{headers: headers});
    }

}
