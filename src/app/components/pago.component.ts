import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm, Form } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RegistroAlumnoSevice } from '../services/registroAlumno.service';
import { Alumno } from '../models/alumno';
import { EstadoService } from '../services/estado.service';
import { Estado } from '../models/estado';
// import { InscripcionService } from '../services/inscripcion.service';
// import { Inscripcion } from '../models/inscripcion'
import { TipoPago } from '../models/tipoPago';
import { TipoPagoService } from '../services/tipoPago.service';
import { PagoService } from '../services/pago.service';
import { Pago } from '../models/pago';
import { CicloService } from '../services/ciclo.service';
import { Ciclo } from '../models/ciclo';
import { FormaPagoService } from '../services/formaPago.service';
import { FormaPago } from '../models/formaPago';
import { BancoService } from '../services/banco.service';
import { Banco } from '../models/banco';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../models/cliente';
import { ToastService } from '../toast/toast.service';
import { element } from 'protractor';

@Component({
  selector: 'pago',
  templateUrl: '../views/pago_new.html',
  styleUrls: ['../style_hawk/general.style.css'],
  providers: [RegistroAlumnoSevice
    , CicloService
    , PagoService
    , TipoPagoService
    , FormaPagoService
    , BancoService
    , ClienteService
    , ToastService
  ]
  //   styleUrls: ['./componete1.component.css']
})
export class PagoComponent implements OnInit {

  /**------------------------------DECLARACION DE VARIABLES ---------------------------------------- */
  fechaNac: string;
  msg: string;
  closeResult: string;
  public inscripcionPagada: string
  public titulo: string;
  public alumnos: Alumno;
  public estados: Estado;
  // public inscripciones        : Inscripcion;
  public ciclos: Ciclo;
  public tipoPagos: TipoPago;
  public pagos: Pago;
  public formaPagos: FormaPago;
  public bancos: Banco;
  public clientes: Cliente;

  public collapsed_json = {
    first: false,
    second: false,
    third: false,
  };

  public parentData = {
    esHijo: true
    , alumnoId: 0
    , esInscripcion: true
  };
  public num_items_busqueda_alum = [];
  public page = 1;
  public pageSize =10;
  /**-----------------------------------CONSTRUCTOR-------------------------------------------------- */
  constructor(
    private _route: ActivatedRoute,
    public registroAlumnoService: RegistroAlumnoSevice,
    public modalService: NgbModal,
    public estadoService: EstadoService,
    public tipoPagoService: TipoPagoService,
    // private inscripcionService: InscripcionService,
    public cicloService: CicloService,
    public pagoService: PagoService,
    public formaPagoService: FormaPagoService,
    public bancoService: BancoService,
    public clienteService: ClienteService
    , public toastservice: ToastService
  ) {
    // console.log(this._route.snapshot.paramMap.get('id'));
    this.titulo = 'Registro de Pagos de alumnos';
    this.alumnos = new Alumno(0, 0, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0, '', 0, 0, '', 0, 0, 0, 0);
    this.estados = new Estado(0, 0, '', 0, '');
    // this.inscripciones = new Inscripcion(0,0,'',0,0,0,'',0,0,'',0,0,0,0,0,0,0,0,0,0,0,'','','','','',0,'');
    this.ciclos = new Ciclo(0, 0, 0, '', 0, '', 0, 0, '', 0);
    this.pagos = new Pago(0, 0, 0, 0, 0, 0, '', 0, 0, '', 0, 0, 0, 0, '', '', '', 0, 0, 0, 0, '', '', '', 0, 0, '', 0, 0, 0, '', '', '', '', '');
    this.tipoPagos = new TipoPago(0, 0, '', 0, 0, 0);
    this.formaPagos = new FormaPago(0, 0, '', 0, 0);
    this.bancos = new Banco(0, 0, '', 0, 0, 0);
    this.clientes = new Cliente(0, 0, '', '', '', 0, 0, 0, 0, '');
    this.inscripcionPagada = '';
  }

