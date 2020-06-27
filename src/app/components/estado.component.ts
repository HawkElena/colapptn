import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EstadoService } from '../services/estado.service';
import { Estado } from '../models/estado';
import { NgForm } from '@angular/forms';

import {ToastService} from '../toast/toast.service';

@Component({
    selector: 'estado',
    templateUrl: '../views/estado.html',
    providers: [  EstadoService
                  ,ToastService
              ]
})

export class EstadoComponent implements OnInit{
    public titulo: string;
    /* Nieles2 es un json que se crea alternativamente para mandarlo como parametro en la funcion listar niveles, porque asi lo requiere el servicio */
    public estados: Estado;
    // esta: Estado[];
    estadoSeleccionado: number;
    modifiedText: string;

    constructor(private httpClient:HttpClient,
        private _route: ActivatedRoute,
        private _router: Router,
        public estadoService: EstadoService
        ,public toastservice: ToastService

    ){
        this.titulo = 'Estado';
        //inicializamos el modelo
        this.estados = new Estado(0,0,'',0,'');

    }

    ngOnInit(){
        console.log('Se ha cargado el componente estado.component.ts');
        // this.limpiarForm();
        this.listarEstado();
        this.limpiarForm();
        /* para probar el combo estado */
        // this.esta =[
        //     {colegioId: 3, estadoId: 1, codEstadoNombre: 'juan', opcionDML: 1, error: 'error'},
        //     {colegioId: 3, estadoId: 2, codEstadoNombre: 'juanon', opcionDML: 1, error: 'error'},
        //     {colegioId: 3, estadoId: 3, codEstadoNombre: 'juanito', opcionDML: 1, error: 'error'}
        // ]
        this.estadoSeleccionado = 1;
    }
    /* para probar un evento lanzado desde el combo estado */
    onEstadoSelected(val : any){
        this.customFunction(val);
    }
    customFunction(val : any){
        this.modifiedText = 'the value '+ val +' was selected from dropdown';
    }

    // funcion para llenar el combo de estados en todos los formularios
    listarEstado(){
        this.estadoService.getEstadoList(this.estados).subscribe(
            response => {
                this.estadoService.estadoList = response.mEstadoResult;
                // console.log(this.estadoService.estadoList);
            },
            error => {
                console.log(<any>error);
                this.toastservice.show_mensaje_error('Error... ' + <any>error);
            }
        );

    }

//      selectChange( $event) {
//     //In my case $event come with a id value
//     // this.model.myListOptions = this.listOptions[$event];
//     this.estadoService.estadoSeleccionado = this.estadoService.estadoList[$event];
//     // console.log(this.estadoService.estadoSeleccionado.estadoId);
//   }

  limpiarForm(){
    this.estadoService.estadoSeleccionado= {
        colegioId : 3,
        estadoId : null,
        codEstadoNombre : '',
        opcionDML: null,
        error: ''
    }
    // this.estadoService.estadoSeleccionado.estadoId= 1;
}

}
