import { Component, OnInit, Input } from '@angular/core';
// import { Router, ActivatedRoute, Params } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
import { ConfigPagoService } from '../services/configPago.service';
import { ConfigPagos } from '../models/configPagos';
import { CarreraJornadaService } from '../services/carreraJornada.service';
import { CarreraJornada } from '../models/carrerajornada';

import { NgForm } from '@angular/forms';
//combos
import { EstadoService } from '../services/estado.service';
// import { CarreraService } from '../services/carrera.service';
import { NivelService } from '../services/nivel.service';
// import { GradoService } from '../services/grado.service';
import { CicloService } from '../services/ciclo.service';
import { Ciclo } from '../models/ciclo';

import { Estado } from '../models/estado';
// import { Carrera } from '../models/carrera';
// import { TipoJornada } from '../models/tipoJornada';
import { Nivel2 } from '../models/nivel2';
import { TipoPago } from '../models/tipoPago';
import { TipoPagoService } from '../services/tipoPago.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'config-pagos',
    templateUrl: '../views/config-pagos.html',
    providers: [CarreraJornadaService, ConfigPagoService, EstadoService, NivelService, TipoPagoService],
    styleUrls: ['../style_hawk/general.style.css']
})

export class ConfigPagosComponent implements OnInit {
    public titulo: string;
    /* Nieles2 es un json que se crea alternativamente para mandarlo como parametro en la funcion listar niveles, porque asi lo requiere el servicio */
    public carreraJornadas: CarreraJornada;
    public msg: string;

    /* se declara este objeto porque se debe pasar un json como parametro al servicio */
    estados: Estado;
    niveles2: Nivel2;
    public ciclos: Ciclo;
    public tipoPagos: TipoPago;
    closeResult: string;

    constructor(
        public carreraJornadaService: CarreraJornadaService,
        public estadoService: EstadoService,
        public nivelService: NivelService,
        public cicloService: CicloService,
        public configPagosService: ConfigPagoService,
        public tipoPagoService: TipoPagoService,
        public modalService: NgbModal,

    ) {
        this.titulo = 'Configurar tarifas';
        // this.nivelService.nivelSeleccionado = new Nivel2(null,null,'',null,null,null,'');
        //inicializamos el modelo       
        this.carreraJornadas = new CarreraJornada(0, 0, 0, 0, 0, '', '', 0, '', 0, '');
        this.estados = new Estado(0, 0, '', 0, '');
        this.niveles2 = new Nivel2(0, 0, '', 0, 0, 0, '');
        this.ciclos = new Ciclo(0, 0, 0, '', 0, '', 0, 0, '', 0);
        this.tipoPagos = new TipoPago(0, 0, '', 0, 0, 0);
    }

    ngOnInit() {
        // console.log('Se ha cargado el componente tipoPago.component.ts');
        this.limpiarForm();
        this.listarEstado();
        this.listarNiveles();
        this.listarCiclo();
        this.listarTipoPago();
    }

    limpiarForm(form?: NgForm) {
        if (form != null)
            form.reset();
        this.configPagosService.configPagoSeleccionado = {
            colegioId: null,
            pagoConfigId: null,
            ciclo: null,
            carreraNombre: null,
            monto: null,
            diaLimite: null,
            fechaModificacion: '',
            tipoPagoId: null,
            jcId: null,
            estadoId: null,
            estadoNombre: '',
            fechaIngreso: '',
            opcionDML: null,
            opcionConsulta: null,
            mensajeId: null,
            mensajeNombre: '',
            pagina: null,
            registrosPorPagina: null,
            jornadaId: null,
            jornadaNombre: '',
            tipoPagoNombre: '',
            nivelId: null,
            mora: null
        }
    }

    iniciarModelo() {
        this.configPagosService.configPagoSeleccionado.colegioId = 3;
        this.configPagosService.configPagoSeleccionado.opcionDML = 4;
        this.configPagosService.configPagoSeleccionado.opcionConsulta = 2;
        this.configPagosService.configPagoSeleccionado.carreraNombre = '';
        this.configPagosService.configPagoSeleccionado.diaLimite = 0;
        this.configPagosService.configPagoSeleccionado.estadoId = 0;
        this.configPagosService.configPagoSeleccionado.estadoNombre = '';
        this.configPagosService.configPagoSeleccionado.fechaIngreso = '';
        this.configPagosService.configPagoSeleccionado.fechaModificacion = '';
        this.configPagosService.configPagoSeleccionado.jcId = 0;
        this.configPagosService.configPagoSeleccionado.jornadaId = 0;
        this.configPagosService.configPagoSeleccionado.jornadaNombre = '';
        this.configPagosService.configPagoSeleccionado.mensajeId = 0;
        this.configPagosService.configPagoSeleccionado.mensajeNombre = '';
        this.configPagosService.configPagoSeleccionado.mora = 0;
        this.configPagosService.configPagoSeleccionado.monto = 0;
        this.configPagosService.configPagoSeleccionado.pagina = 0;
        this.configPagosService.configPagoSeleccionado.registrosPorPagina = 0;
        this.configPagosService.configPagoSeleccionado.pagoConfigId = 0;
        this.configPagosService.configPagoSeleccionado.tipoPagoId = 0;
        this.configPagosService.configPagoSeleccionado.tipoPagoNombre = '';
    }

