import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, } from '@angular/router';
import { NgForm } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
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
// import { Alumno } from '../models/alumno';
// import * as jQuery from 'jquery'
// declare var $: any;

import { ToastService } from '../toast/toast.service';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'alumno-reg',
  templateUrl: '../views/alumno.html',
  providers: [RegistroAlumnoSevice
    , PaisService
    , DepartamentoService
    , MunicipioService
    , ToastService
  ],
  styleUrls: ['../style_hawk/general.style.css']
  // providers: [RegistroAlumnoSevice]
})
export class AlumnoComponent implements OnInit {

  /**------------------------------DECLARACION DE VARIABLES ---------------------------------------- */
  model: NgbDateStruct;
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

  // public isCollapsed = false;
  // public models = false ;

  public collapsed_json = {
    first: false,
    second: false,
    third: false,
  }

  parentExample: string = "Hawk is your fathers";
  parentData = {
    esHijo: true
    , alumnoId: 0
    , esInscripcion: false
  }
  public active; // esta variable es para el tab que estara activo
  public valorBandera = false;
  public activo1: boolean;
  public activo2: boolean;
  public activo3: boolean;
  public activo4: boolean;
  public colorInactivo = "#85929E"
  public colorActivo = "#DF6156"
  public colorletra = "#FFFAF0"
  public progreso_={
      porcentaje_: '0'
      ,porcentaje_noLG: '0'
      ,strmensaje_:''
  }


  public colorSelec ={
    colorSelec1: this.colorInactivo
    ,colorSelec2: this.colorInactivo
    ,colorSelec3: this.colorInactivo
    ,colorSelec4: this.colorInactivo

  }

  public num_items_busqueda_alum = [];
  public page = 1;
  public pageSize =10;

