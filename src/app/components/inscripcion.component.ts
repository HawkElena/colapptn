import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { RegistroAlumnoSevice } from '../services/registroAlumno.service';
import { Alumno } from '../models/alumno';
import { EstadoService } from '../services/estado.service';
import { Estado } from '../models/estado';
import { InscripcionService } from '../services/inscripcion.service';
import { Inscripcion } from '../models/inscripcion'
import { CarJorGraService } from '../services/carJorGra.service';
import { CarreraJornadaGrado } from '../models/carreraJornadaGrado';
import { NivelService } from '../services/nivel.service';
import { Nivel2 } from '../models/nivel2';
import { CarreraJornadaService } from '../services/carreraJornada.service';
import { CarreraJornada } from '../models/carrerajornada';
import { Seccion } from '../models/seccion';
import { SeccionService } from '../services/seccion.service';
import { CicloService } from '../services/ciclo.service';
import { Ciclo } from '../models/ciclo';
import { element } from 'protractor';
import { ToastService } from '../toast/toast.service';
import { AuthService } from '../auth.service';


@Component({
  selector: 'inscripcion',
  templateUrl: '../views/inscripcionnew.html',
  styleUrls: ['../style_hawk/general.style.css'],
  providers: [  RegistroAlumnoSevice
                ,InscripcionService
                ,CarJorGraService
                ,NivelService
                ,CarreraJornadaService
                ,SeccionService
                ,CicloService
                ,ToastService
              ]
  //   styleUrls: ['./componete1.component.css']
})
export class InscripcionComponent implements OnInit {

  /**------------------------------DECLARACION DE VARIABLES ---------------------------------------- */
  fechaNac                          : string;
  msg                               : string;
  closeResult                       : string;
  public jcgId_Aux                  : number;
  public identity                   : number;
  public titulo                     : string;
  public alumnos                    : Alumno;
  public estados                    : Estado;
  public inscripciones              : Inscripcion;
  public carreraJornadaGrados       : CarreraJornadaGrado;
  public niveles                    : Nivel2;
  public carreraJornadas            : CarreraJornada;
  public secciones                  : Seccion;
  public ciclos                     : Ciclo;
  public mensaje                    : string;


  public collapsed_json             =   {
                                    first: false,
                                    second: false,
                                    third: false,
                                    };
  public parentData                 = {
                                    esHijo: true
                                    ,alumnoId: 0
                                    ,esInscripcion: true
                                    };
public blnTemplate_inscripcion_sig  : boolean= false;
public int_asig_inscrip_last        : number=0;
public strCiclo_habilitado          : string;
public num_items_busqueda_alum = [];
public page = 1;
public pageSize =10;
  /**-----------------------------------CONSTRUCTOR-------------------------------------------------- */
  constructor(
    private _route: ActivatedRoute,
    public registroAlumnoService: RegistroAlumnoSevice,
    public modalService: NgbModal,
    public estadoService: EstadoService,
    public inscripcionService: InscripcionService,
    public carJorGraService: CarJorGraService,
    public nivelService : NivelService,
    public carreraJornadaService : CarreraJornadaService,
    public seccionService : SeccionService,
    public cicloService  : CicloService
    ,public toastService : ToastService
    ,private authService: AuthService, private router: Router

    ) {
      // console.log(this._route.snapshot.paramMap.get('id'));
    this.titulo = 'Busque y Seleccione un alumno';
    this.mensaje = '';
    this.alumnos = new Alumno(0, 0, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0, '', 0, 0, '', 0, 0,0,0);
    this.estados = new Estado(0,0,'',0,'');
    this.inscripciones = new Inscripcion(0,0,'',0,0,0,'',0,0,'',0,0,0,0,0,0,0,0,0,0,0,'','','','','',0,'');
    this.carreraJornadaGrados = new CarreraJornadaGrado(0,0,0,0,0,0,'',0,0,'','','','',0,0,0,0);
    this.niveles = new Nivel2(0,0,'',0,0,0,'');
    this.carreraJornadas = new CarreraJornada(0,0,0,0,0,'','',0,'',0,'');
    this.secciones = new Seccion(0,0,'');
    this.ciclos = new Ciclo(0,0,0,'',0,'',0,0,'',0);
    this.jcgId_Aux = 0;
    this.strCiclo_habilitado='';
    // let aluId: any;

    // aluId = +this._route.snapshot.paramMap.get('id');

    // // aluId = 30;
    // if(!isNaN(aluId)=== true){
    //   // this.registroAlumnoService.alumnoSeleccionado.alumnoId = aluId;
    //   this.parentData.alumnoId= aluId;
    // }


    }

