import { Injectable } from '@angular/core';

import { HttpClientModule, HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


import { GLOBAL } from './global';
//importar modelos
import { Pago } from '../models/pago';

@Injectable({
  providedIn:"root"
})
export class PagoService{
    public url      : string;
    public metodo   : string;

    montoSeleccionado   : Pago;
    montoList           : Pago[];
    // pagoSeleccionado    : Pago;
    pagoList            : Pago[];
    repList             : Pago[];

    constructor( public _http: HttpClient ){
        // this.server = GLOBAL.server;
        this.url    = GLOBAL.url_pago;
        this.metodo = 'mPagos_Alu';
    }

    postPago(pag: Pago):Observable<any>{
        let data = JSON.stringify(pag);
        let headers = new HttpHeaders({"Content-Type": "application/json; charset=utf-8"});
        console.log(data);
        return this._http.post(this.url+ this.metodo , data,{headers: headers});

    }

    getPagoList(pag: Pago):Observable<any>{
        let body = JSON.stringify(pag);
        let headers = new HttpHeaders({"Content-Type": "application/json; charset=utf-8"});
        // console.log(body);
        return this._http.post(this.url+ this.metodo , body,{headers: headers});
    }

}
