import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import {Hawk_test_service} from '../services/hawk_test.service'
import { Hawk_test} from '../models/hawk_test';

@Component({
    selector: 'hawk_comp',
    templateUrl: '../views/hawk_test.html',
    providers: [
        // EstadoService,
        Hawk_test_service]
})

export class HawkTestComponent implements OnInit{
    public titulo: string;

    public hawk_model : Hawk_test[];

    public resultado_devuelto = new Array();

    constructor(private httpClient:HttpClient,
        private _route: ActivatedRoute,
        private _router: Router,
        public hawk_service:Hawk_test_service
    ){
        this.titulo = 'Estado';

    }

    ngOnInit(){
        console.log('Se ha cargado el componente estado.component.ts');

        this.listarEstado();

    }
    // /* para probar un evento lanzado desde el combo estado */
    onEstadoSelected(val : any){
        this.customFunction(val);
    }
    customFunction(val : any){
        console.log('the value '+ val +' was selected from dropdown');
    }

    // funcion para llenar el combo de estados en todos los formularios
    listarEstado(){

        this.hawk_model = this.hawk_service.prueba(1);
        // this.resultado_devuelto= this.hawk_service.prueba(1);

        this.hawk_model.forEach(element =>{
          console.log("Este es el valor del precio = ",element.nombre);
          console.log("Este es el valor del precio = ",element.precio);
        })
        // this.resultado_devuelto.forEach(element => {
        //   console.log("este es el arreglo devuelto del servicio",element);
        // });

    }

//

  limpiarForm(){



    console.log("Entro al limpiar form");
}

}
