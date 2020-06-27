import { Injectable } from '@angular/core';


import { HttpClientModule, HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GLOBAL } from './global';
// import { headersToString } from 'selenium-webdriver/http';
// import { User } from '../models/user';
//importar modelos
import { Alumno } from '../models/alumno'
import { Genero } from '../models/genero';

@Injectable({
  providedIn:"root"
})
export class RegistroAlumnoSevice{
    public url      : string;
    public metodo   : string;
    public msg : string;
    public identity : number;
    /**Notar que alumnoSeleccionado se le esta asignando el valor de la Clase Alumno */
    alumnoSeleccionado  : Alumno;
    alumnoList          : Alumno[];
    genero              : Genero[];

    constructor( public _http: HttpClient ){
        // this.server = GLOBAL.server;
        this.url    = GLOBAL.url_inscripcion;
        this.metodo = 'mAlumno';
    }

      //     headers: new HttpHeaders ({
        //         'Content-Type': 'application/json'
        //         ,'Accept': 'application/json'
        //         ,'Access-Control-Allow-Origin':     'http://localhost:61247'
        //         ,'Access-Control-Allow-Methods':    'GET, POST, PUT, DELETE, OPTIONS, HEAD'
        //         ,'Access-Control-Allow-Headers':    'X-PINGOTHER, Access-Control-*, Origin, X-Requested-With, Content-Type, Accept, x-auth'
        //         ,'Access-Control-Allow-Credentials' : 'false'
        //         ,'Access-Control-Expose-Headers': 'X-My-Custom-Header, X-Another-Custom-Header, Access-Control-*'
        //     })
    postAlumno(alu: Alumno):Observable<any>{
        let data = JSON.stringify(alu);
        let headers = new HttpHeaders({"Content-Type": "application/json; charset=utf-8"});
        // let headers = new HttpHeaders({
        //   "Content-Type": "application/json; charset=utf-8"
        //   , 'Access-Control-Allow-Origin': 'http://localhost:2864/Configuracion.svc'
        //   , 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, HEAD'
        //   , 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, x-auth'
        // });

        // console.log(alu);
        return this._http.post(this.url+ this.metodo , data,{headers: headers});

        // this._http.post(this.url+ this.metodo , data,{headers: headers})
        //     .map((data: Response) => {
        //         return data.json() as Alumno[];
        //     }).toPromise().then(x => {
        //         console.log(x);
        //         this.alumnoList = x;
        //     })
    }


    getAlumnoList(alu: Alumno):Observable<any>{
        // alert('Vamos a listar alumnos');
        let body = JSON.stringify(alu);
        let headers = new HttpHeaders({"Content-Type": "application/json; charset=utf-8"});

        return this._http.post(this.url+ this.metodo , body,{headers: headers});

        // this._http.post(this.url+ this.metodo , body,{headers: headers})
        //     .map((data: Response) => {
        //         return data.json() as Alumno[];
        //     }).toPromise().then(x => {
        //         console.log(x);
        //         this.alumnoList = x.mAlumnoResult;
        //     })
    }



}
