import { Component, OnInit, Input } from '@angular/core';
// import { Router, ActivatedRoute, Params } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
import { CarreraJornadaService } from '../services/carreraJornada.service';
import { CarreraJornada } from '../models/carrerajornada';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
//combos
import { EstadoService } from '../services/estado.service';
import { CarreraService } from '../services/carrera.service';
import { CarJorGraService } from '../services/carJorGra.service';
import { NivelService } from '../services/nivel.service';
import { GradoService } from '../services/grado.service';
// import { PrerrequisitoService } from '../services/prerrequisito.service';

import { Estado } from '../models/estado';
import { Carrera } from '../models/carrera';
// import { TipoJornada } from '../models/tipoJornada';
import { Nivel2 } from '../models/nivel2';
import { Grado } from '../models/grado';
import { Prerrequisito } from '../models/prerrequisito';
import { CarreraJornadaGrado } from '../models/carreraJornadaGrado';

@Component({
    selector: 'car-jor-gra',
    templateUrl: '../views/carrera-jornada-grado.html',
    providers: [CarreraJornadaService],
    styleUrls: ['../style_hawk/general.style.css']
})

export class CarreraJornadaGradoComponent implements OnInit {
    public titulo: string;
    closeResult: string;
    /* Nieles2 es un json que se crea alternativamente para mandarlo como parametro en la funcion listar niveles, porque asi lo requiere el servicio */
    public carreraJornadas: CarreraJornada;
    public msg: string;
    /* se declara este objeto porque se debe pasar un json como parametro al servicio */
    estados: Estado;
    carreras: Carrera;
    public prerrequisitos: Prerrequisito; //HABILITADO 27-05-2020
    // tipoJornadas: TipoJornada;
    niveles2: Nivel2;
    grados: Grado;
    carJorGraList : CarreraJornadaGrado[]; // para rrecorrer el objeto que devuelve el metodo onSubmit
    
    constructor(
        public carreraJornadaService: CarreraJornadaService,
        public estadoService: EstadoService,
        public carreraService: CarreraService,
        public carJorGraService: CarJorGraService,
        public nivelService: NivelService,
        public gradoService: GradoService,
        // public prerrequisitoService: PrerrequisitoService, //HABILITADO 27-05-2020
        private modalService: NgbModal

        // public flashMensaje: FlashMessageService
        // private toastr : ToastrService       
    ) {
        this.titulo = 'Asociar grados a carreras y jornadas';
        //inicializamos el modelo       
        this.carreraJornadas = new CarreraJornada(0, 0, 0, 0, 0, '', '', 0, '', 0, '');
        this.estados = new Estado(0, 0, '', 0, '');
        this.carreras = new Carrera(0, 0, 0, '', 0, 0, 0, '');
        this.niveles2 = new Nivel2(0, 0, '', 0, 0, 0, '');
        this.grados = new Grado(0, 0, 0, '', 0, '', 0, 0, '');
        // this.prerrequisitos = new Prerrequisito(0, 0, 0, 0, 0, 0, ''); //HABILITADO 27-05-2020

    }

    ngOnInit() {
        console.log('Se ha cargado el componente carreraJornada.component.ts');
        this.limpiarForm();
        // this.limpiarFormInicial();
        // this.listarcarreraJornada();     
        // this.listarEstado();
        // this.listarCarrera();
        // this.listarJornadas();
        this.listarNiveles(1); //para el formulario de asociacion
        this.listarNiveles(2); //para el formulario de prerrequisito
        this.listarGrado();
        // this.limpiarFormPrerrequisito();
        this.limpiarCarJorGraSeleccionado_aux();
    }

    limpiarForm(form?: NgForm) {
        if (form != null)
            form.reset();
        this.carJorGraService.carJorGraSeleccionado = {
            colegioId: null,
            carJorGraId: null,
            carJorId: 0,
            gradoId: null,
            nivelId: null, //para filtrar por nivel
            estadoId: null,
            estadoNombre: '',
            opcionDML: null,
            errorId: null,
            errorNombre: '',
            carreraNombre: '',
            jornadaNombre: '',
            gradoNombre: '',
            opcionConsulta: null,
            nivelPrerrequisitoId: null,
            //----------------------------
            //cjgId               : null,        
            cjgIdPrerrequisito: null,
            carJorIdPrerrequisito : null,
        }
    }

