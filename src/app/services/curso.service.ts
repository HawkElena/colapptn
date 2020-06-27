import { Injectable } from '@angular/core';
import { HttpClientModule, HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { Curso } from '../models/curso';
// import { Estado } from '../models/estado';

@Injectable({
  providedIn:"root"
})
export class CarreraService{
    public server: string;
    public url: string;
    public metodo: string;
    public name: string;

    cursoSeleccionado : Curso;
    cursoList : Curso[];


    constructor(
        public _http: HttpClient        
    ){
        this.server = GLOBAL.server;
        this.url = GLOBAL.url_config;
        this.metodo = 'mCurso';
    }

    postCurso(cur: Curso):Observable<any>{
        // alert('Guardar carrera');
        let data = JSON.stringify(cur);
        let headers = new HttpHeaders({"Content-Type": "application/json; charset=utf-8"});
        console.log(cur);
        return this._http.post(this.server + this.url+ this.metodo , data,{headers: headers});

    }

    getCursoList(cur: Curso):Observable<any>{
        // alert('listar carreras');
        cur.id = 0;
        cur.colegioId = 3;
        cur.opcionSelect = 0;
        cur.opcionDML = 2;
        cur.error = '';
        let body = JSON.stringify(cur);
        let headers = new HttpHeaders({"Content-Type": "application/json; charset=utf-8"});
        // console.log(body);
        return this._http.post(this.server + this.url+ this.metodo , body,{headers: headers});
    }

}
