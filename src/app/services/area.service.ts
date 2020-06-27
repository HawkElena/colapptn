import { Injectable } from '@angular/core';
import { HttpClientModule, HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// import { Observable } from 'rxjs/observable';
import { GLOBAL } from './global';
import { Area } from '../models/area';
import { Estado } from '../models/estado';

@Injectable({
  providedIn:"root"
})
export class AreaService{
    public server: string;
    public url: string;
    public metodo: string;
    public name: string;

    areaSeleccionado : Area;
    areaList : Area[];


    constructor(
        public _http: HttpClient
        // public httpClient: HttpClient
    ){
        this.server = GLOBAL.server;
        this.url = GLOBAL.url_config;
        this.metodo = 'mArea';
    }

    postArea(ar: Area):Observable<any>{       
        let data = JSON.stringify(ar);
        let headers = new HttpHeaders({"Content-Type": "application/json; charset=utf-8"});
        console.log(ar);
        return this._http.post(this.server + this.url+ this.metodo , data,{headers: headers});

    }

    getAreaList(ar: Area):Observable<any>{       
        ar.areaId = 0;
        ar.colegioId = 3;     
        ar.opcionSelect = 1;
        ar.opcionDML = 4;
        ar.descripcion_error = '';
        let body = JSON.stringify(ar);
        let headers = new HttpHeaders({"Content-Type": "application/json; charset=utf-8"});
        console.log(body);
        return this._http.post(this.server + this.url+ this.metodo , body,{headers: headers});
    }

}
