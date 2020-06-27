import { Injectable } from '@angular/core';



import { HttpClientModule, HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GLOBAL } from './global';
import { headersToString } from 'selenium-webdriver/http';
import { User } from '../models/user';

@Injectable({
  providedIn:"root"
})
export class UserService{
    public server: string;
    public url: string;
    public metodo: string;
    public name: string;
    usuarioSeleccionado : User;
    usuarioPathList     : User[];

    constructor(

        public httpClient: HttpClient
    ){
        this.server = GLOBAL.server;
        this.url = GLOBAL.url_config;
        this.metodo = 'mLogin'
    }

    // login(login: User): Observable<Session> {
    //     let data = JSON.stringify(login);
    //     let headers = new Headers({"Content-Type": "application/json; charset=utf-8"});
    //     return this._http.post(this.server + this.url + this.metodo + 'login', login).map(this.extractData);
    //     }

    //     logout(): Observable<Boolean> {
    //     return this._http.post(this.basePath + 'logout', {}).map(this.extractData);
    //     }

    //     private extractData(res: Response) {
    //     let body = res.json();
    //     return body;
    //     }

    getUsuarioPathList() {
        this.usuarioPathList = [ {
            colegioId           : 3
            , usuarioId         : 1
            , usuario           : 'luis'
            , password          : '123'
            , email             : 'l@gmail.com'
            , primerNombre      :'Luis'
            , apellido          : 'Herrera'
            , descripcionPath   : 'Alumno'
            , routePath         : '/perfilAlumno'
            , estado            : 1
            , opcionDML         : 1
            },
            {
                colegioId           : 3
                , usuarioId         : 1
                , usuario           : 'luis'
                , password          : '123'
                , email             : 'l@gmail.com'
                , primerNombre      : 'Luis'
                , apellido          : 'Herrera'
                , descripcionPath   : 'Encargado'
                , routePath         : '/encargado,identity'
                , estado            : 1
                , opcionDML         : 1
                }
        ]
    }


    postNivel(){
        // niv.colegioId = 3;
        // niv.opcion_select = 0;
        // niv.opcionDML = 1;
        // let data = JSON.stringify(niv);
        let headers = new HttpHeaders({"Content-Type": "application/json; charset=utf-8"});

        // return this._http.post(this.server + this.url+ this.metodo , data,{headers: headers})
        //                  .map(res => res.json());
    }



}
