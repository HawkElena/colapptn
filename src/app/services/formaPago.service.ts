import { Injectable } from '@angular/core';

import { HttpClientModule, HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GLOBAL } from './global';
//importar modelos
import { FormaPago } from '../models/formaPago';

@Injectable({
  providedIn:"root"
})
export class FormaPagoService{
    public url      : string;
    public metodo   : string;
    public server: string;

    formaPagoSeleccionado   : FormaPago;
    formaPagoList           : FormaPago[];


    constructor( public _http: HttpClient ){
        this.server = GLOBAL.server;
        this.url    = GLOBAL.url_config;
        this.metodo = 'mForma_Pago';
    }

    // postPago(forma: FormaPago){
    //     let data = JSON.stringify(forma);
    //     let headers = new Headers({"Content-Type": "application/json; charset=utf-8"});

    //     return this._http.post(this.url+ this.metodo , data,{headers: headers})
    //                      .map(res => res.json());

    // }

    getFormaPagoList(forma: FormaPago):Observable<any>{
        let body = JSON.stringify(forma);
        let headers = new HttpHeaders({"Content-Type": "application/json; charset=utf-8"});

        return this._http.post(this.server+ this.url+ this.metodo , body,{headers: headers});
    }

}
