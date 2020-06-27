import { Injectable } from '@angular/core';
import { HttpClientModule, HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
// import { Area } from '../models/area';
import { Empleado } from '../models/empleado';
// import { Esdocente } from '../models/esdocente';
// import { Estado } from '../models/estado';

@Injectable({
  providedIn:"root"
})
export class EmpleadoService{
    public server: string;
    public url: string;
    public metodo: string;
    public name: string;

    empleadoSeleccionado : Empleado;
    empleadoList : Empleado[];
    jefeList : Empleado[];
    docenteList: Empleado[];
    // esdocenteArr : Esdocente[];

    constructor(
        public _http: HttpClient
        // public httpClient: HttpClient
    ){
        this.server = GLOBAL.server;
        this.url = GLOBAL.url_inscripcion ;
        this.metodo = 'mEmpleado';
    }

    postEmpleado(emp: Empleado):Observable<any>{
        // alert('Guardar carrera');
        let data = JSON.stringify(emp);
        let headers = new HttpHeaders({"Content-Type": "application/json; charset=utf-8"});
        console.log(emp);
        return this._http.post(this.url + this.metodo , data,{headers: headers});

    }

    getEmpleadoList(emp: Empleado):Observable<any>{
        let body = JSON.stringify(emp);
        let headers = new HttpHeaders({"Content-Type": "application/json; charset=utf-8"});
        return this._http.post(this.url + this.metodo , body,{headers: headers});
    }

    getOpcionesEsDocente() {
        // this.esdocenteArr = [ {esDocente: 1, esDocenteOpc: 'Si' },
        //                     { esDocente: 0, esDocenteOpc: 'No' }
        // ]
    }

}
