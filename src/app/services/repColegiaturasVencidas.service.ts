import { Injectable } from '@angular/core';

import { HttpClientModule, HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GLOBAL } from './global';
import { RepColVencidas } from '../models/reporteColVencidas';

@Injectable({
  providedIn:"root"
})
export class RepColVencidasService{
    public url: string;
    public metodo: string;
    public name: string;

    repColVencidasSeleccionado       : RepColVencidas;
    repColVencidasList               : RepColVencidas[];
    repColVencidasList2              : RepColVencidas[];

    // repColeVencidasList2: Array<any> = [];

    constructor(
        public _http: HttpClient
    ){
        this.url    = GLOBAL.url_pago;
        this.metodo = 'mReportesPagos';
    }

    postRepColVencidas(rep: RepColVencidas):Observable<any>{
        let data = JSON.stringify(rep);
        let headers = new HttpHeaders({"Content-Type": "application/json; charset=utf-8"});
        console.log(rep);
        return this._http.post(this.url+ this.metodo , data,{headers: headers});
    }

}