  ngOnInit() {
    // if(this.authService.isLoggedIn){
    //   this.toastService.show_mensaje_exito("esta logeado");
    // }
    let aluId: any;
    this.limpiarForm();
    this.limpiarFormInscSig();
    this.limpiarFormAlu();
    this.listarNivel() ;
    this.listarSecciones();
    this.listarEstado();
    this.listarCiclo(3); /**para listar el ciclo activo */
    this.listarCiclo(2); /**para traer el ciclo habilitado para inscripcion */
    this.int_asig_inscrip_last=0;

    aluId = +this._route.snapshot.paramMap.get('id');

    // aluId = 30;
    if(isNaN(aluId)=== true){
      this.registroAlumnoService.alumnoSeleccionado.alumnoId = 0;
    }else{
      this.registroAlumnoService.alumnoSeleccionado.alumnoId = aluId;
      this.parentData.alumnoId= aluId;
    }

    if(this.registroAlumnoService.alumnoSeleccionado.alumnoId != 0){
    // this.buscarAlumnoXId();
    this.buscarInscripcionActual()
    }

    this.collapsed_json.first= true;
    // this.hide_sections(1);
    console.log('el valor de colapsed 1', this.collapsed_json.first);
  }


  limpiarForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.inscripcionService.inscripcionSeleccionada = {
         asignacionId     : null,
         colegioId        : null,
         fechaIngreso     : '',
         descuento        : null,
         alumnoId         : null,
         estadoId         : null,
         estadoNombre     : '',
         esNuevo          : null,
         aParvulos1       : null,
         descripcion      : null,
         usuarioAutoriza  : null,
         seccionId        : null,
         ciclo            : null,
         jcgId            : 0,
         aprobado         : null,
         confirmada       : null,
         reservada        : null,
         opcionDML        : null,
         opcionSelect     : null,
        /*-----------DATOS DE LECTURA------------ */
         nivelId          : null,
         carJorId         : null,
         nivelNombre      : '',
         carreraNombre    : '',
         jornadaNombre    : '',
         gradoNombre      : '',
         seccionNombre    : '',
         mensajeId        : null,
         mensajeNombre    : ''
    }
  }

  limpiarFormInscSig(form?: NgForm) {
    if (form != null)
      form.reset();
    this.inscripcionService.inscripcionSiguiente = {
         asignacionId     : null,
         colegioId        : null,
         fechaIngreso     : '',
         descuento        : null,
         alumnoId         : null,
         estadoId         : null,
         estadoNombre     : '',
         esNuevo          : null,
         aParvulos1       : null,
         descripcion      : null,
         usuarioAutoriza  : null,
         seccionId        : null,
         ciclo            : null,
         jcgId            : 0,
         aprobado         : null,
         confirmada       : null,
         reservada        : null,
         opcionDML        : null,
         opcionSelect     : null,
        /*-----------DATOS DE LECTURA------------ */
         nivelId          : null,
         carJorId         : null,
         nivelNombre      : '',
         carreraNombre    : '',
         jornadaNombre    : '',
         gradoNombre      : '',
         seccionNombre    : '',
         mensajeId        : null,
         mensajeNombre    : ''
    }
  }

  limpiarFormAlu(form?: NgForm) {
    if (form != null)
      form.reset();
    this.registroAlumnoService.alumnoSeleccionado = {
      alumnoId          : null,
      colegioId         : 3,
      alumnoNombre1     : '',
      alumnoNombre2     : '',
      alumnoNombre3     : '',
      alumnoApellido1   : '',
      alumnoApellido2   : '',
      alumnoApellido3   : '',
      alumnoCarnet      : null,
      codigoMineduc     : '',
      identificacion    : '', //cui-dpi
      fechaNacimiento   : '',
      email             : '',
      direccion         : '',
      telefono1         : '',
      telefono2         : '',
      foto              : '',
      fechaIngreso      : '',
      fechaModificacion : '',
      genero            : null,
      municipioId       : null,
      departamentoId    : null,
      paisId            : null,
      nacionalidad      : null,
      estadoId          : null,
      estadoNombre      : '',
      representanteId   : null,
      errorId           : null,
      errorNombre       : '',
      opcionDML         : null,
      identity          : null,
      opcionConsulta    : null,
      descuento         : null
    }
  }


