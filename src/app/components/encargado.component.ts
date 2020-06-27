import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RegistroAlumnoSevice } from '../services/registroAlumno.service';
import { GeneroSevice } from '../services/genero.service';
import { Alumno } from '../models/alumno';
import { PaisService } from '../services/pais.service';
import { Pais } from '../models/pais'
import { DepartamentoService } from '../services/departamento.service';
import { Departamento } from '../models/departamento'
import { MunicipioService } from '../services/municipio.service';
import { Municipio } from '../models/municipio';
import { EstadoService } from '../services/estado.service';
import { Estado } from '../models/estado';
import { EncargadoService } from '../services/encargado.service';
import { Encargado } from '../models/encargado';
import { AlumnoxEncargado } from '../models/alumnoxEncargado';
import { AlumnoxEncargadoService } from '../services/alumnoxEncargado.service';

import{ToastService} from '../toast/toast.service';

@Component({
  selector: 'encargado',
  templateUrl: '../views/encargado.html',
  providers: [  RegistroAlumnoSevice
                ,PaisService
                ,DepartamentoService
                ,MunicipioService
                ,EncargadoService
                ,AlumnoxEncargadoService
                ,ToastService
              ]
  , styleUrls: ['../style_hawk/general.style.css']
})
export class EncargadoComponent implements OnInit {

  /**------------------------------DECLARACION DE VARIABLES ---------------------------------------- */
  fechaNac: string;
  msg: string;
  public identity: number;
  public titulo: string;
  closeResult: string;
  public alumnos: Alumno;
  public paises: Pais;
  public departamentos: Departamento;
  public municipios: Municipio;
  public estados: Estado;
  public encargados: Encargado;
  public alumnosxEncargados: AlumnoxEncargado;
  public aluIdUrl: number;

  // public isCollapsed = false;
  // public models = false ;

  public collapsed_json = {
    first: false,
    second: false,
    third: false,
  }

  @Input("ejemplo1") childExample: string;
  @Input("arreglo_a_recibir") childData = {
                          esHijo: false
                          ,alumnoId: 0
                          ,esInscripcion: false
                        }
  public foto_alumno: string;
  public blnBanderafoto: boolean = false;
  public num_items_busqueda_alum = [];
  public page = 1;
  public pageSize =10;

