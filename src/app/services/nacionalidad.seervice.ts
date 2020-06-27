import { Injectable } from '@angular/core';
import { Nacionalidad } from '../models/nacionalidad';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NacionalidadSevice{
    nacionalidadList: Nacionalidad[];

    constructor(  ){

    }

    getNacionalidadList() {
        this.nacionalidadList = [
        { nacionalidadId: 1, nacionalidadNombre: 'Guatemala' },
        { nacionalidadId: 2, nacionalidadNombre: 'Belice' },
        { nacionalidadId: 3, nacionalidadNombre: 'El Salvador' },
        { nacionalidadId: 4, nacionalidadNombre: 'Honduras' }
        ]
    }

}
