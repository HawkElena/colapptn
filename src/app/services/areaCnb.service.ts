import { Injectable } from '@angular/core';
import { HttpClientModule, HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { AreaCnb } from '../models/areaCnb';
// import { Estado } from '../models/estado';

@Injectable({
  providedIn:"root"
})
export class AreaCnbService{
    public server: string;
    public url: string;
    public metodo: string;
    public name: string;

    areaCnbSeleccionado : AreaCnb;
    seleccionadoParaBloquear: AreaCnb;
    areaCnbList : AreaCnb[];

    constructor(
        public _http: HttpClient        
    ){
        this.server = GLOBAL.server;
        this.url = GLOBAL.url_config;
        this.metodo = 'mArea_Cnb';
    }

    postAreaCnb(ar: AreaCnb):Observable<any>{
       
        let data = JSON.stringify(ar);
        let headers = new HttpHeaders({"Content-Type": "application/json; charset=utf-8"});
        console.log(ar);
        return this._http.post(this.server + this.url+ this.metodo , data,{headers: headers});

    }

    getAreaCnbList(ar: AreaCnb):Observable<any>{
        // alert('listar carreras');
        // ar.id = 0;
        // ar.colegioId = 3;
        // ar.opcionSelect = 0;
        // ar.opcionDML = 2;
        // ar.error = '';        
        let body = JSON.stringify(ar);
        let headers = new HttpHeaders({"Content-Type": "application/json; charset=utf-8"});
        // console.log(body);
        return this._http.post(this.server + this.url+ this.metodo , body,{headers: headers});
    }

}
