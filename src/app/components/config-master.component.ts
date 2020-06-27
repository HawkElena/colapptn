import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'config-master',
    templateUrl: '../views/config-master.html',
    providers: [],
    styleUrls: ['../style_hawk/tabs.style.scss']
})

export class ConfigMasterComponent{
    public titulo: string;  
           
    constructor(){ 
        this.titulo = 'Configuración SMART'; 
    }    
  
    ngOnInit(){       
    }


}
