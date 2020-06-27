import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CarreraService } from '../services/carrera.service';
import { Carrera } from '../models/carrera';
import { NgForm } from '@angular/forms';
//combos
import { EstadoService } from '../services/estado.service';
import { NivelService } from '../services/nivel.service';
import { Estado } from '../models/estado';
import { Nivel2 } from '../models/nivel2';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'carrera',
    templateUrl: '../views/carrera.html',
    providers: [CarreraService],
    styleUrls: ['../style_hawk/general.style.css']
    // styleUrls: ['../style_hawk/breadcrumbs.style.css']
})

export class CarreraComponent implements OnInit{
    public titulo: string;  
    public msg : string;
    closeResult  : string;
    /* Nieles2 es un json que se crea alternativamente para mandarlo como parametro en la funcion listar niveles, porque asi lo requiere el servicio */
    public carreras: Carrera;      
    /* se declara este objeto porque se debe pasar un json como parametro al servicio */
    estados: Estado;
    niveles: Nivel2;
        
    constructor(private httpClient:HttpClient,
        private _route: ActivatedRoute,
        private _router: Router,
        public carreraService: CarreraService,
        public estadoService: EstadoService,
        public nivelService: NivelService,
        public modalService: NgbModal,        
        // private toastr : ToastrService       
    ){
        this.titulo = 'Carreras';     
        // this.nivelService.nivelSeleccionado = new Nivel2(null,null,'',null,null,null,'');
        //inicializamos el modelo       
        this.carreras = new Carrera(0,0,0,'',0,0,0,'');
        this.estados = new Estado(0,0,'',0,'');
        this.niveles = new Nivel2(0,0,'',0,0,0,'');        
    }    
  
    ngOnInit(){
        console.log('Se ha cargado el componente carrera.component.ts');
        this.limpiarForm();        
        this.listarEstado(); 
        this.listarNivel();
    }
       
    limpiarForm(form?: NgForm){
        if(form != null)
        form.reset();
        this.carreraService.carreraSeleccionado= {
            colegioId : 3,
            carreraId : null,
            nivelId : null,
            carreraNombre : '',
            estado: null,
            // codEstadoNombre: '',
            opcionDML: null,
            opcionSelect: null,
            error: ''
        }       
    }

    onSubmit(form: NgForm) {
        form.value.colegioId = 3;
        form.value.opcionSelect = 0; //parametro que indica que sp se va a ejecutar en la base de datos
        form.value.error = '';        
        if (form.value.carreraId == null) {
            // alert('Guardamos...' + form.value.carreraId);           
            form.value.carreraId = 0;
            form.value.opcionDML = 1; //parametro que indica que metodo de la clase nivel se va a ejecutar en el servicio 
        } else {
            // alert('Editamos...'+ form.value.carreraId);                
            form.value.opcionDML = 3; //parametro que indica que metodo de la clase nivel se va a ejecutar en el servicio 
        }
        this.carreraService.postCarrera(form.value)
            .subscribe(data => {
                // console.log(this.carreraJornadaService.carJorList);    
                    this.carreraService.carreraList = data.mCarreraResult;            
                    this.carreraService.carreraList.forEach(element => {
                        // console.log(element.error);
                        this.msg = element.error;                   
                    })                    
                alert(this.msg);
                this.limpiarForm(form);
                // this.listarCarrera();        
                // this.toastr.success('Nuevo registro guardado con éxito', 'Rgistro de Niveles Educativos');
            })
    }


    listarCarrera(){      
        // alert('listar carreras')     
        this.carreraService.getCarreraList(this.carreras).subscribe(
            response => {
                this.carreraService.carreraList = response.mCarreraResult;  
                console.log(this.carreraService.carreraList);              
                // this._router.navigate(["/buscar-nivel"]);                   
            },
            error => {
                console.log(<any>error);
                alert('Error... ' + <any>error);
            }
        );
    }
  
    
    showForEdit(cic : Carrera){
         this.carreraService.carreraSeleccionado = Object.assign({}, cic);             
    }

    bloqearDesbloquear(car : Carrera){
        this.carreraService.seleccionadoParaBloquear = Object.assign({}, car); 
        if(this.carreraService.seleccionadoParaBloquear.estado == 1){ // bloqueamos
            if (confirm(' Precaución!!. Esta acción deshabilitará el registro. ¿Desea continuar?')) {   
                this.carreraService.seleccionadoParaBloquear.estado = 0;                   
                this.carreraService.seleccionadoParaBloquear.opcionDML = 3; //actualizamos
                this.carreraService.seleccionadoParaBloquear.colegioId = 3;        
                this.carreraService.postCarrera(this.carreraService.seleccionadoParaBloquear)                
                .subscribe(data => {})
                this.listarCarrera();
            }
        }else if(this.carreraService.seleccionadoParaBloquear.estado == 0){ // desbloqueamos
            if (confirm(' Precaución!!. Esta acción habilitará el registro. ¿Desea continuar?')) {   //desbloqueamos 
                this.carreraService.seleccionadoParaBloquear.estado = 1;                   
                this.carreraService.seleccionadoParaBloquear.opcionDML = 3; //actualizamos
                this.carreraService.seleccionadoParaBloquear.colegioId = 3;        
                this.carreraService.postCarrera(this.carreraService.seleccionadoParaBloquear)                
                .subscribe(data => {})
                this.listarCarrera();
            }
        }        
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

    listarNivel(){
        this.nivelService.getNivelList(this.niveles).subscribe(
            response => {
                //alert('buscar nivel')
                this.nivelService.nivelList = response.mNivelResult;                
                // this._router.navigate(["/buscar-nivel"]);                   
            },
            error => {
                console.log(<any>error);
                alert('Error... ' + <any>error);
            }
        );
    }



    /**-------------------------------------------MODAL--------------------------------------- */

  open(content) {    
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}