  /**-----------------------------------CONSTRUCTOR-------------------------------------------------- */
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    public registroAlumnoService: RegistroAlumnoSevice,
    public generoService: GeneroSevice,
    public paisService: PaisService,
    public modalService: NgbModal,
    public departamentoService: DepartamentoService,
    public municipioService: MunicipioService,
    public estadoService: EstadoService,
    public encargadoService: EncargadoService,
    public alumnoxEncargadoService: AlumnoxEncargadoService
    ,public toastservice:ToastService
  ) {
    // console.log(this._route.snapshot.paramMap.get('id'));
    this.titulo = 'Nuevo encargado';
    this.alumnos = new Alumno(0, 0, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0, '', 0, 0, '', 0, 0, 0, 0);
    this.paises = new Pais(0, '', 0, 0, 0, 0, 0);
    this.departamentos = new Departamento(0, 0, '', 0, 0);
    this.municipios = new Municipio(0, 0, '', 0, 0);
    this.estados = new Estado(0, 0, '', 0, '');
    this.encargados = new Encargado(0, 0, 0, '', '', '', '', '', '', '', '', '', '', 0, 0, 0, '', 0, '', 0, '', 0, '', 0, '', 0, 0, 0,0);
    this.alumnosxEncargados = new AlumnoxEncargado(0, 0, 0, 0, '', 0, 0, '');
    console.log("valor de encargado list = ",this.encargadoService.encargadoList);
  }

  ngOnInit() {
    console.log("valor de encargado list = ", this.encargadoService.encargadoList);
    // let aluId: any;
    this.limpiarForm();
    this.limpiarFormAlu();
    this.aluIdUrl = +this._route.snapshot.paramMap.get('id');
    if (isNaN(this.aluIdUrl) === true) {
      this.registroAlumnoService.alumnoSeleccionado.alumnoId = 0;
    } else {
      if (this.childData.esHijo == true) {
        this.registroAlumnoService.alumnoSeleccionado.alumnoId = this.childData.alumnoId;

        // asociarEncargado(1);
        // this.verPerfilAlumno(this.registroAlumnoService.alumnoList);
        this.buscarAlumnoXId();
        this.buscarEncargado();
        // if(this.registroAlumnoService.alumnoSeleccionado.foto !=''){
        //   this.foto_alumno = this.registroAlumnoService.alumnoSeleccionado.foto;
        //   this.blnBanderafoto=true;
        // }else{
        //   this.blnBanderafoto=false;

        // }

      } else {
        this.registroAlumnoService.alumnoSeleccionado.alumnoId = this.aluIdUrl;
      }

    }
    this.listarGenero();
    this.listarPais();
    this.listarEstado();
    if (this.registroAlumnoService.alumnoSeleccionado.alumnoId > 0) {
      this.buscarAlumnoXId();
    }
    console.log("datos del traspaso de valores en el hijo", this.childData)
  }


  limpiarForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.encargadoService.encargadoSeleccionado = {
      encargadoId: null,
      colegioId: 3,
      alumnoId: null,
      encargadoNombre1: '',
      encargadoNombre2: '',
      encargadoApellido1: '',
      encargadoApellido2: '',
      telefono1: '',
      telefono2: '',
      email: '',
      direccion: '',
      fechaIngreso: '',
      fechaModificacion: '',
      generoId: null,
      esEncargado: null,
      municipioId: null,
      municipioNombre: '',
      departamentoId: null,
      departamentoNombre: '',
      paisId: null,
      paisNombre: '',
      estadoId: null,
      estadoNombre: '',
      errorId: null,
      errorNombre: '',
      opcionDML: null,
      opcionSelect: null,
      identityEncargado: null
      ,opcionInsert: 0
    }
    this.titulo = 'Nuevo encargado';
    // this.validarFormulario(form);
  }

  limpiarFormAlu(form?: NgForm) {
    if (form != null)
      form.reset();
    this.registroAlumnoService.alumnoSeleccionado = {
      alumnoId: null,
      colegioId: 3,
      alumnoNombre1: this.childExample,
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

  validarFormulario(form: NgForm) {
    if (form.value.alumnoId == null) { form.value.alumnoId = 0 }
    if (form.value.encargadoId == null) { form.value.encargadoId = 0 }
    if (form.value.colegioId == null) { form.value.colegioId = 3 }
    if (form.value.encargadoNombre1 == null) { form.value.encargadoNombre1 = '' }
    if (form.value.encargadoNombre2 == null) { form.value.encargadoNombre2 = '' }
    if (form.value.encargadoApellido1 == null) { form.value.encargadoApellido1 = '' }
    if (form.value.encargadoApellido2 == null) { form.value.encargadoApellido2 = '' }
    if (form.value.email == null) { form.value.email = '' }
    if (form.value.direccion == null) { form.value.direccion = '' }
    if (form.value.telefono1 == null) { form.value.telefono1 = '' }
    if (form.value.telefono2 == null) { form.value.telefono2 = '' }
    if (form.value.opcionDML == null) { form.value.opcionDML = 0 }
    if(form.value.opcionInsert== null){ form.value.opcionInsert= 0}
  }

  /**onSubmint se ejecuta desde el boton "enviar datos" del formulario para nuevo encargado en el tab-set "Nuevo Encargado" */
  onSubmit(form: NgForm) {
    let mensaje: string = '';
    form.value.colegioId = 3; //inicializamos estos parametros para no tener probleas en la llamada al servicio
    /**No asignamos directamente "registroAlumnoService.alumnoSeleccionado.alumnoId" en el formulario debido a que este se resetea y pone el alumnoId a cero y ya no puede continuar agregandosele encargados al alumno seleccionado*/
    form.value.alumnoId = this.registroAlumnoService.alumnoSeleccionado.alumnoId;
    // console.log(form.value);
    /**Validamos que no vallan datos nulos */
    this.validarFormulario(form)
    /**validamos que si es la pantalla para agregar un encargado hacemos el set de la variable opcionInsert = 1 para
     * que solo ejecute el insert del encargado sin relacionarlo al alumno. (Pa_Agregar_Representante)*/
    if(this.childData.esHijo==false){
      form.value.opcionInsert= 1
    }
    /**Si el id del encargado es 0 entonces guardamos un nievo registro, sino editamos el registro */
    if (form.value.encargadoId == 0) {
      if (form.value.alumnoId != 0) {
        // alert('Guardamos');
        form.value.opcionDML = 1; //parametro que indica que metodo de la clase nivel se va a ejecutar en el servicio

        this.encargadoService.postEncargado(form.value)
          .subscribe(data => {
            this.encargadoService.encargadoList2 = data.mRepresentanteResult;
            this.encargadoService.encargadoList2.forEach(element => {
              this.msg = element.errorNombre;
            })
            this.buscarEncargado();
            this.limpiarForm(form);
            if (this.aluIdUrl > 0) {
              this.continuarInscripcion();
            } else {
              this.toastservice.show_mensaje_exito(this.msg)
            }

          })
      } else {

        form.value.opcionDML = 1; //parametro que indica que metodo de la clase nivel se va a ejecutar en el servicio
        this.encargadoService.postEncargado(form.value)
          .subscribe(data => {
            this.encargadoService.encargadoList2 = data.mRepresentanteResult;
            this.encargadoService.encargadoList2.forEach(element => {
              this.msg = element.errorNombre;
            })
            this.buscarEncargado();
            this.limpiarForm(form);
            if (this.aluIdUrl > 0) {
              this.continuarInscripcion();
            } else {
              this.toastservice.show_mensaje_exito(this.msg)
            }

          },error => {
            this.toastservice.show_mensaje_error("Ocurrio un error", error)
          }
          )
        // this.toastservice.show_mensaje_precaucion('Seleccione un alumno en la sección "Asociar encargado"');
      }
    } else {
      // alert('Editamos');
      if (confirm('Se va a modificar el registro, ¿desea continuar?')) {
        form.value.opcionDML = 3; //parametro que indica que metodo de la clase nivel se va a ejecutar en el servicio
        this.encargadoService.postEncargado(form.value)
          .subscribe(data => {
            this.encargadoService.encargadoList2 = data.mRepresentanteResult;
            this.encargadoService.encargadoList2.forEach(element => {
              this.msg = element.errorNombre;
              // console.log(this.msg);
              this.toastservice.show_mensaje_exito(this.msg)
            })
          })

        this.limpiarForm(form);
      }
    }
  }

  /**Esta funcion muestra el perfil del alumno y se ejecuta desde el bton "seleccionar" en la tabla del MODAL buscar alumno
   *  en el tab-set "Asociar encargado */
  verPerfilAlumno(alu: Alumno) {
    this.registroAlumnoService.alumnoSeleccionado = Object.assign({}, alu);
    // if(!this.childData.esInscripcion){
      this.buscarEncargado();

    // }

  }

  /**-Esta funcion devuelve los encargados asignados a un alumno (pasa como parametro el id del alumno)
   *  se ejectura desde el boton seleccionar en la tabla del MODAL "buscar alumno" en el tab-set "Asociar encargado"*/
  buscarEncargado() {
    this.encargados.colegioId = 3;
    this.encargados.opcionDML = 4;
    this.encargados.opcionSelect = 1;
    this.encargados.alumnoId = this.registroAlumnoService.alumnoSeleccionado.alumnoId;

    this.encargadoService.getEncargadoList(this.encargados).subscribe(
      response => {
        this.encargadoService.encargadoList = response.mRepresentanteResult;
        this.num_items_busqueda_alum = this.encargadoService.encargadoList;
        if (this.registroAlumnoService.alumnoSeleccionado.foto != '') {
          this.foto_alumno = this.registroAlumnoService.alumnoSeleccionado.foto;
          this.blnBanderafoto = true;
        } else {
          this.blnBanderafoto = false;
        };
      },
      error => {
        console.log(<any>error);
        this.toastservice.show_mensaje_error('Error... ' + <any>error);
      }
    );
  }
  /**Esta funcion busca todos los encargados que coinsiden con el nombre o apellido ingresado
   * se ejecuta desde el boton "Buscar encargado" en el MODAL "buscar encargado", en el tab-set "Asociar encargado"  */
  buscarEncargadoEnca(form: NgForm) {
    this.encargados.encargadoId = 0;
    this.encargados.colegioId = 3;
    this.encargados.opcionDML = 4;
    this.encargados.opcionSelect = 2;
    this.encargados.alumnoId = 0;
    this.encargados.encargadoNombre1 = form.value.encargadoNombre1;

    this.encargadoService.getEncargadoList(this.encargados).subscribe(
      response => {
        this.encargadoService.encargadoList2 = response.mRepresentanteResult;
        this.num_items_busqueda_alum = this.encargadoService.encargadoList2;
      },
      error => {
        console.log(<any>error);
        this.toastservice.show_mensaje_error('Error... ' + <any>error);
      }
    );
  }
  /**---------------------------------FUNCIONES PARA ASOCIAR Y ELIMINAR ENCARGADOS-------------------------------- */

  /**Copia los datos de una fila de la tabla al modelo, para luego ejecutar la funcion asociarEncargado(a)
   * se ejecuta desde los botones asociar el el MODAL de buscar en cargados y eliminar en la tabla de encargados*/
  pasarEncargadoAlModelo(enca: Encargado) {
    this.encargadoService.encargadoSeleccionado = Object.assign({}, enca);
    let pId: any;
    let dId: any;
    pId = this.encargadoService.encargadoSeleccionado.paisId;
    dId = this.encargadoService.encargadoSeleccionado.departamentoId;
    this.listarDepartamento(pId);
    this.listarMunicipio(dId);
  }
  /**Funcion que ejecuta dos procedimientos almacenados dependiendo del parametro que se envie
   * el parametro "1" inserta el id del encargado y el id del alumno en la tabla tbl_rep_x_alu
  * y Se ejecuta desde el boton asociar en la tabla del MODAL "buscar representante" en el tab-set de asociar encargado*/
  /**Tambien se ejecuta en el boton eliminar de la tabla de encargados, en este caso pasa el parametro "2" que ejecuta
   * un update en el sp y cambia el estado del registro a "2", idicando que esta eliminado. */
  asociarEncargado(tipoConsulta: number) {
    // alert('AsociarEncargado alumnoId='+this.registroAlumnoService.alumnoSeleccionado.alumnoId);
    if (tipoConsulta == 1) { this.alumnosxEncargados.estadoId = 1; }
    else if (tipoConsulta == 2) { this.alumnosxEncargados.estadoId = 2; }
    this.alumnosxEncargados.colegioId = 3; //inicializamos estos parametros para no tener probleas en la llamada al servicio
    this.alumnosxEncargados.alumnoId = this.registroAlumnoService.alumnoSeleccionado.alumnoId;
    this.alumnosxEncargados.encargadoId = this.encargadoService.encargadoSeleccionado.encargadoId;
    this.alumnosxEncargados.opcionDML = 1;
    /** tipo consulta es el parametro que indica la consulta que se va a ejecutar en el sp llamado "Pa_Agregar_rep_x_alu" */
    this.alumnosxEncargados.tipoConsulta = tipoConsulta;
    if (this.alumnosxEncargados.alumnoId != null) {
      this.alumnoxEncargadoService.postAlumnoxEncargado(this.alumnosxEncargados)
        .subscribe(data => {
          this.alumnoxEncargadoService.alumnoxEncargadoList = data.mAlumnoxEncargadoResult;
          this.alumnoxEncargadoService.alumnoxEncargadoList.forEach(element => {
            this.msg = element.errorNombre;
          })
          this.buscarEncargado();
          this.toastservice.show_mensaje_exito(this.msg);
        })
    } else {
      this.toastservice.show_mensaje_precaucion('Seleccione el alumno')
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
        this.num_items_busqueda_alum = this.registroAlumnoService.alumnoList;
      },
      error => {
        console.log(<any>error);
        this.toastservice.show_mensaje_error('Error... ' + <any>error);
      }
    );
  }

  buscarAlumnoXId() {
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
        this.toastservice.show_mensaje_error('Error... ' + <any>error);
      }
    );
    // this.verPerfilAlumno(this.registroAlumnoService.alumnoSeleccionado)
  }

  continuarInscripcion() {
    this._router.navigate(["/inscripcion", this.registroAlumnoService.alumnoSeleccionado.alumnoId]);
  }
  /** --------------------------------------AREA DE COMBOS-------------------------------- */
  listarGenero() {
    this.generoService.getGeneroList();
  }

  listarPais() {
    this.paisService.getPaisList(this.paises).subscribe(
      response => {
        this.paisService.paisList = response.mPaisResult;
        console.log(this.paisService.paisList);
      },
      error => {
        console.log(<any>error);
        this.toastservice.show_mensaje_error('Error... ' + <any>error);
      }
    );
  }

  listarDepartamento(paisId: any) {
    if (paisId != null) {
      this.departamentos.paisId = paisId;
      this.departamentoService.getDepartamentoList(this.departamentos).subscribe(
        response => {
          this.departamentoService.departamentoList = response.mDeptoResult;
        },
        error => {
          console.log(<any>error);
          this.toastservice.show_mensaje_error('Error... ' + <any>error);
        }
      );
    }
  }

  listarMunicipio(departamentoId: any) {
    if (departamentoId != null) {
      this.municipios.departamentoId = departamentoId;
      this.municipioService.getMunicipioList(this.municipios).subscribe(
        response => {
          this.municipioService.municipioList = response.mMuniResult;
        },
        error => {
          console.log(<any>error);
          this.toastservice.show_mensaje_error('Error... ' + <any>error);
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
        this.toastservice.show_mensaje_error('Error... ' + <any>error);
      }
    );
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
}
