import { Injectable } from '@angular/core';
import { HttpClientModule, HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// import { Observable } from 'rxjs/observable';
import { GLOBAL } from './global';
import { Cargo } from '../models/cargo';
// import { Estado } from '../models/estado';

@Injectable({
  providedIn:"root"
})
export class CargoService{
    public server: string;
    public url: string;
    public metodo: string;
    public name: string;

    cargoSeleccionado : number;
    cargoList : Cargo[];


    constructor(
        public _http: HttpClient
        // public httpClient: HttpClient
        
    ){
        this.server = GLOBAL.server;
        this.url = GLOBAL.url_config;
        this.metodo = 'mCargo';
    }

    postCargo(car: Cargo):Observable<any>{       
        let data = JSON.stringify(car);
        let headers = new HttpHeaders({"Content-Type": "application/json; charset=utf-8"});
        console.log(car);
        return this._http.post(this.server + this.url+ this.metodo , data,{headers: headers});

    }

    getCargoList(car: Cargo):Observable<any>{       
        car.cargoId = 0;
        car.colegioId = 3;     
        car.opcionSelect = 2;
        car.opcionDML = 4;
        car.descripcion_error = '';
        let body = JSON.stringify(car);
        let headers = new HttpHeaders({"Content-Type": "application/json; charset=utf-8"});
        console.log(body);
        return this._http.post(this.server + this.url+ this.metodo , body,{headers: headers});
    }

}
