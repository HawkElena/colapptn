import { Injectable } from '@angular/core';
import { HttpClientModule, HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { GLOBAL } from './global';
//importar modelos
import { Inscripcion } from '../models/inscripcion';
import { Seccion } from '../models/seccion';

@Injectable({
  providedIn:"root"
})
export class InscripcionService{
    public url      : string;
    public metodo   : string;

    public inscripcionSeleccionada     : Inscripcion;
    inscripcionSiguiente        : Inscripcion;
    inscripcionList             : Inscripcion[]; /*para la inscripcion actual*/
    inscripcionList2            : Inscripcion[]; /*Lista para las inscripciones anteriores*/
    inscripcionSiguienteList    : Inscripcion[]; /** Contiene la lista de las distintas posilibidades de incripcion que tiene un alumno */
    seccion                     : Seccion[];

    constructor( public _http: HttpClient ){
        // this.server = GLOBAL.server;
        this.url    = GLOBAL.url_inscripcion;
        this.metodo = 'mInscripcion';
    }

    postInscripcion(ins: Inscripcion):Observable<any>{
        let data = JSON.stringify(ins);
        let headers = new HttpHeaders({"Content-Type": "application/json; charset=utf-8"});
        console.log('data de inscripcion: ')
        console.log(data);
        return this._http.post(this.url+ this.metodo , data,{headers: headers});

    }

    getInscripcionList(ins: Inscripcion):Observable<any>{
        let body = JSON.stringify(ins);
        let headers = new HttpHeaders({"Content-Type": "application/json; charset=utf-8"});
        // console.log(body);
        return this._http.post(this.url+ this.metodo , body,{headers: headers});
    }

}
