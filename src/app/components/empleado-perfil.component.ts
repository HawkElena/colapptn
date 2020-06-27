import { Component } from '@angular/core';
// import { Router, ActivatedRoute, Params } from '@angular/router';
// import { Componete1Component } from '../components/componente1'
 
@Component({
    selector: 'perfil-emp',
    templateUrl: '../views/empleado-perfil.html',
    providers: []
})

export class PerfilEmpleadoComponent{
    public titulo: string;  
           
    constructor(){ 
        this.titulo = 'Mantenimiento de empleados'; 
    }    
  
    ngOnInit(){       
    }


}