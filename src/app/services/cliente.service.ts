import { Injectable } from '@angular/core';
// import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';

import { HttpClientModule, HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GLOBAL } from './global';
//importar modelos
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn:"root"
})
export class ClienteService{
    public url      : string;
    public metodo   : string;
    public server   : string;

    clienteSeleccionado   : Cliente;
    clienteList           : Cliente[];
    abrirFormularioAddCli : number;


    constructor( public _http: HttpClient ){
        this.server = GLOBAL.server;
        this.url    = GLOBAL.url_facturacion;
        this.metodo = 'mcliente';
    }

    postCliente(cli: Cliente):Observable<any>{
        let data = JSON.stringify(cli);
        let headers = new HttpHeaders({"Content-Type": "application/json; charset=utf-8"});

        return this._http.post(this.url+ this.metodo , data,{headers: headers});

    }

    getClienteList(cli: Cliente):Observable<any>{
        let body = JSON.stringify(cli);
        let headers = new HttpHeaders({"Content-Type": "application/json; charset=utf-8"});
    //    console.log(body);
        return this._http.post(this.url+ this.metodo , body,{headers: headers});
    }

}