/**onSubmint se ejecuta desde el boton "enviar datos" del formulario para nueva inscripcion" */
  onSubmit(form: NgForm) {
    form.value.colegioId = 3; //inicializamos estos parametros para no tener probleas en la llamada al servicio
    /**No asignamos directamente "registroAlumnoService.alumnoSeleccionado.alumnoId" en el formulario debido a que este se resetea y pone el alumnoId a cero y ya no puede continuar agregandosele encargados al alumno seleccionado*/
    form.value.alumnoId = this.registroAlumnoService.alumnoSeleccionado.alumnoId;
    if (form.value.descripcion == null) {
        form.value.descripcion = '';
    }
    /**Si el jcgId es null entonces guardamos un nuevo registro, sino editamos el registro */
    if (form.value.asignacionId == null) {
      if (form.value.alumnoId != 0) {
        // alert('Guardamos');
        form.value.opcionDML = 1; //parametro que indica que metodo de la clase nivel se va a ejecutar en el servicio
        form.value.confirmada = 0;
        form.value.reservada = 0;
        form.value.esNuevo = 0;
        form.value.aParvulos1 = 0;

        this.inscripcionService.postInscripcion(form.value)
          .subscribe(data => {
            this.inscripcionService.inscripcionList = data.mInscripcionResult;
            this.inscripcionService.inscripcionList.forEach(element => {
              this.buscarInscripcionActual();
              this.msg = element.mensajeNombre;

            })
            // this.limpiarForm(form);
            this.toastService.show_mensaje_exito(this.msg)
          })
      } else {
        this.toastService.show_mensaje_precaucion('Seleccione un alumno');
      }
    } else {
    //alert('Editamos');
      if (confirm('Precaución!... Va a modificar la inscripción actual. ¿Desea continuar?')) {
        form.value.opcionDML = 3; //parametro que indica que metodo de la clase nivel se va a ejecutar en el servicio
        this.inscripcionService.postInscripcion(form.value)
          .subscribe(data => {
            this.inscripcionService.inscripcionList = data.mInscripcionResult;
            this.inscripcionService.inscripcionList.forEach(element => {
              this.msg = element.mensajeNombre;
            })
            this.toastService.show_mensaje_exito(this.msg);
          })
      }
    }
  }

  /**onSubmint se ejecuta desde el boton "enviar datos" del formulario para inscripcion siguiente" */
  onSubmitInscSig(form: NgForm) {
    form.value.colegioId = 3; //inicializamos estos parametros para no tener probleas en la llamada al servicio
    /**No asignamos directamente "registroAlumnoService.alumnoSeleccionado.alumnoId" en el formulario debido a que este se resetea y pone el alumnoId a cero y ya no puede continuar agregandosele encargados al alumno seleccionado*/
    form.value.alumnoId = this.registroAlumnoService.alumnoSeleccionado.alumnoId;

    if (form.value.alumnoId != 0) {
        // alert('Guardamos');
        form.value.opcionDML = 1; //parametro que indica que metodo de la clase nivel se va a ejecutar en el servicio
        form.value.confirmada = 0;
        form.value.reservada = 1;
        form.value.esNuevo = 0;
        form.value.aParvulos1 = 0;
        // form.value.descripcion= '';
        if (form.value.descripcion == null) {
          form.value.descripcion = '';
      }
        this.inscripcionService.postInscripcion(form.value)
          .subscribe(data => {
            this.inscripcionService.inscripcionList = data.mInscripcionResult;
            this.inscripcionService.inscripcionList.forEach(element => {
              this.msg = element.mensajeNombre;
              this.buscarInscripcionActual();
            })
            // this.limpiarForm(form);
            this.toastService.show_mensaje_exito(this.msg);
          })
      } else {
        this.toastService.show_mensaje_precaucion('Seleccione un alumno');
      }

  }
  /**-Esta funcion la inscripcion actual del alumno es decir del ciclo que esta activo
   *  se ejectura desde el boton seleccionar (verPerfilAlumno) en la tabla del MODAL "buscar alumno" en el tab-set inscripcion
   * y tambien desde buscar alumnoXId, para el caso de alumnos de reingreso que venngar de lapantalla asociar encargado*/
  buscarInscripcionActual() {


    // this.limpiarForm();
    // this.limpiarFormInscSig();

    this.inscripciones.colegioId = 3;
    this.inscripciones.opcionDML = 4;
    this.inscripciones.opcionSelect = 1;
    this.inscripciones.alumnoId = this.registroAlumnoService.alumnoSeleccionado.alumnoId;

    this.inscripcionService.getInscripcionList(this.inscripciones).subscribe(
      response => {
        this.limpiarForm();
        this.limpiarFormInscSig();
        let int_anyo_insc_actual =0;// variable para validar que sea el ultimo año el que aparezca en ultima inscripcion
        this.inscripcionService.inscripcionList = response.mInscripcionResult;
        if(this.inscripcionService.inscripcionList.length > 0){
          this.inscripcionService.inscripcionList.forEach(element => {
          if(element.ciclo>int_anyo_insc_actual){
            int_anyo_insc_actual=element.ciclo;
            this.inscripcionService.inscripcionSeleccionada = element;
            this.int_asig_inscrip_last= element.asignacionId;
          }
          this.collapsed_json.first=false;
          this.blnTemplate_inscripcion_sig= false;
          })
          this.titulo = 'Ultimo grado inscrito del alumno. ';

          this.listarCarreraJornada(this.inscripcionService.inscripcionSeleccionada.nivelId);
          this.listarCarreraJoranaGrado(this.inscripcionService.inscripcionSeleccionada.carJorId);
        }else{
          this.titulo = "Alumno sin registro de inscripcion.";
          //  haga click en el boton + para mostrar el formulario e ingresar la primera inscripción";
          // this.hide_sections(1);
          this.collapsed_json.first=true;
          this.blnTemplate_inscripcion_sig= true;
          this.seleccionar_anyo_esInscripcion();
          // this.inscripcionService.inscripcionSeleccionada.ciclo= 2019;
        }
      },
      error => {
        console.log(<any>error);
        this.toastService.show_mensaje_error('Error... ' + <any>error);
      }
    );
    // console.log(this.inscripcionService.inscripcionSeleccionada);
  }

  //para seleccionar siempre el año que esta activo para inscribir.
  public  seleccionar_anyo_esInscripcion():Boolean{
    let blnanyo_valido:boolean= false;
    let intContador_anyo_valido:number=0;

    this.cicloService.cicloList.forEach(element=>{
      if(element.habilitadoParaIncripcion){
        this.inscripcionService.inscripcionSiguiente.ciclo= element.anio;
        blnanyo_valido= true;
        intContador_anyo_valido++;
        };
    });
    if(!blnanyo_valido){
      this.inscripcionService.inscripcionSiguiente.ciclo= 0;
      this.toastService.show_mensaje_error('Operacion no valida, no hay año configurado para las inscripciones de alumnos, Consulte con el encargado de IT.');
    }else if(blnanyo_valido && intContador_anyo_valido>1){
      this.inscripcionService.inscripcionSiguiente.ciclo= 0;
      blnanyo_valido= false;
      this.toastService.show_mensaje_error('Operacion no valida, hay mas de un (1) año configurado para las inscripciones de alumnos, Consulte con el encargado de IT.');

    };
    return blnanyo_valido;
  }

  buscarInscripcionSiguiente() {
    this.titulo = "Seleccione los datos para la re-inscripción del alumno."
    if (this.int_asig_inscrip_last == this.inscripcionService.inscripcionSeleccionada.asignacionId) {
      if (this.seleccionar_anyo_esInscripcion()) {
        if (this.inscripcionService.inscripcionList.length > 0) {
          if (this.inscripcionService.inscripcionSeleccionada.ciclo != this.inscripcionService.inscripcionSiguiente.ciclo ) {
            if (this.inscripcionService.inscripcionSeleccionada.ciclo < this.inscripcionService.inscripcionSiguiente.ciclo ) {
              this.inscripciones.colegioId = 3;
              this.inscripciones.opcionDML = 4;
              this.inscripciones.opcionSelect = 3;
              this.inscripciones.alumnoId = this.registroAlumnoService.alumnoSeleccionado.alumnoId;
              this.inscripciones.jcgId = this.inscripcionService.inscripcionSeleccionada.jcgId;
              // hawk change review inscripcion 16062020
              this.inscripciones.ciclo = this.inscripcionService.inscripcionSeleccionada.ciclo; //this.inscripcionService.inscripcionSiguiente.ciclo - 1;

              this.inscripcionService.getInscripcionList(this.inscripciones).subscribe(
                response => {
                  this.inscripcionService.inscripcionSiguienteList = response.mInscripcionResult;
                  console.log(this.inscripcionService.inscripcionSiguienteList);
                  this.inscripcionService.inscripcionSiguienteList.forEach(element => {
                    this.inscripcionService.inscripcionSiguiente = element;

                  })
                  // hawk change review inscripcion 16062020
                  let tmp_inscripcionSiguiente_jcgId= this.inscripcionService.inscripcionSiguiente.jcgId;
                  // verificar xq se resetea el this.inscripcionService.inscripcionSiguiente.carJorId = null
                  // y el this.inscripcionService.inscripcionSiguiente.jcgId= null
                  // hawk change review inscripcion 16062020
                  this.listarCarreraJornada(this.inscripcionService.inscripcionSiguiente.nivelId);
                  this.listarCarreraJoranaGrado(this.inscripcionService.inscripcionSiguiente.carJorId);
                  // hawk change review inscripcion 16062020
                  this.inscripcionService.inscripcionSiguiente.jcgId= tmp_inscripcionSiguiente_jcgId;
                  // this.hide_sections(1);
                  // this.collapsed_json.first=true;
                  this.blnTemplate_inscripcion_sig = true;
                  this.inscripcionService.inscripcionSiguiente.descripcion = "";
                },
                error => {
                  console.log(<any>error);
                  this.toastService.show_mensaje_error('Error... ' + <any>error);
                }
              );

            } else {
              // this.toastService.show_mensaje_error('El Alumno ya ha sido inscrito en este ciclo. Por favor verifique...!');
              this.toastService.show_mensaje_error("El año(" + this.inscripcionService.inscripcionSiguiente.ciclo + ") oficial para inscribir es menor al año("+ this.inscripcionService.inscripcionSeleccionada.ciclo +")  de la ultima inscripcion realizada. Consulte con el administrador de IT");
            };
          } else {
            // this.toastService.show_mensaje_error("El año(" + this.inscripcionService.inscripcionSiguiente.ciclo + ") de inscripcion oficial para inscribir es menor al año("+ this.inscripcionService.inscripcionSeleccionada.ciclo +")  de la ultima inscripcion realizada. Consulte con el administrador de IT");
            this.toastService.show_mensaje_error("El Alumno ya ha sido inscrito en este ciclo, consulte el historial de inscripciones para este alumno.");
          };

        } else {

          this.toastService.show_mensaje_error('Operación no valida, el alumno no tiene ninguna inscripcion actual. Por favor verifique...');
        };
      };
    } else {
      this.toastService.show_mensaje_precaucion('Operacion no valida. El registro que esta viendo es solo de consulta, seleccione una inscripcion valida para continuar inscribiendo.');
    };


    // } else {
    //   // this.hide_sections(1);
    //   alert('Seleccione el ciclo escolar activo para inscripciones.');

    // }
  }

  /**Se ejecuta desde el boton "ver inscripciones anteriores" */
  listarInscripcionesXAlu() {
    if (this.registroAlumnoService.alumnoSeleccionado.alumnoId != 0) {
      this.inscripciones.colegioId = 3;
      this.inscripciones.opcionDML = 4;
      this.inscripciones.opcionSelect = 2;
      if(this.registroAlumnoService.alumnoSeleccionado.alumnoId ===null){
        this.inscripciones.alumnoId = 0;
      }else{
        this.inscripciones.alumnoId = this.registroAlumnoService.alumnoSeleccionado.alumnoId;
      }
      this.inscripcionService.getInscripcionList(this.inscripciones).subscribe(
        response => {
          this.inscripcionService.inscripcionList2 = response.mInscripcionResult;
          this.num_items_busqueda_alum = this.inscripcionService.inscripcionList2;
          // console.log(this.inscripcionService.inscripcionList);
        },
        error => {
          console.log(<any>error);
          this.toastService.show_mensaje_error('Error... ' + <any>error);
        }
      );
    } else {
      this.toastService.show_mensaje_precaucion('Seleccione el alumno');
    }

  }

   /**---------------------------------FUNCIONES PARA ASOCIAR Y ELIMINAR ENCARGADOS-------------------------------- */

  /**--------------------------------------INICIO PANTALLAS MODALES--------------------------------------- */
  open(content) {
    this.blnTemplate_inscripcion_sig=false;
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    this.listarInscripcionesXAlu();
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
    if(this.registroAlumnoService.alumnoSeleccionado.alumnoId=== null){
      this.alumnos.alumnoId =0;
    }else{
      this.alumnos.alumnoId=this.registroAlumnoService.alumnoSeleccionado.alumnoId;
    }


      this.registroAlumnoService.getAlumnoList(this.alumnos).subscribe(
        response => {
          this.registroAlumnoService.alumnoList = response.mAlumnoResult;
          this.num_items_busqueda_alum = this.registroAlumnoService.alumnoList;
        },
        error => {
          console.log(<any>error);
          this.toastService.show_mensaje_error('Error... ' + <any>error);
        }
      );
  }

  /**Se ejecuta con el parametro que viene por la url */
  buscarAlumnoXId(){
    this.alumnos.colegioId = 3;
    this.alumnos.opcionDML = 4;
    this.alumnos.opcionConsulta = 2;
    this.alumnos.alumnoNombre1 = '';
    this.alumnos.alumnoId = this.registroAlumnoService.alumnoSeleccionado.alumnoId;

      this.registroAlumnoService.getAlumnoList(this.alumnos).subscribe(
        response => {
          this.registroAlumnoService.alumnoList = response.mAlumnoResult;
          this.num_items_busqueda_alum = this.registroAlumnoService.alumnoList;
          this.registroAlumnoService.alumnoList.forEach(element => {
            this.registroAlumnoService.alumnoSeleccionado = element;
          })
        },
        error => {
          console.log(<any>error);
          this.toastService.show_mensaje_error('Error... ' + <any>error);
        }
      );
      this.buscarInscripcionActual();
        //  console.log(this.registroAlumnoService.alumnoSeleccionado);
  }

  verPerfilAlumno(alu: Alumno) {
    this.registroAlumnoService.alumnoSeleccionado = Object.assign({}, alu);
    this.buscarInscripcionActual();
   }

   ver_asignacion(insc_select_from_history: any){
    //  alert('poner validacion si no es registro para que habilite el btn ins sig');
    this.inscripcionService.inscripcionSeleccionada= insc_select_from_history;
          this.inscripcionService.inscripcionSeleccionada = this.inscripcionService.inscripcionSeleccionada;
          // console.log(this.inscripcionService.inscripcionSeleccionada);
          // this.llenarFormInscActual(element)
          if(this.int_asig_inscrip_last!= this.inscripcionService.inscripcionSeleccionada.asignacionId){
            this.titulo = 'Registro seleccionado del historial en modo de consulta.'
          }else{
            this.titulo = 'Ultimo grado inscrito del alumno. '
          };

          this.listarCarreraJornada(this.inscripcionService.inscripcionSeleccionada.nivelId);
          this.listarCarreraJoranaGrado(this.inscripcionService.inscripcionSeleccionada.carJorId);

   }

  /** --------------------------------------AREA DE COMBOS-------------------------------- */
  listarNivel() {

    this.nivelService.getNivelList(this.niveles).subscribe(
      response => {
        this.nivelService.nivelList = response.mNivelResult;
      },
      error => {
        console.log(<any>error);
        this.toastService.show_mensaje_error('Error... ' + <any>error);
      }
    );
  }

  listarCarreraJornada(nivel: any) {
    /**Le asignamos el valor del nivelId al json que enviamos al servicio */
    this.carreraJornadaService.carJorList=null;
    this.carJorGraService.carJorGraList= null;
    // hawk change review inscripcion 16062020
    // this.inscripcionService.inscripcionSiguiente.carJorId=null;
    // this.inscripcionService.inscripcionSiguiente.jcgId= null;
    if (nivel != null) {
        this.carreraJornadas.nivelId = nivel;
        this.carreraJornadaService.getCarJornadaList(this.carreraJornadas).subscribe(
            response => {
                this.carreraJornadaService.carJorList = response.mCarreraJornadaResult;
                // console.log(this.carreraJornadaService.carJorList);
            },
            error => {
                console.log(<any>error);
                this.toastService.show_mensaje_error('Error... ' + <any>error);
            }
        );
    }

}
/**Se ejecuta desde el select llamado Carrera */
listarCarreraJoranaGrado(carJorId: any){

  this.carJorGraService.carJorGraList= null;
  // hawk change review inscripcion 16062020
  // this.inscripcionService.inscripcionSiguiente.jcgId= null;
  if(carJorId != null){
    this.carreraJornadaGrados.carJorId = carJorId;
      this.carreraJornadaGrados.opcionConsulta = 4;
      this.carJorGraService.getCarJornadaGradoList(this.carreraJornadaGrados).subscribe(
          response => {
              this.carJorGraService.carJorGraList = response.mCarrera_Jor_GraResult;
              // console.log(this.carJorGraService.carJorGraList);
          },
          error => {
              console.log(<any>error);
              this.toastService.show_mensaje_error('Error... ' + <any>error);
          }
      );
  }
}

  listarEstado() {
    this.estadoService.getEstadoList(this.estados).subscribe(
      response => {
        this.estadoService.estadoList = response.mEstadoResult;

      },
      error => {
        console.log(<any>error);
        this.toastService.show_mensaje_error('Error... ' + <any>error);
      }
    );
  }

  listarSecciones(){
    this.seccionService.getSeccionList();
    // console.log(this.seccionService.getSeccionList);
  }

  listarCiclo(opcionConsulta: any) {
    this.ciclos.cicloId = 0;
    this.ciclos.anio = 0;
    this.ciclos.colegioId = 3;
    this.ciclos.opcionDML = 2;
    this.ciclos.error = '';
    this.ciclos.opcionSelect = opcionConsulta;
    // this.strCiclo_habilitado = '';
    this.cicloService.getCicloList(this.ciclos).subscribe(
      response => {
        if (opcionConsulta === 3) {
          this.cicloService.cicloList = response.mCicloResult;
          this.cicloService.cicloList.forEach(element => {
            if(element.habilitadoParaIncripcion==1 ){
              this.strCiclo_habilitado = element.anio.toString();
            }
          })

        } else if (opcionConsulta === 2) {
          this.cicloService.cicloSiguienteList = response.mCicloResult;
          this.cicloService.cicloSiguienteList.forEach(element =>{
            this.inscripcionService.inscripcionSiguiente.ciclo = element.anio;
          })
        }
      },
      error => {
        console.log(<any>error);
        this.toastService.show_mensaje_error('Error... ' + <any>error);
      }
    );
  }

  public hide_sections(intBtn_panel){
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
        this.collapsed_json.third = ! this.collapsed_json.third
        break;

    }
    // console.log("this.collapsed_json",this.collapsed_json);
    // console.log("this.sections_json",this.sections_json);

  }

  recibe_datos_alum(event){
    console.log("Recibe datos del hijo y los imprime en el padre",event);
    this.verPerfilAlumno(event)


  }


}
