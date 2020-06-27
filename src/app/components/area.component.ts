import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AreaService } from '../services/area.service';
import { Area } from '../models/area';
import { NgForm } from '@angular/forms';
//combos
import { EstadoService } from '../services/estado.service';
import { Estado } from '../models/estado';


@Component({
    selector: 'area-admin',
    templateUrl: '../views/area.html',
    providers: [AreaService]
})

export class AreaComponent implements OnInit{
    public titulo: string;  
    public msg : string;    
    public areas: Area;  
    
    /* Area de Combos */
    // estadoSeleccionado: number;
    /* se declara este objeto porque se debe pasar un json como parametro al servicio */
    estados: Estado;
  
        
    constructor(private httpClient:HttpClient,
        private _route: ActivatedRoute,
        private _router: Router,
        public areaService: AreaService,
        public estadoService: EstadoService,  
        // public flashMensaje: FlashMessageService
        // private toastr : ToastrService       
    ){
        this.titulo = 'Areas administrativas';     
        // this.nivelService.nivelSeleccionado = new Nivel2(null,null,'',null,null,null,'');
        //inicializamos el modelo       
        this.areas = new Area(0,0,'',0,0,0,'');
        this.estados = new Estado(0,0,'',0,'');      
        
    }    
  
    ngOnInit(){
        console.log('Se ha cargado el componente area.component.ts');
        this.limpiarForm();        
        this.listarEstado();       
    }
       
    limpiarForm(form?: NgForm){
        if(form != null)
        form.reset();
        this.areaService.areaSeleccionado= {
            colegioId : 3,
            areaId : 0,            
            nombre : '',
            estado: 1,            
            opcionDML: 0,
            opcionSelect: 0,
            descripcion_error: ''
        }       
    }

    onSubmit(form: NgForm) {
        form.value.colegioId = 3;
        form.value.opcionSelect = 0; //parametro que indica que sp se va a ejecutar en la base de datos
        form.value.error = '';        
        if (form.value.areaId == 0) {    
            console.log('vamos a guardar');        
            form.value.opcionDML = 1; //guardamos
        } else {                        
            form.value.opcionDML = 3; //actualizamos
        }
        this.areaService.postArea(form.value)
            .subscribe(data => {    
                this.areaService.areaList = data.mAreaResult;           
                this.areaService.areaList.forEach(element => {
                        // console.log(element.error);
                        this.msg = element.descripcion_error;                   
                    })                    
                alert(this.msg);
                this.limpiarForm(form);
                this.listarArea();        
                // this.toastr.success('Nuevo registro guardado con éxito', 'Rgistro de Niveles Educativos');
            })
    }


    listarArea(){      
        // alert('listar carreras')     
        this.areaService.getAreaList(this.areas).subscribe(
            response => {
                this.areaService.areaList = response.mAreaResult;  
                // console.log(this.carreraService.carreraList);              
                // this._router.navigate(["/buscar-nivel"]);                   
            },
            error => {
                console.log(<any>error);
                alert('Error... ' + <any>error);
            }
        );
    }
  
    
    showForEdit(ar : Area){
         this.areaService.areaSeleccionado = Object.assign({}, ar);             
    }

    /* ---------------------------------------AREA DE COMBOS------------------------------------------------ */
    // funcion para llenar el combo de estados en este formulario (se quietara al comunicar componentes)
    listarEstado(){           
        this.estadoService.getEstadoList(this.estados).subscribe(
            response => {
                this.estadoService.estadoList = response.mEstadoResult;      
                // console.log(this.estadoService.estadoList);                         
            },
            error => {
                console.log(<any>error);
                alert('Error... ' + <any>error);
            }
        );
        
    }  

}