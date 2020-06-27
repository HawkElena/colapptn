import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CarreraJornadaService } from '../services/carreraJornada.service';
import { CarreraJornada } from '../models/carrerajornada';
import { NgForm } from '@angular/forms';
//combos
import { EstadoService } from '../services/estado.service';
import { CarreraService } from '../services/carrera.service';
import { TipoJornadaService } from '../services/tipoJornada.service';
import { NivelService } from '../services/nivel.service';

import { Estado } from '../models/estado';
import { Carrera } from '../models/carrera';
import { TipoJornada } from '../models/tipoJornada';
import { Nivel2 } from '../models/nivel2';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'carrera-jornada',
    templateUrl: '../views/carrera-jornada.html',
    providers: [CarreraJornadaService, EstadoService, CarreraService, TipoJornadaService, NivelService],
    styleUrls: ['../style_hawk/general.style.css']
})

export class CarreraJornadaComponent implements OnInit{
    public titulo: string;  
    /* Nieles2 es un json que se crea alternativamente para mandarlo como parametro en la funcion listar niveles, porque asi lo requiere el servicio */
    public carreraJornadas: CarreraJornada;    
    public msg : string;
    closeResult  : string;    
    /* se declara este objeto porque se debe pasar un json como parametro al servicio */
    estados: Estado;
    carreras: Carrera;
    tipoJornadas: TipoJornada;
    niveles2 : Nivel2;
        
    constructor(private httpClient:HttpClient,
        private _route: ActivatedRoute,
        private _router: Router,
        public carreraJornadaService: CarreraJornadaService,
        // public estadoService: EstadoService,
        public carreraService: CarreraService,
        public tipoJornadaService: TipoJornadaService,
        public nivelService : NivelService,
        public modalService: NgbModal,       
        // private toastr : ToastrService       
    ){
        this.titulo = 'Asociar carreras a jornadas';     
        // this.nivelService.nivelSeleccionado = new Nivel2(null,null,'',null,null,null,'');
        //inicializamos el modelo       
        this.carreraJornadas = new CarreraJornada(0,0,0,0,0,'','',0,'',0,'');
        // this.estados = new Estado(0,0,'',0,'');
        this.tipoJornadas = new TipoJornada(0,0,'',0,0,'');
        this.carreras = new Carrera(0,0,0,'',0,0,0,'');
        this.niveles2 = new Nivel2(0,0,'',0,0,0,'');
        
    }    
  
    ngOnInit(){
        console.log('Se ha cargado el componente carreraJornada.component.ts');
        this.limpiarForm();          
        // this.listarEstado(); 
        this.listarCarrera();
        this.listarJornadas();
        this.listarNiveles();
    }
       
    limpiarForm(form?: NgForm){
        if(form != null)
        form.reset();
        this.carreraJornadaService.carJorSeleccionado= {
            colegioId       : 3,
            nivelId         : null,
            carJorId        : null,
            carreraId       : null,
            jornadaId       : null,
            carreraNombre   : '',
            jornadaNombre   : '',
            estado          : null,
            estadoNombre    : '',
            opcionDML       : null,         
            error: '' 
        }       
    }

    onSubmit(form: NgForm) {
        form.value.colegioId = 3;
        form.value.opcionSelect = 0; //parametro que indica que sp se va a ejecutar en la base de datos
        form.value.error = '';        
        if (form.value.carJorId == null) {
            // alert('Guardamos...' + form.value.carJorId);           
            form.value.carJorId = 0;
            form.value.estado = 1;
            form.value.opcionDML = 1; //parametro que indica que metodo de la clase nivel se va a ejecutar en el servicio 
        } else {
            alert('Editamos...'+ form.value.carJorId);                
            form.value.opcionDML = 3; //parametro que indica que metodo de la clase nivel se va a ejecutar en el servicio 
        }
        this.carreraJornadaService.postCarJornada(form.value)
            .subscribe(data => {
                this.carreraJornadaService.carJorList = data.mCarreraJornadaResult;  
                console.log(this.carreraJornadaService.carJorList);                
                    this.carreraJornadaService.carJorList.forEach(element => {
                        console.log(element.error);
                        this.msg = element.error;                   
                    })                    
                alert(this.msg);
                this.limpiarForm(form);                    
                // this.toastr.success('Nuevo registro guardado con éxito', 'Rgistro de Niveles Educativos');
            })
    }

