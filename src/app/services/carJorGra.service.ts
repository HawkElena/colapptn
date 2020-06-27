import { Injectable } from '@angular/core';
// import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { HttpClientModule, HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


import { GLOBAL } from './global';
import { CarreraJornadaGrado } from '../models/carreraJornadaGrado';

@Injectable({
  providedIn: 'root'
})
export class CarJorGraService{
    public server   : string;
    public url      : string;
    public metodo   : string;

    carJorGraSeleccionado : CarreraJornadaGrado;
    /* carJorGraSeleccionado_aux, array creado para correr el medtodo listarCarreraJoranaGradoPR, que lista
    los grados,carrera,jornada y llena el combo carrera en la sección prerrequisito, se crea como auxiliar ya que
    se utilizan los mismos métodos para llenar el select del mismo nombre en el mismo formulario
    y creba conflictos */ 
    carJorGraSeleccionado_aux : CarreraJornadaGrado;  
    seleccionadoParaBloquear : CarreraJornadaGrado;  
    carJorGraList : CarreraJornadaGrado[];
    cJGListPrerrequisito : CarreraJornadaGrado[];//lo utiliza el select grado en el formulario prerrequisito    

    constructor(
        public _http: HttpClient
    ){
        this.server = GLOBAL.server;
        this.url = GLOBAL.url_config;
        this.metodo = 'mCarrera_Jor_Gra';
    }

    postCarJornadaGrado(carJorGra: CarreraJornadaGrado):Observable<any>{
        // alert('Guardar carJornada en services ');
        let data = JSON.stringify(carJorGra);
        let headers = new HttpHeaders({"Content-Type": "application/json; charset=utf-8"});
        return this._http.post(this.server + this.url+ this.metodo , data,{headers: headers});

    }

    getCarJornadaGradoList(carJorGra2: CarreraJornadaGrado):Observable<any>{
        carJorGra2.carJorGraId =0;
        carJorGra2.gradoId =0;
        carJorGra2.estadoId =0;
        carJorGra2.cjgIdPrerrequisito = 0; // quitar
        carJorGra2.errorId = 0;
        carJorGra2.colegioId = 3;
        carJorGra2.opcionDML = 2;
        carJorGra2.nivelId = 0;

        let body = JSON.stringify(carJorGra2);
        let headers = new HttpHeaders({"Content-Type": "application/json; charset=utf-8"});

        return this._http.post(this.server + this.url+ this.metodo , body,{headers: headers});

    }

}
