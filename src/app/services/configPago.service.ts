import { Injectable } from '@angular/core';

import { HttpClientModule, HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GLOBAL } from './global';
import { ConfigPagos } from '../models/configPagos';

@Injectable({
  providedIn: "root"
})
export class ConfigPagoService{
    public server   : string;
    public url      : string;
    public metodo   : string;

    configPagoSeleccionado  : ConfigPagos;
    configPagoList          : ConfigPagos[];

    constructor(
        public _http: HttpClient
    ){
        this.server = GLOBAL.server;
        this.url = GLOBAL.url_config;
        this.metodo = 'mConfig_Pagos_Col';
    }

    postConfigPago(configPago: ConfigPagos):Observable<any>{
        // alert('Guardar carJornada en services ');
        let data = JSON.stringify(configPago);
        let headers = new HttpHeaders({"Content-Type": "application/json; charset=utf-8"});
        return this._http.post(this.server + this.url+ this.metodo , data,{headers: headers});
    }

    getConfigPagoList(configPago: ConfigPagos):Observable<any>{
        let body = JSON.stringify(configPago);
        let headers = new HttpHeaders({"Content-Type": "application/json; charset=utf-8"});

        return this._http.post(this.server + this.url+ this.metodo , body,{headers: headers});

    }
}