    onSubmit(form: NgForm) {
        console.log('hola')
        if (form.value.pagoConfigId == null) { form.value.pagoConfigId = 0 }
        form.value.colegioId = 3; //inicializamos estos parametros para no tener probleas en la llamada al servicio

        if (form.value.pagoConfigId == 0) {
            // console.log('Guardamos');       
            if (form.value.mora == null) { form.value.mora = 0 }
            if (form.value.diaLimite == null) { form.value.diaLimite = 0 }
            form.value.opcionDML = 1; //parametro que indica que metodo de la clase nivel se va a ejecutar en el servicio
            this.configPagosService.postConfigPago(form.value)
                .subscribe(data => {
                    this.configPagosService.configPagoList = data.mConfig_Pagos_ColResult;

                    this.configPagosService.configPagoList.forEach(element => {
                        // console.log(element.mensajeNombre);
                        this.msg = element.mensajeNombre;
                    })
                    alert(this.msg);
                    this.configPagosService.configPagoSeleccionado.monto = null;
                    this.configPagosService.configPagoSeleccionado.pagoConfigId = null;
                })
        } else {
            // console.log('Editamos');
            if (form.value.mora == null) { form.value.mora = 0 }
            if (form.value.diaLimite == null) { form.value.diaLimite = 0 }
            form.value.opcionDML = 3; //parametro que indica que metodo de la clase nivel se va a ejecutar en el servicio 
            this.configPagosService.postConfigPago(form.value)
                .subscribe(data => {
                    this.configPagosService.configPagoList = data.mConfig_Pagos_ColResult;
                    this.configPagosService.configPagoList.forEach(element => {
                        // console.log(element.mensajeNombre);
                        this.msg = element.mensajeNombre;
                    })
                    this.limpiarForm(form);
                    alert(this.msg);

                })
        }
    }

    // listarConfigPagos() {
    //     if (this.configPagosService.configPagoSeleccionado.nivelId != null && this.configPagosService.configPagoSeleccionado.ciclo != null) {
    //         //para poner en sero todos los nullos y lo acepte el servicio .net
    //         this.iniciarModelo();
    //         this.configPagosService.getConfigPagoList(this.configPagosService.configPagoSeleccionado).subscribe(
    //             response => {                    
    //                 this.configPagosService.configPagoList = response.mConfig_Pagos_ColResult;
    //                 // console.log(this.configPagosService.configPagoList);
    //             },
    //             error => {
    //                 console.log(<any>error);
    //                 alert('Error... ' + <any>error);
    //             }
    //         );
    //     } else {
    //         alert('Seleccione ciclo escolar y nivel educativo');
    //     }
    //     this.limpiarForm();
    // }

    listarConfigPagos(form: NgForm) {
        if (form.value.nivelId != null && form.value.ciclo != null) {
            this.configPagosService.configPagoSeleccionado.nivelId = form.value.nivelId;
            this.configPagosService.configPagoSeleccionado.ciclo = form.value.ciclo;
            //para poner en sero todos los nullos y lo acepte el servicio .net
            this.iniciarModelo();
            this.configPagosService.getConfigPagoList(this.configPagosService.configPagoSeleccionado).subscribe(
                response => {
                    this.configPagosService.configPagoList = response.mConfig_Pagos_ColResult;
                    console.log(this.configPagosService.configPagoList);
                },
                error => {
                    console.log(<any>error);
                    alert('Error... ' + <any>error);
                }
            );
        } else {
            alert('Seleccione ciclo escolar y nivel educativo');
        }
        this.limpiarForm();
    }

    showForEdit(configPago: ConfigPagos) {
        this.configPagosService.configPagoSeleccionado = Object.assign({}, configPago);
        // this.configPagosService.configPagoSeleccionado.jcId = Object.assign({}, configPago.jcId);
    }

    /* ---------------------------------------AREA DE COMBOS------------------------------------------------ */
    /** esta funcion se ejecuta con el evento change del select nivel y le pasa el parámetro nivelId */
    listarCarreraJornada(nivel: any) {
        /**Le asignamos el valor del nivelId al json que enviamos al servicio */
        if (nivel != null) {
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

    }


    // funcion para llenar el combo de estados en este formulario (se quietara al comunicar componentes)
    listarEstado() {
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

    listarTipoPago() {
        this.tipoPagos.colegioId = 3;
        this.tipoPagos.opcionDML = 4;
        this.tipoPagos.opcionSelect = 1;
        this.tipoPagoService.getTipoPagoList(this.tipoPagos).subscribe(
            response => {
                this.tipoPagoService.tipoPagoList = response.mTipo_PagoResult;
            },
            error => {
                console.log(<any>error);
                alert('Error... ' + <any>error);
            }
        );
    }


    listarNiveles() {
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

    listarCiclo() {
        this.ciclos.cicloId = 0;
        this.ciclos.anio = 0;
        this.ciclos.colegioId = 3;
        this.ciclos.opcionDML = 2;
        this.ciclos.error = '';
        this.ciclos.opcionSelect = 1;
        this.cicloService.getCicloList(this.ciclos).subscribe(
            response => {
                this.cicloService.cicloList = response.mCicloResult;
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