    //este array se creo solo para llenar el select grado en el formulario del prerreqisito,
    limpiarCarJorGraSeleccionado_aux() {
        this.carJorGraService.carJorGraSeleccionado_aux = {
            colegioId: 3,
            carJorGraId: 0,
            carJorId: 0,
            gradoId: 0,
            nivelId: null, //para filtrar por nivel
            estadoId: 0,
            estadoNombre: '',
            opcionDML: 0,
            errorId: 0,
            errorNombre: '',
            carreraNombre: '',
            jornadaNombre: '',
            gradoNombre: '',
            opcionConsulta: 0,            
            //-----select del form ´rerequisito       
            nivelPrerrequisitoId: 0,      
            cjgIdPrerrequisito: 0,
            carJorIdPrerrequisito : 0,
        }
    }


    onSubmit(form: NgForm) {
        
        form.value.colegioId = 3;
        if (form.value.carJorGraId == null) {
            form.value.carJorGraId = 0;
            form.value.estadoId = 1;
            form.value.opcionDML = 1; //guardamos
            this.carJorGraService.postCarJornadaGrado(form.value)
                .subscribe(data => {
                this.carJorGraList = data.mCarrera_Jor_GraResult;
                this.carJorGraList.forEach(element => {
                    this.msg = element.errorNombre;                   
                })
                alert(this.msg);
            })
        } else {
            if (confirm('Se van a guardar los cambios realizados, ¿Desea continuar?')) {
                form.value.opcionDML = 3; //Actualizamos
                this.carJorGraService.postCarJornadaGrado(form.value)
                    .subscribe(data => {
                    this.carJorGraList = data.mCarrera_Jor_GraResult;
                    this.carJorGraList.forEach(element => {        
                        this.msg = element.errorNombre;  
                    })
                    this.listarCarreraJoranaGrado_edit();
                    alert(this.msg);
                })
            }
            
        }
        
    }
    
    //se ejecuta desde el boton buscar en el modal 
    // listarCarreraJoranaGrado() {
    //     // if (this.carJorGraService.carJorGraSeleccionado.opcionDML == 1) { }
    //     // else {
    //         if (this.carJorGraService.carJorGraSeleccionado.nivelId != null && this.carJorGraService.carJorGraSeleccionado.carJorId != null) {
    //             // this.carJorGraService.carJorGraSeleccionado.carJorId = form.value.carJorId;
    //             // this.carJorGraService.carJorGraSeleccionado.nivelId = form.value.nivelId;
    //             // this.open(content);
    //             this.carJorGraService.carJorGraSeleccionado.opcionConsulta = 1;
    //             this.carJorGraService.getCarJornadaGradoList(this.carJorGraService.carJorGraSeleccionado).subscribe(
    //                 response => {
    //                     this.carJorGraService.carJorGraList = response.mCarrera_Jor_GraResult;
    //                     console.log('Esto trae carJorGraService.carJorGraList ->', this.carJorGraService.carJorGraList);
    //                 },
    //                 error => {
    //                     console.log(<any>error);
    //                     alert('Error... ' + <any>error);
    //                 }
    //             );

    //         } else {
    //             alert('Debe seleccionar un nivel y una carrera, previamente.');
    //         }
    //     //}
    //     this.limpiarForm();
    // }

   
    

    //se ejecuta desde el boton buscar en el modal 
    listarCarreraJoranaGrado(form: NgForm) {
        // if (this.carJorGraService.carJorGraSeleccionado.opcionDML == 1) { }
        // else {
            if (form.value.nivelId != null && form.value.carJorId != null) {
                this.carJorGraService.carJorGraSeleccionado.carJorId = form.value.carJorId;
                this.carJorGraService.carJorGraSeleccionado.nivelId = form.value.nivelId;
                // this.open(content);
                this.carJorGraService.carJorGraSeleccionado.opcionConsulta = 1;
                this.carJorGraService.getCarJornadaGradoList(this.carJorGraService.carJorGraSeleccionado).subscribe(
                    response => {
                        this.carJorGraService.carJorGraList = response.mCarrera_Jor_GraResult;
                        console.log('Esto trae carJorGraService.carJorGraList ->', this.carJorGraService.carJorGraList);
                    },
                    error => {
                        console.log(<any>error);
                        alert('Error... ' + <any>error);
                    }
                );

            } else {
                alert('Debe seleccionar un nivel y una carrera, previamente.');
            }
        //}
        this.limpiarForm();
    }
     //se ejecuta desde el metodo bloquearDesbloquear, despues de guardar cambios
    listarCarreraJoranaGrado_bloc() {       
        if (this.carJorGraService.seleccionadoParaBloquear.nivelId != null && this.carJorGraService.seleccionadoParaBloquear.carJorId != null) {
           
            this.carJorGraService.seleccionadoParaBloquear.opcionConsulta = 1;
            this.carJorGraService.getCarJornadaGradoList(this.carJorGraService.seleccionadoParaBloquear).subscribe(
                response => {
                    this.carJorGraService.carJorGraList = response.mCarrera_Jor_GraResult;
                    console.log('Esto trae carJorGraService.carJorGraList ->', this.carJorGraService.carJorGraList);
                },
                error => {
                    console.log(<any>error);
                    alert('Error... ' + <any>error);
                }
            );
        } else {
            alert('Debe seleccionar un nivel y una carrera, previamente.');
        }       
    this.limpiarForm();
    }