  ngOnInit() {
    let aluId: any;
    this.limpiarForm();
    this.limpiarFormAlu();
    this.limpiarFormCli();
    this.listarEstado();
    this.listarTipoPago();
    this.listarFormaPago();
    this.listarBancos();
    this.listarCiclo(3); /**para listar el ciclo activo  y usar en el boton ver historial*/
    // this.listarCiclo(2); /**para traer el ciclo habilitado para inscripcion */

    aluId = +this._route.snapshot.paramMap.get('id');
    // aluId = 30;
    if (isNaN(aluId) === true) {
      this.registroAlumnoService.alumnoSeleccionado.alumnoId = 0;
    } else {
      this.registroAlumnoService.alumnoSeleccionado.alumnoId = aluId;
    }

    if (this.registroAlumnoService.alumnoSeleccionado.alumnoId > 0) {
      this.buscarAlumnoXId();
    }

  }


  limpiarForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.pagoService.montoSeleccionado = {
      colegioId: null,
      pagoId: null,
      alumnoId: null,
      ciclo: null,
      carreraNombre: '',
      jornadaNombre: '',
      tipoPagoId: null,
      tipoPagoNombre: '',
      monto: null,
      descuento: null,
      diaLimite: null,
      mora: null,
      montoConDescuento: null,
      fechaIngreso: '',
      fechaModificacion: '',
      estadoId: null,
      estadoNombre: '',
      opcionDML: null,
      opcionConsulta: null,
      mensajeId: null,
      mensajeNombre: '',
      formaPagoId: null,
      formaPagoNombre: '',
      bancoId: null,
      bancoNombre: '',
      noBoleta: '',
      fechaDeposito: '',
      clienteId: null,
      clienteNombre: '',
      noFactura: '',
      impuesto: null,
      total: null,
      mesId: null,
      mesNombre: '',
      usuarioId: null
    }
    this.inscripcionPagada = '';
  }


  limpiarFormAlu(form?: NgForm) {
    if (form != null)
      form.reset();
    this.registroAlumnoService.alumnoSeleccionado = {
      alumnoId: null,
      colegioId: 3,
      alumnoNombre1: '',
      alumnoNombre2: '',
      alumnoNombre3: '',
      alumnoApellido1: '',
      alumnoApellido2: '',
      alumnoApellido3: '',
      alumnoCarnet: null,
      codigoMineduc: '',
      identificacion: '', //cui-dpi
      fechaNacimiento: '',
      email: '',
      direccion: '',
      telefono1: '',
      telefono2: '',
      foto: '',
      fechaIngreso: '',
      fechaModificacion: '',
      genero: null,
      municipioId: null,
      departamentoId: null,
      paisId: null,
      nacionalidad: null,
      estadoId: null,
      estadoNombre: '',
      representanteId: null,
      errorId: null,
      errorNombre: '',
      opcionDML: null,
      identity: null,
      opcionConsulta: null,
      descuento: null
    }
  }


  /**onSubmint se ejecuta desde el boton "enviar datos" del formulario para pagos" */
  /**guardar pago */
  onSubmit(form: NgForm) {
    console.log('forma pago id.. ' + form.value.formaPagoId);
    if (form.value.formaPagoId != 0) {
      form.value.colegioId = 3;
      form.value.alumnoId = this.registroAlumnoService.alumnoSeleccionado.alumnoId;
      form.value.clienteId = this.clienteService.clienteSeleccionado.clienteId;
      form.value.ciclo = this.pagoService.montoSeleccionado.ciclo;
      form.value.mesId = this.pagoService.montoSeleccionado.mesId;
      form.value.monto = this.pagoService.montoSeleccionado.monto;
      form.value.mora = this.pagoService.montoSeleccionado.mora;
      form.value.total = this.pagoService.montoSeleccionado.total;
      form.value.noFactura = '';
      form.value.estadoId = this.pagoService.montoSeleccionado.estadoId;

      if (form.value.formaPagoId == 5) {
        form.value.bancoId = 1;
        form.value.fechaDeposito = '';
        form.value.noBoleta = 0;
      }
      console.log('banco es: ' + form.value.bancoId);
      /**Si el jcgId es null entonces guardamos un nuevo registro, sino editamos el registro */
      if (form.value.pagoId == 0) {
        if (form.value.alumnoId != 0) {
          //guardamos
          form.value.opcionDML = 1; //parametro que indica que metodo de la clase se va a ejecutar en el servicio
          form.value.estadoId = 1;
          this.pagoService.postPago(form.value)
            .subscribe(data => {

              this.pagoService.repList = data.mPagos_AluResult;
              this.pagoService.repList.forEach(element => {
                this.msg = element.mensajeNombre;
              })
              // this.limpiarForm(form);
              this.limpiarForm();
              this.toastservice.show_mensaje_exito(this.msg)
            })
        } else {
          this.toastservice.show_mensaje_precaucion('Seleccione un alumno');
        }
      } else {

        if (confirm('Se va a modificar un registro, ¿Desea continuar?')) {
          form.value.opcionDML = 3; //parametro que indica que metodo de la clase nivel se va a ejecutar en el servicio
          this.pagoService.postPago(form.value)
            .subscribe(data => {
              this.pagoService.repList = data.mPagos_AluResult;
              this.pagoService.repList.forEach(element => {
                this.msg = element.mensajeNombre;
              })
              // this.limpiarForm(form);
              this.buscarPagosxAluId();
              // this.limpiarForm();
              this.toastservice.show_mensaje_exito(this.msg);
            })
        }
      }
    } else { this.toastservice.show_mensaje_precaucion('Seleccione la forma de pago'); }
  }

  cerrar_alert() {
    this.inscripcionPagada = '';
  }
  // /**-Esta funcion trae los montos a pagar por alumno y por tipo de pago
  //  *  se ejectura desde el select tipoPago*/
  buscarMontoXAluId(tipoPago: any) {
    this.limpiarForm();
    let ciclo_aux: number = 0;
    this.cicloService.cicloList.forEach(element => {
      if (element.estado == 1 && element.anio > ciclo_aux) {
        ciclo_aux = element.anio;
      }
    })
    this.pagos.ciclo = ciclo_aux;

    switch (tipoPago) {
      case "1":
        this.pagos.colegioId = 3;
        this.pagos.opcionDML = 7;
        this.pagos.tipoPagoId =  parseInt(tipoPago);
        this.pagos.opcionConsulta = 4;
        this.pagos.alumnoId = this.registroAlumnoService.alumnoSeleccionado.alumnoId;
        // consulta que exista un pago de inscripcion en el año configurado comoo actual
        this.pagoService.getPagoList(this.pagos).subscribe(
          Response => {
            this.pagoService.montoList = Response.mPagos_AluResult
            this.pagoService.montoList.forEach(element => {
              if (element.mensajeId == 1) {
                this.inscripcionPagada = element.mensajeNombre
              } else if (element.mensajeId === 0) {

                this.pagos.colegioId = 3;
                this.pagos.opcionDML = 5;
                this.pagos.tipoPagoId = tipoPago;
                this.pagos.opcionConsulta = tipoPago;
                this.pagos.alumnoId = this.registroAlumnoService.alumnoSeleccionado.alumnoId;
                // this.toastservice.show_mensaje_error("hacer una llamada a tbl_config_pagos_colegiatura para saber si " +
                // "hay un ciclo activo y que es para pag de inscripcion...")

                this.pagoService.getPagoList(this.pagos).subscribe(
                  response => {
                    this.pagoService.montoList = response.mPagos_AluResult;
                    if (this.pagoService.montoList.length > 0) {
                      this.pagoService.montoList.forEach(element => {
                        console.log(element);
                        this.pagoService.montoSeleccionado = element;
                        this.calcularTotal();
                        console.log(this.pagoService.montoSeleccionado);
                      })
                    } else {
                      if (tipoPago == 1) {
                        this.inscripcionPagada = 'No hay inscripción por pagar, verifíque que el alumno esté debidamente inscrito , o que exísta una configuración de pagos de inscripción para el ciclo activo.';
                      } else if (tipoPago == 2) {
                        this.inscripcionPagada = 'No hay colegiaturas por pagar, verifíque que el alumno esté debidamente inscrito  y haya pagado la inscripción, o que exista una configuración de pagos para el ciclo activo.';
                      } else if (tipoPago == 3) {
                        this.inscripcionPagada = 'Opción no valida para este alumno, verifíque su nivel académico, o que exista una configuración de pagos de títulos para el ciclo activo.';
                      }

                    }
                  },
                  error => {
                    console.log(<any>error);
                    this.toastservice.show_mensaje_error('Error... ' + <any>error);
                  }
                );
              }
            }

            )
          }
        )

        break;
      default:
        this.pagos.colegioId = 3;
        this.pagos.opcionDML = 5;
        this.pagos.tipoPagoId = parseInt( tipoPago);
        this.pagos.opcionConsulta = tipoPago;
        this.pagos.alumnoId = this.registroAlumnoService.alumnoSeleccionado.alumnoId;
        // this.toastservice.show_mensaje_error("hacer una llamada a tbl_config_pagos_colegiatura para saber si " +
        // "hay un ciclo activo y que es para pag de inscripcion...")

        this.pagoService.getPagoList(this.pagos).subscribe(
          response => {
            this.pagoService.montoList = response.mPagos_AluResult;
            if (this.pagoService.montoList.length > 0) {
              this.pagoService.montoList.forEach(element => {
                console.log(element);
                this.pagoService.montoSeleccionado = element;
                this.calcularTotal();
                console.log(this.pagoService.montoSeleccionado);
              })
            } else {
              if (tipoPago == 1) {
                this.inscripcionPagada = 'No hay inscripción por pagar, verifíque que el alumno esté debidamente inscrito , o que exísta una configuración de pagos de inscripción para el ciclo activo.';
              } else if (tipoPago == 2) {
                this.inscripcionPagada = 'No hay colegiaturas por pagar, verifíque que el alumno esté debidamente inscrito  y haya pagado la inscripción, o que exista una configuración de pagos para el ciclo activo.';
              } else if (tipoPago == 3) {
                this.inscripcionPagada = 'Opción no valida para este alumno, verifíque su nivel académico, o que exista una configuración de pagos de títulos para el ciclo activo.';
              }

            }
          },
          error => {
            console.log(<any>error);
            this.toastservice.show_mensaje_error('Error... ' + <any>error);
          }
        );

      // default:
        break;
    }
    // this.pagos.colegioId = 3;
    // this.pagos.opcionDML = 5;
    // this.pagos.tipoPagoId = tipoPago;
    // this.pagos.opcionConsulta = tipoPago;
    // this.pagos.alumnoId = this.registroAlumnoService.alumnoSeleccionado.alumnoId;
    // // this.toastservice.show_mensaje_error("hacer una llamada a tbl_config_pagos_colegiatura para saber si " +
    // // "hay un ciclo activo y que es para pag de inscripcion...")

    // this.pagoService.getPagoList(this.pagos).subscribe(
    //   response => {
    //     this.pagoService.montoList = response.mPagos_AluResult;
    //     if (this.pagoService.montoList.length > 0) {
    //       this.pagoService.montoList.forEach(element => {
    //         console.log(element);
    //         this.pagoService.montoSeleccionado = element;
    //         this.calcularTotal();
    //         console.log(this.pagoService.montoSeleccionado);
    //       })
    //     } else {
    //       if (tipoPago == 1) {
    //         this.inscripcionPagada = 'No hay inscripción por pagar, verifíque que el alumno esté debidamente inscrito , o que exísta una configuración de pagos de inscripción para el ciclo activo.';
    //       } else if (tipoPago == 2) {
    //         this.inscripcionPagada = 'No hay colegiaturas por pagar, verifíque que el alumno esté debidamente inscrito  y haya pagado la inscripción, o que exista una configuración de pagos para el ciclo activo.';
    //       } else if (tipoPago == 3) {
    //         this.inscripcionPagada = 'Opción no valida para este alumno, verifíque su nivel académico, o que exista una configuración de pagos de títulos para el ciclo activo.';
    //       }

    //     }
    //   },
    //   error => {
    //     console.log(<any>error);
    //     this.toastservice.show_mensaje_error('Error... ' + <any>error);
    //   }
    // );
  }

  buscarPagosxAluId() {
    // this.limpiarForm();
    this.pagos.colegioId = 3;
    this.pagos.opcionDML = 4;
    this.pagos.alumnoId = this.registroAlumnoService.alumnoSeleccionado.alumnoId;
    // hawk change dia del padre
    // this.toastservice.show_mensaje_error('revidar esta funcion = this.listarCiclo(3)',this.listarCiclo(3));
    // let ciclo_buscar_activo: number
    let ciclo_aux: number = 0;
    this.cicloService.cicloList.forEach(element => {
      if (element.estado == 1 && element.anio > ciclo_aux) {
        ciclo_aux = element.anio;
      }
    })

    // this.pagos.ciclo = this.pagoService.montoSeleccionado.ciclo;
    this.pagos.ciclo = ciclo_aux;
    this.pagoService.getPagoList(this.pagos).subscribe(
      response => {
        this.pagoService.pagoList = response.mPagos_AluResult;
        this.num_items_busqueda_alum= this.pagoService.pagoList;
      },
      error => {
        console.log(<any>error);
        this.toastservice.show_mensaje_error('Error... ' + <any>error);
      }
    );
  }

  showForEdit(pago: Pago) {
    this.pagoService.montoSeleccionado = Object.assign({}, pago);
    this.calcularMontoConDescuento();
  }

  /**---------------------------------FUNCIONES DE CALCULOS-------------------------------- */
  /**Se ejecuta desde el input "descuento" al cambiar el modelo */
  calcularMontoConDescuento() {
    this.pagoService.montoSeleccionado.montoConDescuento = (this.pagoService.montoSeleccionado.monto - this.pagoService.montoSeleccionado.descuento);
    this.calcularTotal();
  }

  calcularTotal() {
    this.pagoService.montoSeleccionado.total = (this.pagoService.montoSeleccionado.montoConDescuento + this.pagoService.montoSeleccionado.mora);
  }

  calcularMora() {
    var fechaLimite: string;
    var fechaActual: string;
    var diaActual: number;
    var mesActual: number;
    var fecha = new Date();
    var diaLimite: number;
    var mesApagar: number;

    var anio: number;

    diaLimite = this.pagoService.montoSeleccionado.diaLimite;
    mesApagar = this.pagoService.montoSeleccionado.mesId;

    diaActual = fecha.getDay();
    mesActual = fecha.getMonth();
    anio = fecha.getFullYear();

    fechaLimite = diaLimite + '/' + mesApagar + '/' + anio;
    fechaActual = diaActual + '/' + mesActual + '/' + anio;

    var resultado = this.comparaFechas(fechaLimite, fechaActual);
    this.toastservice.show_mensaje_precaucion(resultado.toString());
  }

  comparaFechas(a, b) {

    this.toastservice.show_mensaje_precaucion('vamos a comparar ' + a + 'con ' + b);
    if (a < b) {
      return 0;
    } else {
      return 1
    }
  }

  quitar_espacios(cadena: string): string {
    let spaceReg = new RegExp(" ", 'g');
    // let str = "name abc"

    cadena = cadena.replace(spaceReg, "");
    return cadena;
  }

  listar_enterante(strNit: string) {

    this.clientes.colegioId = 3;
    this.clientes.opcionDML = 4;
    this.clientes.opcionConsulta = 3;
    // this.clientes.clienteNombre = form.value.clienteNombre;
    this.clientes.nit = strNit;
    this.clienteService.getClienteList(this.clientes).subscribe(
      response => {
        this.clienteService.clienteList = response.mClienteResult;
        this.num_items_busqueda_alum = this.clienteService.clienteList;
        this.clienteService.clienteList.forEach(element => {
          this.clienteService.clienteSeleccionado = element;
        });
        this.clienteService.clienteSeleccionado.nit = this.quitar_espacios(this.clienteService.clienteSeleccionado.nit);
        // this.clienteService.clienteSeleccionado.clienteNombre = this.quitar_espacios(this.clienteService.clienteSeleccionado.clienteNombre);

      },
      error => {
        console.log(<any>error);
        this.toastservice.show_mensaje_error('Error... ' + <any>error);

      }
    );

  }

  buscar_nit() {

    if (this.clienteService.clienteSeleccionado.nit == 'CF' || this.clienteService.clienteSeleccionado.nit == 'cf') {
      this.toastservice.show_mensaje_exito('buscoo algo');
      this.clienteService.clienteSeleccionado.clienteNombre = 'Consumidor Final'
    } else if (this.clienteService.clienteSeleccionado.nit.length >= 7) {

      this.listar_enterante(this.clienteService.clienteSeleccionado.nit);

      // this.toastservice.show_mensaje_exito('deberia de poner aca el codigo del nit');
      // this.clienteService.clienteSeleccionado.clienteNombre = 'cliente encontrado'
    } else {
      this.clienteService.clienteSeleccionado.clienteNombre = '';
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

  /**-----------------------------------FIN MODALES--------------------------------------------------- */
  /**--Es ejecutada desde el MODAL para buscar alumnos, en el tabset Asociar Encargado */
  buscarAlumno(form: NgForm) {
    this.alumnos.colegioId = 3;
    this.alumnos.opcionDML = 4;
    this.alumnos.opcionConsulta = 1;
    this.alumnos.alumnoNombre1 = form.value.alumnoNombre1;
    this.alumnos.alumnoId = this.registroAlumnoService.alumnoSeleccionado.alumnoId;

    this.registroAlumnoService.getAlumnoList(this.alumnos).subscribe(
      response => {
        this.registroAlumnoService.alumnoList = response.mAlumnoResult;
        this.num_items_busqueda_alum= this.registroAlumnoService.alumnoList;
      },
      error => {
        console.log(<any>error);
        this.toastservice.show_mensaje_error('Error... ' + <any>error);
      }
    );
  }

  /**Se ejecuta con el parametro que viene por la url */
  buscarAlumnoXId() {
    this.alumnos.colegioId = 3;
    this.alumnos.opcionDML = 4;
    this.alumnos.opcionConsulta = 2;
    this.alumnos.alumnoNombre1 = '';
    this.alumnos.alumnoId = this.registroAlumnoService.alumnoSeleccionado.alumnoId;

    this.registroAlumnoService.getAlumnoList(this.alumnos).subscribe(
      response => {
        this.registroAlumnoService.alumnoList = response;
        this.num_items_busqueda_alum = this.registroAlumnoService.alumnoList;
        this.registroAlumnoService.alumnoList.forEach(element => {
          this.registroAlumnoService.alumnoSeleccionado = element;
        })
      },
      error => {
        console.log(<any>error);
        this.toastservice.show_mensaje_error('Error... ' + <any>error);
      }
    );
    // this.buscarInscripcionActual();
    //  console.log(this.registroAlumnoService.alumnoSeleccionado);
  }

  verPerfilAlumno(alu: Alumno) {
    this.registroAlumnoService.alumnoSeleccionado = Object.assign({}, alu);
    // this.buscarInscripcionActual();
  }


  /** --------------------------------------AREA DE COMBOS-------------------------------- */

  listarEstado() {
    this.estadoService.getEstadoList(this.estados).subscribe(
      response => {
        this.estadoService.estadoList = response.mEstadoResult;
      },
      error => {
        console.log(<any>error);
        this.toastservice.show_mensaje_error('Error... ' + <any>error);
      }
    );
  }


  listarCiclo(opcionConsulta: any) {
    this.ciclos.cicloId = 0;
    this.ciclos.anio = 0;
    this.ciclos.colegioId = 3;
    this.ciclos.opcionDML = 2;
    this.ciclos.error = '';
    this.ciclos.opcionSelect = opcionConsulta;
    this.cicloService.getCicloList(this.ciclos).subscribe(
      response => {
        if (opcionConsulta === 3) {
          this.cicloService.cicloList = response.mCicloResult;
        } else if (opcionConsulta === 2) {
          this.cicloService.cicloSiguienteList = response.mCicloResult;
          this.cicloService.cicloSiguienteList.forEach(element => {
            this.pagoService.montoSeleccionado.ciclo = element.anio;
          })
        }
      },
      error => {
        console.log(<any>error);
        this.toastservice.show_mensaje_error('Error... ' + <any>error);
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
        this.toastservice.show_mensaje_error('Error... ' + <any>error);
      }
    );
  }

  listarFormaPago() {
    this.formaPagos.colegioId = 3;
    this.formaPagos.opcionDML = 1;
    this.formaPagos.opcionConsulta = 1;
    this.formaPagoService.getFormaPagoList(this.formaPagos).subscribe(
      response => {
        this.formaPagoService.formaPagoList = response.mForma_PagoResult;
      },
      error => {
        console.log(<any>error);
        this.toastservice.show_mensaje_error('Error... ' + <any>error);
      }
    );
  }

  listarBancos() {
    this.bancos.colegioId = 3;
    this.bancos.opcionDML = 4;
    this.bancos.opcionConsulta = 1;
    this.bancoService.getBancoList(this.bancos).subscribe(
      response => {
        this.bancoService.bancoList = response.mBancoResult;
        // console.log(this.bancoService.bancoList);
      },
      error => {
        console.log(<any>error);
        this.toastservice.show_mensaje_error('Error... ' + <any>error);
      }
    );

  }


  /**------------------------------------------ABC CLIENTES------------------------------------------ */

  limpiarFormCli(form?: NgForm) {
    if (form != null)
      form.reset();
    this.clienteService.clienteSeleccionado = {
      colegioId: null,
      clienteId: null,
      clienteNombre: '',
      nit: '',
      direccion: '',
      estadoId: null,
      opcionDML: null,
      opcionConsulta: null,
      mensajeId: null,
      mensajeNombre: '',
    }
    this.clienteService.abrirFormularioAddCli = 0;
  }

  listarCliente(form: NgForm) {
    this.clientes.colegioId = 3;
    this.clientes.opcionDML = 4;
    this.clientes.opcionConsulta = 2;
    this.clientes.clienteNombre = form.value.clienteNombre;

    this.clienteService.getClienteList(this.clientes).subscribe(
      response => {
        this.clienteService.clienteList = response.mClienteResult;
        this.num_items_busqueda_alum= this.clienteService.clienteList;
        console.log(this.clienteService.clienteList);
      },
      error => {
        console.log(<any>error);
        this.toastservice.show_mensaje_error('Error... ' + <any>error);
      }
    );

  }

  seleccionarCliente(cli: Cliente) {

    this.clienteService.clienteSeleccionado = Object.assign({}, cli);
    this.clienteService.clienteSeleccionado.nit = this.quitar_espacios(cli.nit);
    this.clienteService.clienteSeleccionado.clienteNombre = this.quitar_espacios(cli.clienteNombre);

  }

  abrirFormAddCliente() {
    this.clienteService.abrirFormularioAddCli = 1;
    // alert(this.clienteService.abrirFormularioAddCli);
  }

  cerrarFormAddCliente() {
    this.clienteService.abrirFormularioAddCli = 0;
    // alert(this.clienteService.abrirFormularioAddCli);
  }

  agregarCliente(form: NgForm) {
    if (form.value.nit === null) { form.value.nit = '' }
    if (form.value.direccion === null) { form.value.direccion = '' }
    form.value.colegioId = 3; //inicializamos estos parametros para no tener probleas en la llamada al servicio
    form.value.clienteId = 0;
    form.value.estadoId = 1;
    form.value.opcionDML = 1; //parametro que indica que metodo de la clase nivel se va a ejecutar en el servicio
    this.clienteService.postCliente(form.value)
      .subscribe(data => {
        this.clienteService.clienteList = data.mClienteResult;
        this.clienteService.clienteList.forEach(element => {
          this.msg = element.mensajeNombre;
          this.clienteService.clienteSeleccionado.clienteId = element.clienteId;
          this.toastservice.show_mensaje_exito(this.clienteService.clienteSeleccionado.clienteId.toString());
        })
        if (this.clienteService.clienteSeleccionado.clienteId == -1) {
          this.toastservice.show_mensaje_exito(this.msg);
        } else {
          this.toastservice.show_mensaje_exito('Exito al guardar');
        }
        this.cerrarFormAddCliente();
      })

  }

  public hide_sections(intBtn_panel) {
    switch (intBtn_panel) {
      case 1:
        // this.sections_json.first= !this.sections_json.first
        this.collapsed_json.first = !this.collapsed_json.first
        break;
      case 2:
        // this.sections_json.second= !this.sections_json.second
        this.collapsed_json.second = !this.collapsed_json.second
        break;
      case 3:
        // this.sections_json.third= !this.sections_json.third
        this.collapsed_json.third = !this.collapsed_json.third
        break;

    }
    // console.log("this.collapsed_json",this.collapsed_json);
    // console.log("this.sections_json",this.sections_json);

  }

  recibe_datos_alum(event) {
    console.log("Recibe datos del hijo y los imprime en el padre", event);
    this.verPerfilAlumno(event)


  }

}