  /**---------------------------------------------------------------------------------------------------- */
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    public registroAlumnoService: RegistroAlumnoSevice,
    public generoService: GeneroSevice,
    public paisService: PaisService,
    public modalService: NgbModal,
    public departamentoService: DepartamentoService,
    public municipioService: MunicipioService,
    public estadoService: EstadoService
    , public toastservice: ToastService
  ) {
  //   for(let i = 1; i <= 100; i++){
  //     this.items.push({Name: 'Shop ' + i});
  //  }

    this.titulo = 'Nuevo alumno';
    this.alumnos = new Alumno(0, 0, '', '', '', '', '', '', 0, '', '', '', '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 0, '', 0, 0, '', 0, 0, 0, 0);
    this.paises = new Pais(0, '', 0, 0, 0, 0, 0);
    this.departamentos = new Departamento(0, 0, '', 0, 0);
    this.municipios = new Municipio(0, 0, '', 0, 0);
    this.estados = new Estado(0, 0, '', 0, '');

    this.activo1 = this.valorBandera;
    this.activo2 = this.valorBandera;
    this.activo3 = this.valorBandera;
    this.activo4 = this.valorBandera;
    this.colorSelec.colorSelec1 = this.colorInactivo;
    this.colorSelec.colorSelec2 = this.colorInactivo;
    this.colorSelec.colorSelec3 = this.colorInactivo;
    this.colorSelec.colorSelec4 = this.colorInactivo;
    this.colorletra= "#DCE2E7"
    this.progreso_.porcentaje_= '0';
    this.progreso_.porcentaje_noLG= '0'
    this.progreso_.strmensaje_='';



  }

  ngOnInit() {
    this.limpiarForm();
    this.listarGenero();
    this.listarPais();
    this.listarEstado();
    this.activo1 = true;
    // this.probarPaamUrl();

    // this.collapse();
  }


  limpiarForm(form?: NgForm) {
    if (form != null)
      form.reset();
      this.activar_wizar_(1);
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
      //nacionalidad en la bd es tipo string
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
    this.titulo = 'Nuevo alumno';
    this.parentData.alumnoId = 0;
    this.parentData.esHijo = true;
    this.parentData.esInscripcion = false;
    // this.validarFormulario(form);

  }

  validarFormulario(form: NgForm) {
    // if (this.registroAlumnoService.alumnoSeleccionado.alumnoId != null) {
    //   form.value.alumnoId = this.registroAlumnoService.alumnoSeleccionado.alumnoId;
    //   form.value.colegioId = this.registroAlumnoService.alumnoSeleccionado.colegioId;
    //   form.value.alumnoNombre1 = this.registroAlumnoService.alumnoSeleccionado.alumnoNombre1
    //   form.value.alumnoNombre2 = this.registroAlumnoService.alumnoSeleccionado.alumnoNombre2
    //   form.value.alumnoNombre3 = this.registroAlumnoService.alumnoSeleccionado.alumnoNombre3
    //   form.value.alumnoApellido1 = this.registroAlumnoService.alumnoSeleccionado.alumnoApellido1
    //   form.value.alumnoApellido2 = this.registroAlumnoService.alumnoSeleccionado.alumnoApellido2
    //   form.value.alumnoApellido3 = this.registroAlumnoService.alumnoSeleccionado.alumnoApellido3
    //   form.value.alumnoCarnet = this.registroAlumnoService.alumnoSeleccionado.alumnoCarnet
    //   form.value.codigoMineduc = this.registroAlumnoService.alumnoSeleccionado.codigoMineduc
    //   form.value.identificacion = this.registroAlumnoService.alumnoSeleccionado.identificacion //cui-dpi
    //   form.value.fechaNacimiento = this.registroAlumnoService.alumnoSeleccionado.fechaNacimiento
    //   form.value.email = this.registroAlumnoService.alumnoSeleccionado.email
    //   form.value.direccion = this.registroAlumnoService.alumnoSeleccionado.direccion
    //   form.value.telefono1 = this.registroAlumnoService.alumnoSeleccionado.telefono1
    //   form.value.telefono2 = this.registroAlumnoService.alumnoSeleccionado.telefono2
    //   form.value.foto = this.registroAlumnoService.alumnoSeleccionado.foto
    //   form.value.generoId           = this.registroAlumnoService.alumnoSeleccionado.generoId
    //   form.value.municipioId = this.registroAlumnoService.alumnoSeleccionado.municipioId
    //   //nacionalidad en la bd es tipo string
    //   form.value.nacionalidad = this.registroAlumnoService.alumnoSeleccionado.nacionalidad,
    //     form.value.representanteId = this.registroAlumnoService.alumnoSeleccionado.representanteId,
    //     form.value.opcionDML = 3
    //   form.value.descuento = this.registroAlumnoService.alumnoSeleccionado.descuento
    // } else if (this.registroAlumnoService.alumnoSeleccionado.alumnoId > 0) {
    //   form.value.alumnoId = this.registroAlumnoService.alumnoSeleccionado.alumnoId;
    //   form.value.colegioId = this.registroAlumnoService.alumnoSeleccionado.colegioId;
    //   form.value.alumnoNombre1 = this.registroAlumnoService.alumnoSeleccionado.alumnoNombre1
    //   form.value.alumnoNombre2 = this.registroAlumnoService.alumnoSeleccionado.alumnoApellido2
    //   form.value.alumnoNombre3 = this.registroAlumnoService.alumnoSeleccionado.alumnoApellido3
    //   form.value.alumnoApellido1 = this.registroAlumnoService.alumnoSeleccionado.alumnoApellido1
    //   form.value.alumnoApellido2 = this.registroAlumnoService.alumnoSeleccionado.alumnoApellido2
    //   form.value.alumnoApellido3 = this.registroAlumnoService.alumnoSeleccionado.alumnoApellido3
    //   form.value.alumnoCarnet = this.registroAlumnoService.alumnoSeleccionado.alumnoCarnet
    //   form.value.codigoMineduc = this.registroAlumnoService.alumnoSeleccionado.codigoMineduc
    //   form.value.identificacion = this.registroAlumnoService.alumnoSeleccionado.identificacion //cui-dpi
    //   form.value.fechaNacimiento = this.registroAlumnoService.alumnoSeleccionado.fechaNacimiento
    //   form.value.email = this.registroAlumnoService.alumnoSeleccionado.email
    //   form.value.direccion = this.registroAlumnoService.alumnoSeleccionado.direccion
    //   form.value.telefono1 = this.registroAlumnoService.alumnoSeleccionado.telefono1
    //   form.value.telefono2 = this.registroAlumnoService.alumnoSeleccionado.telefono2
    //   form.value.foto = this.registroAlumnoService.alumnoSeleccionado.foto
    //   form.value.generoId = this.registroAlumnoService.alumnoSeleccionado.generoId
    //   form.value.municipioId = this.registroAlumnoService.alumnoSeleccionado.municipioId
    //   form.value.nacionalidad = this.registroAlumnoService.alumnoSeleccionado.nacionalidad,
    //     form.value.representanteId = this.registroAlumnoService.alumnoSeleccionado.representanteId,
    //     form.value.opcionDML = 3
    //   form.value.descuento = this.registroAlumnoService.alumnoSeleccionado.descuento
    // }

    // if(this.registroAlumnoService.alumnoSeleccionado.alumnoId == null && form.value.alumnoId== null){
    //   return;
    // }

    if (form.value.alumnoId == null) { form.value.alumnoId = 0 }else{
      form.value.alumnoId = this.registroAlumnoService.alumnoSeleccionado.alumnoId;
    }
    // if (form.value.colegioId == null) { form.value.colegioId = 3 }
    // if (form.value.alumnoNombre1 == null) { form.value.alumnoNombre1 = '' }
    // if (form.value.alumnoNombre2 == null) { form.value.alumnoNombre2 = '' }
    // if (form.value.alumnoNombre3 == null) { form.value.alumnoNombre3 = '' }
    // if (form.value.alumnoApellido1 == null) { form.value.alumnoApellido1 = '' }
    // if (form.value.alumnoApellido2 == null) { form.value.alumnoApellido2 = '' }
    // if (form.value.alumnoApellido3 == null) { form.value.alumnoApellido3 = '' }
    // if (form.value.alumnoCarnet == null) { form.value.alumnoCarnet = 0 }
    // if (form.value.codigoMineduc == null) { form.value.codigoMineduc = '' }
    // if (form.value.identificacion == null) { form.value.identificacion = '' } //cui-dpi
    // if (form.value.fechaNacimiento == null) { form.value.fechaNacimiento = '' }
    // if (form.value.email == null) { form.value.email = '' }
    // if (form.value.direccion == null) { form.value.direccion = '' }
    // if (form.value.municipioId == null) { form.value.municipioId = '' }
    // if (form.value.telefono1 == null) { form.value.telefono1 = '' }
    // if (form.value.telefono2 == null) { form.value.telefono2 = '' }
    // if (form.value.foto == null) { form.value.foto = '' }
    // if (form.value.generoId == null) { form.value.generoId = '' }
    // if (form.value.municipioId = null) { form.value.municipioId = 0 }
    // if (form.value.nacionalidad = null) { form.value.nacionalidad = '' }
    // if (form.value.representanteId = null) { form.value.representanteId = 0 }
    // if (form.value.opcionDML == null) { form.value.opcionDML = 0 }
    // if (form.value.descuento == null) { form.value.descuento = 0 }

    // form.value.alumnoId = this.registroAlumnoService.alumnoSeleccionado.alumnoId;
    form.value.colegioId = this.registroAlumnoService.alumnoSeleccionado.colegioId;
    form.value.alumnoNombre1 = this.registroAlumnoService.alumnoSeleccionado.alumnoNombre1
    form.value.alumnoNombre2 = this.registroAlumnoService.alumnoSeleccionado.alumnoNombre2
    form.value.alumnoNombre3 = this.registroAlumnoService.alumnoSeleccionado.alumnoNombre3
    form.value.alumnoApellido1 = this.registroAlumnoService.alumnoSeleccionado.alumnoApellido1
    form.value.alumnoApellido2 = this.registroAlumnoService.alumnoSeleccionado.alumnoApellido2
    form.value.alumnoApellido3 = this.registroAlumnoService.alumnoSeleccionado.alumnoApellido3
    form.value.alumnoCarnet = this.registroAlumnoService.alumnoSeleccionado.alumnoCarnet
    form.value.codigoMineduc = this.registroAlumnoService.alumnoSeleccionado.codigoMineduc
    form.value.identificacion = this.registroAlumnoService.alumnoSeleccionado.identificacion //cui-dpi
    form.value.fechaNacimiento = this.registroAlumnoService.alumnoSeleccionado.fechaNacimiento
    form.value.email = this.registroAlumnoService.alumnoSeleccionado.email
    form.value.direccion = this.registroAlumnoService.alumnoSeleccionado.direccion
    form.value.telefono1 = this.registroAlumnoService.alumnoSeleccionado.telefono1
    form.value.telefono2 = this.registroAlumnoService.alumnoSeleccionado.telefono2
    form.value.foto = this.registroAlumnoService.alumnoSeleccionado.foto
    // form.value.generoId = parseInt( this.registroAlumnoService.alumnoSeleccionado.generoId)
    form.value.municipioId = this.registroAlumnoService.alumnoSeleccionado.municipioId
    //nacionalidad en la bd es tipo string
    form.value.nacionalidad = this.registroAlumnoService.alumnoSeleccionado.nacionalidad,
    form.value.representanteId = this.registroAlumnoService.alumnoSeleccionado.representanteId,
    // form.value.opcionDML = 3
    form.value.descuento = this.registroAlumnoService.alumnoSeleccionado.descuento
  }

  onSubmit(form: NgForm) {
    let mensaje: string = '';
    form.value.colegioId = 3; //inicializamos estos parametros para no tener probleas en la llamada al servicio
    // console.log(form.value);
    if (form.status != 'INVALID') {
      this.validarFormulario(form)
      console.log("fecha_nacimiento:::: ", form.value.fechaNacimiento);
      if (form.value.alumnoId == 0) {
        // alert(form.value.alumnoId);
        form.value.opcionDML = 1; //parametro que indica que metodo de la clase nivel se va a ejecutar en el servicio
        this.registroAlumnoService.postAlumno(form.value)
          .subscribe(data => {
            this.registroAlumnoService.alumnoList = data.mAlumnoResult;
            this.registroAlumnoService.alumnoList.forEach(element => {
              this.identity = element.identity
              this.msg = element.errorNombre;
            })
            // this.limpiarForm(form);
            if (this.identity == -1) {
              this.toastservice.show_mensaje_precaucion(this.msg);
              // this.limpiarForm(form);
            } else {
              this.toastservice.show_mensaje_exito('Alumno guardado con exito, favor de ingresar los datos de los padres y/o encargados...');
              // alert('Si identity no es -1: '+this.msg+' identity=' +this.identity)
              this.parentData.alumnoId = this.identity
              this.parentData.esHijo = true;
              this.parentData.esInscripcion = false;
              this.active = 3;
              // this._router.navigate(["/encargado", this.identity]);
            }
          })

      } else {
        if (confirm('Se van a guardar los cambios realizados, ¿Desea continuar?')) {
          // this.validarFormulario(form)
          form.value.opcionDML = 3; // editar
          form.value.municipioId = this.registroAlumnoService.alumnoSeleccionado.municipioId
          this.registroAlumnoService.postAlumno(form.value)
            .subscribe(data => {
              this.registroAlumnoService.alumnoList = data.mAlumnoResult;
              this.registroAlumnoService.alumnoList.forEach(element => {
                this.identity = element.identity
                this.msg = element.errorNombre;
              })
              this.limpiarForm(form);
              this.toastservice.show_mensaje_exito(this.msg);
            })
        }
      }
    }

  }

  guardarDatosColegio(form: NgForm) {
    this.validarFormulario(form);
    this.registroAlumnoService.alumnoSeleccionado.colegioId = 3;
    this.registroAlumnoService.alumnoSeleccionado.opcionDML = 3;
    this.registroAlumnoService.alumnoSeleccionado.alumnoCarnet = form.value.alumnoCarnet;
    this.registroAlumnoService.alumnoSeleccionado.codigoMineduc = form.value.codigoMineduc;
    if (this.registroAlumnoService.alumnoSeleccionado.alumnoId != null) {
      this.registroAlumnoService.postAlumno(this.registroAlumnoService.alumnoSeleccionado)
        .subscribe(data => {
          this.registroAlumnoService.alumnoList = data.mAlumnoResult;
          this.registroAlumnoService.alumnoList.forEach(element => {
            this.msg = element.errorNombre;
          })
          this.limpiarForm(form);
          this.toastservice.show_mensaje_exito(this.msg);
        })
    } else {
      this.toastservice.show_mensaje_precaucion('Seleccione el alumno');
    }
  }

  showForEdit(alu: Alumno) {
    this.titulo = 'Editando alumno';
    this.activar_wizar_(1);
    this.registroAlumnoService.alumnoSeleccionado = Object.assign({}, alu);
    this.parentData.alumnoId = this.registroAlumnoService.alumnoSeleccionado.alumnoId;
    this.parentData.esHijo = true;
    this.parentData.esInscripcion = false;
    console.log("datos a traspasar valores en el padre", this.parentData);
    /** Formatear fecha para que lo acepte el input tipo date */
    // console.log("la fecha de la db::::",this.registroAlumnoService.alumnoSeleccionado.fechaNacimiento );
    // console.log("dia::::",this.registroAlumnoService.alumnoSeleccionado.fechaNacimiento.substring(0, 2) );
    // console.log("mes::::",this.registroAlumnoService.alumnoSeleccionado.fechaNacimiento.substring(3, 5) );
    console.log("año::::", this.registroAlumnoService.alumnoSeleccionado.fechaNacimiento.split('/', 2) + '' + this.registroAlumnoService.alumnoSeleccionado.fechaNacimiento.split('/', 1) + '' + this.registroAlumnoService.alumnoSeleccionado.fechaNacimiento.split('/', 0));

    let dia = this.registroAlumnoService.alumnoSeleccionado.fechaNacimiento.substring(0, 2);
    let mes = this.registroAlumnoService.alumnoSeleccionado.fechaNacimiento.substring(3, 5);
    let anio = this.registroAlumnoService.alumnoSeleccionado.fechaNacimiento.substring(6, 10);
    this.registroAlumnoService.alumnoSeleccionado.fechaNacimiento = anio + '-' + mes + '-' + dia;
    let pId: any;
    let dId: any;
    pId = this.registroAlumnoService.alumnoSeleccionado.paisId;
    dId = this.registroAlumnoService.alumnoSeleccionado.departamentoId;
    this.listarDepartamento(pId);
    this.listarMunicipio(dId);
  }

  /**---------------------------------------Funciones varias-------------------------------- */



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

  buscarAlumno(form: NgForm) {
    this.alumnos.colegioId = 3;
    this.alumnos.opcionDML = 4;
    this.alumnos.opcionConsulta = 1;
    this.alumnos.alumnoNombre1 = form.value.alumnoNombre1;

    this.registroAlumnoService.getAlumnoList(this.alumnos).subscribe(
      response => {
        this.registroAlumnoService.alumnoList = response.mAlumnoResult;
        this.num_items_busqueda_alum= this.registroAlumnoService.alumnoList;
        console.log(this.registroAlumnoService.alumnoList);
        // this._router.navigate(["/buscar-nivel"]);

      },
      error => {
        console.log(<any>error);
        this.toastservice.show_mensaje_error('Error... ' + <any>error);
      }
    );

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

  activar_wizar_(intSeccion: number) {
    if(this.activo1 && intSeccion>2 ){
      this.toastservice.show_mensaje_error("Accion invalida, tiene que ir al siguiente paso")
      return;
    }else if(this.activo2 && intSeccion>3){
      this.toastservice.show_mensaje_error("Accion invalida, tiene que ir al siguiente paso")
      return;
    }

    if(this.activo4 && intSeccion<4 ){
      if(intSeccion== 3){
        this.colorSelec.colorSelec2 = this.colorActivo
      }else{
        this.colorSelec.colorSelec2 =this.colorInactivo

      }


      this.colorSelec.colorSelec3= this.colorInactivo
      this.colorSelec.colorSelec4= this.colorInactivo
      // this.colorSelec.colorSelec2="#D4E0D1"

    }

    if(this.activo3 && intSeccion<3){
      this.colorSelec.colorSelec2 =this.colorInactivo
      this.colorSelec.colorSelec3= this.colorInactivo
      // this.colorSelec.colorSelec4= this.colorInactivo

    }

    switch (intSeccion) {
      case 1:
        if(this.activo2){
          this.colorSelec.colorSelec2= this.colorInactivo
        }

        this.activo1 = !this.valorBandera;
        this.activo2 = this.valorBandera;
        this.activo3 = this.valorBandera;
        this.activo4 = this.valorBandera;
        this.colorSelec.colorSelec1= this.colorActivo
        // this.progreso_.porcentaje_ = "29.0%"
        this.progreso_.porcentaje_ = "25.0%"
        this.progreso_.porcentaje_noLG= "24.9%"
        this.progreso_.strmensaje_= '25%'
        break;
      case 2:
        if(this.activo3){
          this.colorSelec.colorSelec3= this.colorInactivo

        }
        this.activo1 = this.valorBandera;
        this.activo2 = !this.valorBandera;
        this.activo3 = this.valorBandera;
        this.activo4 = this.valorBandera;
        this.colorSelec.colorSelec2= this.colorActivo
        // this.progreso_.porcentaje_ = "52.1%"
        this.progreso_.porcentaje_ = "50.0%"
        this.progreso_.porcentaje_noLG="49.1%"
        this.progreso_.strmensaje_= '50%'

        break;
      case 3:
        if(this.activo4){
          this.colorSelec.colorSelec4= this.colorInactivo

        }
        this.activo1 = this.valorBandera;
        this.activo2 = this.valorBandera;
        this.activo3 = !this.valorBandera;
        this.activo4 = this.valorBandera;
        this.colorSelec.colorSelec3= this.colorActivo
        // this.progreso_.porcentaje_= "81.5%"
        this.progreso_.porcentaje_= "75.0%"
        this.progreso_.porcentaje_noLG="73.7%"
        this.progreso_.strmensaje_ = '75%'
        break;
      case 4:

        this.activo1 = this.valorBandera;
        this.activo2 = this.valorBandera;
        this.activo3 = this.valorBandera;
        this.activo4 = !this.valorBandera;
        this.colorSelec.colorSelec4= this.colorActivo
        this.progreso_.porcentaje_= "100%"
        this.progreso_.porcentaje_noLG= "100%"
        this.progreso_.strmensaje_= this.progreso_.porcentaje_
        break;
      default:
        break;
    }
  }
  // // $('.my-box').boxWidget(options)
  // collapse(){
  //   $('.title').slideToggle(); //
  // }
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

  // public Ocultar_body(  blnisCollapsed,blnModels){
  //   this.isCollapsed=!blnisCollapsed;
  //   this.models = !blnModels;
  //   console.log("este es el valor de isCollapsed",this.isCollapsed);
  //   console.log("este es el valor de models",this.models);
  // }

}