     //se ejecuta desde el metodo editar, despues de guardar cambios
     listarCarreraJoranaGrado_edit() {       
        if (this.carJorGraService.carJorGraSeleccionado.nivelId != null && this.carJorGraService.carJorGraSeleccionado.carJorId != null) {
           
            this.carJorGraService.carJorGraSeleccionado.opcionConsulta = 1;
            this.carJorGraService.getCarJornadaGradoList(this.carJorGraService.carJorGraSeleccionado).subscribe(
                response => {
                    this.carJorGraService.carJorGraList = response.mCarrera_Jor_GraResult;
                    console.log('Esto trae carJorGraService.carJorGraList ->', this.carJorGraService.carJorGraList);
                },
                error => {
                    console.log(<any>error);
                    alert('Error... ' + <any>error);
                }
            );
        } else {
            alert('Debe seleccionar un nivel y una carrera, previamente.');
        }       
    this.limpiarForm();
    this.limpiarCarJorGraSeleccionado_aux();
    }
    //Funcion para listar la carrera jornada grado en el select grado del prerrequicito 
    //se ejecuta desde el select Carrera Jornad en el form prerrequisito y desde el método ShowForEdit 
    listarCarreraJornadaGradoPR(carJorIdParam: number) {   
        if(carJorIdParam===null || this.carJorGraService.carJorGraSeleccionado_aux.carJorId === null){           
              return
            }
        this.carJorGraService.cJGListPrerrequisito = null;
        if (this.carJorGraService.carJorGraSeleccionado_aux.carJorId != null) {
            this.carJorGraService.carJorGraSeleccionado_aux.opcionConsulta = 3;           
            this.carJorGraService.carJorGraSeleccionado_aux.carJorId = carJorIdParam;           
            this.carJorGraService.getCarJornadaGradoList(this.carJorGraService.carJorGraSeleccionado_aux).subscribe(
                response => {
                    this.carJorGraService.cJGListPrerrequisito = response.mCarrera_Jor_GraResult;
                    // console.log(this.carJorGraService.cJGListPrerrequisito);
                },
                error => {
                    console.log(<any>error);
                    alert('Error... ' + <any>error);
                }
            );
        } else {
            alert('Seleccione carrera y jornada');
        }        
    }

    showForEdit(carJorGra: CarreraJornadaGrado) {       
        this.carJorGraService.carJorGraSeleccionado = Object.assign({}, carJorGra);        
        this.carJorGraService.carJorGraSeleccionado_aux = Object.assign({}, carJorGra); //form prerrequisito
        this.listarCarreraJornada(carJorGra.nivelPrerrequisitoId, 3); //parametro 2, indica que va a llenar el select nivel del form prerreqisito
        this.listarCarreraJornadaGradoPR(carJorGra.carJorIdPrerrequisito);        
        this.carJorGraService.carJorGraSeleccionado_aux.carJorId = this.carJorGraService.carJorGraSeleccionado.carJorId;
    }



    /* ---------------------------------------AREA DE COMBOS------------------------------------------------ */
    /** esta funcion se ejecuta con los eventos change de los select nivel y le pasa el parámetro nivelId y el selelct que esta enviando la petición*/
    listarCarreraJornada(nivel: any, opc: any) {        
        /**Le asignamos el valor del nivelId al json que enviamos al servicio */
        if (nivel != null) {
            this.carreraJornadas.nivelId = nivel;
            if(opc == 1){ // viene del select nievel del formulario del nuevo grado
                // esto es para resetear el listado de carjor y no seleccione por defecto en el select         
                this.carreraJornadaService.carJorList = null;
                this.carJorGraService.carJorGraList= null;
                this.carreraJornadaService.getCarJornadaList(this.carreraJornadas).subscribe(
                    response => {
                        this.carreraJornadaService.carJorList = response.mCarreraJornadaResult;                       
                    },
                    error => {
                        console.log(<any>error);
                        alert('Error... ' + <any>error);
                    }
                );            
            }else if(opc == 2){ // viene del select nivel del formulario prerrequisito
                this.carreraJornadaService.carJorList_aux = null;
                this.carJorGraService.cJGListPrerrequisito= null;
                this.carreraJornadaService.getCarJornadaList(this.carreraJornadas).subscribe(
                    response => {
                        this.carreraJornadaService.carJorList_aux = response.mCarreraJornadaResult;                       
                    },
                    error => {
                        console.log(<any>error);
                        alert('Error... ' + <any>error);
                    }
                );
            }  
            else if(opc == 3){ // viene del método showForEdit
                // this.carreraJornadaService.carJorList_aux = null;
                this.carJorGraService.cJGListPrerrequisito= null;
                this.carreraJornadaService.getCarJornadaList(this.carreraJornadas).subscribe(
                    response => {
                        this.carreraJornadaService.carJorList_aux = response.mCarreraJornadaResult;                       
                    },
                    error => {
                        console.log(<any>error);
                        alert('Error... ' + <any>error);
                    }
                );
            } 
            
        }

    }


