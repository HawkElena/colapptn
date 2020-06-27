import { Injectable } from '@angular/core';

import { HttpClientModule, HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GLOBAL } from './global';
import { TipoPago } from '../models/tipoPago';

@Injectable({
  providedIn:"root"
})
export class TipoPagoService{
    public server: string;
    public url: string;
    public metodo: string;
    public name: string;

    tipoPagoSeleccionado  : TipoPago;
    tipoPagoList          : TipoPago[];

    constructor(
        public _http: HttpClient
    ){
        this.server = GLOBAL.server;
        this.url = GLOBAL.url_config;
        this.metodo = 'mTipo_Pago';
    }

    postTipoPago(tp: TipoPago):Observable<any>{
        let data = JSON.stringify(tp);
        let headers = new HttpHeaders({"Content-Type": "application/json; charset=utf-8"});
        // console.log(tp);
        return this._http.post(this.server + this.url+ this.metodo , data,{headers: headers});
    }

    getTipoPagoList(tp: TipoPago):Observable<any>{
        let body = JSON.stringify(tp);
        let headers = new HttpHeaders({"Content-Type": "application/json; charset=utf-8"});

        return this._http.post(this.server + this.url+ this.metodo , body,{headers: headers});

    }

}
