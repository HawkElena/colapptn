import { Injectable } from '@angular/core';

import { HttpClientModule, HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GLOBAL } from './global';
import { Pais } from '../models/pais';

@Injectable({
  providedIn:"root"
})
export class PaisService{
    public server: string;
    public url: string;
    public metodo: string;
    public name: string;

    paisSeleccionado : Pais;
    paisList : Pais[];

    constructor(
        public _http: HttpClient
        // public httpClient: HttpClient
    ){
        this.server = GLOBAL.server;
        this.url = GLOBAL.url_config;
        this.metodo = 'mPais';
    }

    getPaisList(pais: Pais):Observable<any>{
        pais.paisId             =   0;
        pais.opcionDML          =   4;
        pais.paisNombre         =   '';
        pais.estadoId           =   0;
        pais.opcionSelect       =   1;
        pais.pagina             =   0;
        pais.registrosPorPagina =   0;

        let body = JSON.stringify(pais);
        let headers = new HttpHeaders({"Content-Type": "application/json; charset=utf-8"});

        return this._http.post(this.server + this.url+ this.metodo , body,{headers: headers});

            // this._http.post(this.url+ this.metodo , body,{headers: headers})
            // .map((data: Response) => {
            //     return data.json() as Pais[];
            // }).toPromise().then(x => {
            //     // console.log(x);
            //     this.paisList = x;
            //     console.log(this.paisList)
            // })

    }

}
