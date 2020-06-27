import { Injectable } from '@angular/core';

import { Seccion } from '../models/seccion';

@Injectable({
  providedIn:"root"
})
export class SeccionService{
     seccionList: Seccion[];

    constructor(  ){

    }

    getSeccionList(){
        this.seccionList = [ {colegioId: 3, seccionId: 1, seccionNombre: 'A' },
                            { colegioId: 3, seccionId: 2, seccionNombre: 'B' },
                            { colegioId: 3, seccionId: 3, seccionNombre: 'C' }
        ]
    }

}