    // funcion para llenar el combo de estados en este formulario (se quietara al comunicar componentes)
    // listarEstado() {
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

    // listarCarrera() {
    //     this.carreraService.getCarreraList(this.carreras).subscribe(
    //         response => {
    //             //alert('buscar nivel')
    //             this.carreraService.carreraList = response.mCarreraResult;
    //             // this._router.navigate(["/buscar-nivel"]);                   
    //         },
    //         error => {
    //             console.log(<any>error);
    //             alert('Error... ' + <any>error);
    //         }
    //     );
    // }
    

    listarNiveles(opc: any) {
        
        this.nivelService.getNivelList(this.niveles2).subscribe(
            response => {
                if (opc == 1) {
                    this.nivelService.nivelList = response.mNivelResult;
                } else if (opc == 2) {
                    this.carreraJornadaService.carJorList_aux = null;
                    this.nivelService.nivelListPrerrequisito = response.mNivelResult;
                }
            },
            error => {
                console.log(<any>error);
                alert('Error... ' + <any>error);
            }
        );
    }


    listarGrado() {
        this.gradoService.getGradoList(this.grados).subscribe(
            response => {
                //alert('buscar nivel')
                this.gradoService.gradoList = response.mGradoResult;
                // this._router.navigate(["/buscar-nivel"]);   
                console.log(this.gradoService.gradoList);
            },
            error => {
                console.log(<any>error);
                alert('Error... ' + <any>error);
            }
        );
    }

    bloqearDesbloquear(cjg : CarreraJornadaGrado){
        // console.log('cjg : CarreraJornadaGrado', cjg);
        this.carJorGraService.seleccionadoParaBloquear = Object.assign({}, cjg); 
        if(this.carJorGraService.seleccionadoParaBloquear.estadoId == 1){ // bloqueamos
            if (confirm(' Precaución!!. Esta acción deshabilitará el registro. ¿Desea continuar?')) {   
                this.carJorGraService.seleccionadoParaBloquear.estadoId = 0;                   
                this.carJorGraService.seleccionadoParaBloquear.opcionDML = 3; //actualizamos
                this.carJorGraService.seleccionadoParaBloquear.colegioId = 3;        
                this.carJorGraService.postCarJornadaGrado(this.carJorGraService.seleccionadoParaBloquear)                
                .subscribe(data => {              
                })
                this.listarCarreraJoranaGrado_bloc();
            }
        }else if(this.carJorGraService.seleccionadoParaBloquear.estadoId == 0){
            if (confirm(' Precaución!!. Esta acción habilitará el registro. ¿Desea continuar?')) {   //desbloqueamos 
                this.carJorGraService.seleccionadoParaBloquear.estadoId = 1;                   
                this.carJorGraService.seleccionadoParaBloquear.opcionDML = 3; //actualizamos
                this.carJorGraService.seleccionadoParaBloquear.colegioId = 3;        
                this.carJorGraService.postCarJornadaGrado(this.carJorGraService.seleccionadoParaBloquear)                
                .subscribe(data => {    
                    // this.areaCnbService.areaCnbList = data.mArea_CnbResult;           
                    // this.areaCnbService.areaCnbList.forEach(element => {                       
                    //         this.msg = element.error;                   
                    //     })                    
                    // alert(this.msg);              
                    //this.toastr.success('Nuevo registro guardado con éxito', 'Rgistro de Niveles Educativos');
                })
                this.listarCarreraJoranaGrado_bloc();
            }
        }
        
    }

    /**--------------------------------------INICIO PANTALLAS MODALES--------------------------------------- */
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