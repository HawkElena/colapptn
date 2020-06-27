import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
// import { Componete1Component } from '../components/componente1'
 
@Component({
    selector: 'perfil-alu',
    templateUrl: '../views/alumno-perfil.html',
    providers: []
})

export class PerfilAlumnoComponent{
    public titulo: string;  
           
    constructor(){ 
        this.titulo = 'Perfil'; 
    }    
  
    ngOnInit(){       
    }


}