    /** esta funcion se ejecuta con el evento change del select nivel y le pasa el parámetro nivelId */
    listarCarreraJornada(nivel : any ){   
        /**Le asignamos el valor del nivelId al json que enviamos al servicio */
        this.carreraJornadas.nivelId = nivel;   
            this.carreraJornadaService.getCarJornadaList(this.carreraJornadas).subscribe(
            response => {
                this.carreraJornadaService.carJorList = response.mCarreraJornadaResult;  
                console.log(this.carreraJornadaService.carJorList);              
                // this._router.navigate(["/buscar-nivel"]);                   
            },
            error => {
                console.log(<any>error);
                alert('Error... ' + <any>error);
            }
        );
    }

    /** este método se ejecuta desde el método bloquearDesbloquear()*/
    listarCarreraJornada_bloc(){   
        if(this.carreraJornadaService.seleccionadoParaBloquear.nivelId != 0 || this.carreraJornadaService.seleccionadoParaBloquear.nivelId != null){
            this.carreraJornadaService.getCarJornadaList(this.carreraJornadas).subscribe(
                response => {
                    this.carreraJornadaService.carJorList = response.mCarreraJornadaResult;  
                    console.log(this.carreraJornadaService.carJorList);              
                    // this._router.navigate(["/buscar-nivel"]);                   
                },
                error => {
                    console.log(<any>error);
                    alert('Error... ' + <any>error);
                }
            );
        } else{
        alert('Error al listar');
        }       
    }
  
  
    
    showForEdit(carJor : CarreraJornada){
         this.carreraJornadaService.carJorSeleccionado = Object.assign({}, carJor);    
        //  console.log(this.carreraJornadaService.carJorSeleccionado);         
    }

    bloqearDesbloquear(cj : CarreraJornada){    
        console.log('cj', cj);    
        this.carreraJornadaService.seleccionadoParaBloquear = Object.assign({}, cj);        
        if(this.carreraJornadaService.seleccionadoParaBloquear.estado == 1){ // bloqueamos
            if (confirm(' Precaución!!. Esta acción deshabilitará el registro ¿Desea continuar?')) {   
                this.carreraJornadaService.seleccionadoParaBloquear.estado = 0;                   
                this.carreraJornadaService.seleccionadoParaBloquear.opcionDML = 3; //actualizamos
                this.carreraJornadaService.seleccionadoParaBloquear.colegioId = 3; 
                // this.carreraJornadaService.seleccionadoParaBloquear.opcionSelect = 0;       
                this.carreraJornadaService.postCarJornada(this.carreraJornadaService.seleccionadoParaBloquear)                
                .subscribe(data => {})
                console.log(this.carreraJornadaService.seleccionadoParaBloquear);
                this.listarCarreraJornada_bloc();
            }
        }else if(this.carreraJornadaService.seleccionadoParaBloquear.estado == 0){ // desbloqueamos
            if (confirm(' Precaución!!. Esta acción habilitará el registro. ¿Desea continuar?')) {   //desbloqueamos 
                this.carreraJornadaService.seleccionadoParaBloquear.estado = 1;                   
                this.carreraJornadaService.seleccionadoParaBloquear.opcionDML = 3; //actualizamos
                this.carreraJornadaService.seleccionadoParaBloquear.colegioId = 3;  
                // this.carreraJornadaService.seleccionadoParaBloquear.opcionSelect = 0;      
                this.carreraJornadaService.postCarJornada(this.carreraJornadaService.seleccionadoParaBloquear)                
                .subscribe(data => {})
                this.listarCarreraJornada_bloc();
            }
        }
        
    }
    /* ---------------------------------------AREA DE COMBOS------------------------------------------------ */
    // funcion para llenar el combo de estados en este formulario (se quietara al comunicar componentes)
    // listarEstado(){           
    //     this.estadoService.getEstadoList(this.estados).subscribe(
    //         response => {
    //             this.estadoService.estadoList = response.mEstadoResult;      
    //             // console.log(this.estadoService.estadoList);                         
    //         },
    //         error => {
    //             console.log(<any>error);
    //             alert('Error... ' + <any>error);
    //         }
    //     );
        
    // }

    listarCarrera(){
        this.carreraService.getCarreraList(this.carreras).subscribe(
            response => {
                //alert('buscar nivel')
                this.carreraService.carreraList = response.mCarreraResult;                
                // this._router.navigate(["/buscar-nivel"]);                   
            },
            error => {
                console.log(<any>error);
                alert('Error... ' + <any>error);
            }
        );
    }

    listarJornadas(){
        this.tipoJornadaService.getTipoJornadaList(this.tipoJornadas).subscribe(
            response => {
                //alert('buscar nivel')
                this.tipoJornadaService.tipoJornadaList = response.mTipoJornadaResult;                
                // this._router.navigate(["/buscar-nivel"]);                   
            },
            error => {
                console.log(<any>error);
                alert('Error... ' + <any>error);
            }
        );
    }

    listarNiveles(){
        this.nivelService.getNivelList(this.niveles2).subscribe(
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