import { Injectable } from '@angular/core';

import { HttpClientModule, HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


import { Genero } from '../models/genero';

@Injectable({
  providedIn: "root"
})
export class GeneroSevice{
     generoList: Genero[];

    constructor(  ){

    }


    getGeneroList() {
        this.generoList = [ { generoId: 1, generoNombre: 'M' },
                            { generoId: 2, generoNombre: 'F' }
        ]
    }

}
