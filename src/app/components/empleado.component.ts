import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { EmpleadoService } from '../services/empleado.service';
import { GeneroSevice } from '../services/genero.service';
import { Empleado } from '../models/empleado';
import { PaisService } from '../services/pais.service';
import { Pais } from '../models/pais'
import { DepartamentoService } from '../services/departamento.service';
import { Departamento } from '../models/departamento'
import { MunicipioService } from '../services/municipio.service';
import { Municipio } from '../models/municipio';
import { EstadoService } from '../services/estado.service';
import { Estado } from '../models/estado';
import { AreaService } from '../services/area.service';
import { Area } from '../models/area';
import { CargoService } from '../services/cargo.service';
import { Cargo } from '../models/cargo';
// import { Esdocente } from '../models/esdocente';
// import { Alumno } from '../models/alumno';
// import * as jQuery from 'jquery'
// declare var $: any;

@Component({
  selector: 'empleado-reg',
  templateUrl: '../views/empleado.html',
  providers: [EmpleadoService,PaisService, DepartamentoService, MunicipioService],
  styleUrls: ['../style_hawk/general.style.css']
  // providers: [RegistroAlumnoSevice]
})
export class EmpleadoComponent implements OnInit {

  /**------------------------------DECLARACION DE VARIABLES ---------------------------------------- */
  model: NgbDateStruct;
  fechaNac: string;
  msg: string;
  // public identity: number;
  public titulo: string;
  closeResult: string;
  public empleados: Empleado;
  public paises : Pais;
  public departamentos : Departamento;
  public municipios : Municipio;
  public estados: Estado;
  public areas: Area;
  public cargos: Cargo;
  // public esDocentes: Esdocente;
  empleadoList: Empleado[];

  // public isCollapsed = false;
  // public models = false ;

  public collapsed_json = {
                            first: false,
                            second: false,
                            third: false,
                            four: false,
                          }

  parentExample: string  ="Hawk is your fathers";
  parentData = {
                  esHijo: true
                  ,empleadoId: 0
                  // ,esInscripcion: false
                }

  /**---------------------------------------------------------------------------------------------------- */
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    public empleadoService: EmpleadoService,
    public generoService: GeneroSevice,
    public paisService : PaisService,
    public modalService: NgbModal,
    public departamentoService : DepartamentoService,
    public municipioService : MunicipioService,
    public estadoService: EstadoService,
    public areaService: AreaService,
    public cargoService: CargoService

    ) {
    this.titulo = 'Nuevo empleado';
    this.empleados = new Empleado(0,0,'','','','','','','','','','','','',0,0,0,0,0,'','',0,'',0,false,0,0,0,0,'',0,'');
    this.paises = new Pais(0,'',0,0,0,0,0);
    this.departamentos = new Departamento(0,0,'',0,0);
    this.municipios = new Municipio(0,0,'',0,0);
    this.estados = new Estado(0,0,'',0,'');
    this.areas = new Area(0,0,'',0,0,0,'');
    this.cargos = new Cargo(0,0,'',0,'',0,0,'');
    }

  ngOnInit() {
    this.limpiarForm();
    this.listarGenero();
    this.listarPais();
    this.listarEstado();
    this.listarArea();
    this.listarCargo();
    this.listarEmpleado(1); // parametro 1 para llenar el select Jefe
    this.opcionesEsDocente();
    // this.probarPaamUrl();

    // this.collapse();
  }


  limpiarForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.empleadoService.empleadoSeleccionado = {
      id: 0,
      colegioId: 0,
      nombre1: '',
      nombre2: '',
      apellido1: '',
      apellido2: '',
      cui: '',
      nit: '',
      telefono1: '',
      telefono2: '',
      direccion: '',
      email:  '',
      fechaIngreso: '',
      fechaModificacion: '',
      empleadoJefeId: null,
      cargoId: null,
      areaId: null,
      estadoId: null,
      municipioId: null,
      fechaNacimiento: '',
      img: '',
      sueldo: null,
      genero: '',
      esDocenteAux: false,
      esDocente: null,
      opcionDML: null,
      opcionConsulta: 0,
      //estos no se envian
      departamentoId: null,
      paisId : null,
      estadoNombre: '',
      errorId : 0,
      error: ''
    }

    // this.titulo = 'Nuevo empleado';
    // this.parentData.alumnoId=0;
    // this.parentData.esHijo=true;
    // this.parentData.esInscripcion=false;
    // this.validarFormulario(form);

  }

  validarFormulario(form: NgForm) {
    if (form.value.id == null) { form.value.id = 0 }
    if (form.value.colegioId == null) { form.value.colegioId = 3 }
    if (form.value.nombre1 == null) { form.value.alumnoNombre1 = '' }
    if (form.value.nombre2 == null) { form.value.alumnoNombre2 = '' }
    if (form.value.apellido1 == null) { form.value.apellido1 = '' }
    if (form.value.apellido2 == null) { form.value.apellido2 = '' }
    if (form.value.cui == null) { form.value.cui = '' }
    if (form.value.nit == null) { form.value.nit = 0 }
    if (form.value.telefono1 == null) { form.value.telefono1 = '' }
    if (form.value.telefono2 == null) { form.value.telefono2 = '' }
    if (form.value.direccion == null) { form.value.direccion = '' }
    if (form.value.email == null) { form.value.email = '' }
    if (form.value.fechaIngreso == null) { form.value.fechaIngreso = '' }
    if (form.value.fechaModificacion == null) { form.value.fechaModificacion = '' }
    if (form.value.empleadoJefeId == null) { form.value.empleadoJefeId = 0 }
    if (form.value.cargoId == null) { form.value.cargoId = 0 }
    if (form.value.areaId == null) { form.value.areaId = 0 }
    if (form.value.estadoId == null) { form.value.estadoId = 1 }
    if (form.value.municipioId == null) { form.value.municipioId = 0 }
    if (form.value.fechaNacimiento == null) { form.value.fechaNacimiento = '' }
    if (form.value.img == null) { form.value.img = '' }
    if (form.value.sueldo == null) { form.value.sueldo = 0 }
    if (form.value.genero == null) { form.value.genero = '' }
    if (form.value.esDocente == null) { form.value.esDocente = 0 }
    if (form.value.opcionDML == null) { form.value.opcionDML = 0 }
    if (form.value.opcionConsulta == null) { form.value.opcionConsulta = 0 }
  }


  onSubmit(form: NgForm) {
    let mensaje: string = '';
    form.value.colegioId = 3;
    // console.log(form.value);
    this.validarFormulario(form)

    if (form.value.id == 0) {
      form.value.estadoId = 1;
      form.value.opcionDML = 1; //guardamos
      form.value.opcionConsulta = 1; // insert
      this.empleadoService.postEmpleado(form.value)
        .subscribe(data => {
          this.empleadoList = data.mEmpleadoResult;
          this.empleadoList.forEach(element => {
            // this.identity = element.identity
            this.msg = element.error;

          })
          this.limpiarForm(form);
          // if (this.identity == -1) {
          console.log('El error es: ',this.msg)
          alert(this.msg);
          // } else {
          //   // alert('Si identity no es -1: '+this.msg+' identity=' +this.identity)
          //   this._router.navigate(["/encargado", this.identity]);
          // }
        })

    } else {
      if (confirm('Se van a guardar los cambios realizados, ¿Desea continuar?')) {
        form.value.opcionDML = 3; // editar
        form.value.opcionConsulta = 2; // update
        this.empleadoService.postEmpleado(form.value)
          .subscribe(data => {
            this.empleadoService.empleadoList = data.mEmpleadoResult;
            this.empleadoList.forEach(element => {
              // this.identity = element.identity
              this.msg = element.error;
            })
            this.limpiarForm(form);
            alert(this.msg);
          })
      }
    }
  }

  showForEdit(emp: Empleado) {
    this.titulo = 'Editando datos del empleado';
    // if(emp.esDocenteAux==false){ emp.esDocente = 0}
    // else{emp.esDocente = 1}
    this.empleadoService.empleadoSeleccionado = Object.assign({}, emp);

    // console.log('fecha emp: ' ,emp.fechaNacimiento);



    // if(emp.esDocenteAux==false){ this.empleadoService.empleadoSeleccionado.esDocente = 0}
    // else{ this.empleadoService.empleadoSeleccionado.esDocente = 1}
    // console.log(this.empleadoService.empleadoSeleccionado);
    // this.parentData.esInscripcion=false;
    // console.log("datos a traspasar valores en el padre",this.parentData);
    /** Formatear fecha para que lo acepte el input tipo date */
    // console.log("la fecha de la db::::",this.registroAlumnoService.alumnoSeleccionado.fechaNacimiento );
    // console.log("dia::::",this.registroAlumnoService.alumnoSeleccionado.fechaNacimiento.substring(0, 2) );
    // console.log("mes::::",this.registroAlumnoService.alumnoSeleccionado.fechaNacimiento.substring(3, 5) );
    // console.log("año::::",this.registroAlumnoService.alumnoSeleccionado.fechaNacimiento.split('/',2) + '' +  this.registroAlumnoService.alumnoSeleccionado.fechaNacimiento.split('/',1) + '' +  this.registroAlumnoService.alumnoSeleccionado.fechaNacimiento.split('/',0));

    // let dia = this.empleadoService.empleadoSeleccionado.fechaNacimiento.substring(0, 2);
    // let mes = this.empleadoService.empleadoSeleccionado.fechaNacimiento.substring(3, 5);
    // let anio = this.empleadoService.empleadoSeleccionado.fechaNacimiento.substring(6, 10);
    // this.empleadoService.empleadoSeleccionado.fechaNacimiento = anio + '-' + mes + '-' + dia;

    // let pId : any;
    // let dId : any;
    // pId = this.empleadoService.empleadoSeleccionado.paisId;
    // dId = this.empleadoService.empleadoSeleccionado.departamentoId;
    // this.listarDepartamento(pId);
    // this.listarMunicipio(dId);
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

  buscarEmpleado(form: NgForm) {
    this.empleados.colegioId = 3;
    this.empleados.opcionDML = 4;
    this.empleados.opcionConsulta = 1;
    this.empleados.nombre1 = form.value.nombre1;

    this.empleadoService.getEmpleadoList(this.empleados).subscribe(
      response => {
        this.empleadoService.empleadoList = response.mEmpleadoResult;
        this.empleadoService.empleadoList.forEach(element => {

          this.msg = element.error;
        })

        console.log(this.empleadoService.empleadoList);
        // this._router.navigate(["/buscar-nivel"]);
      },
      error => {
        console.log(<any>error);
        alert('Error... ' + <any>error);
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
        console.log(this.paisService.paisList)  ;
      },
      error => {
        console.log(<any>error);
        alert('Error... ' + <any>error);
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
          alert('Error... ' + <any>error);
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
          alert('Error... ' + <any>error);
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
        alert('Error... ' + <any>error);
      }
    );
  }

  listarArea(){
    // alert('listar carreras')
    this.areaService.getAreaList(this.areas).subscribe(
        response => {
            this.areaService.areaList = response.mAreaResult;
        },
        error => {
            console.log(<any>error);
            alert('Error... ' + <any>error);
        }
    );
  }

  listarCargo(){
    // alert('listar carreras')
    this.cargoService.getCargoList(this.cargos).subscribe(
        response => {
            this.cargoService.cargoList = response.mCargoResult;
        },
        error => {
            console.log(<any>error);
            // alert('Error... ' + <any>error);
        }
    );
  }

  listarEmpleado(opc){
    // alert('listar carreras')
    this.empleados.nombre1 = '';
    this.empleados.colegioId = 3;
    this.empleados.opcionDML = 4;
    this.empleados.opcionConsulta = 2;
    this.empleadoService.getEmpleadoList(this.empleados).subscribe(
        response => {
          if(opc == 1){this.empleadoService.jefeList = response.mEmpleadoResult;}
          if(opc == 2){this.empleadoService.empleadoList = response.mEmpleadoResult;}
          if(opc == 1){this.empleadoService.docenteList = response.mEmpleadoResult;}
        },
        error => {
            console.log(<any>error);
            // alert('Error... ' + <any>error);
        }
    );
  }
    // // $('.my-box').boxWidget(options)
    // collapse(){
    //   $('.title').slideToggle(); //
    // }
    public hide_sections(intBtn_panel){
      switch (intBtn_panel) {
        case 1:
          this.collapsed_json.first = !this.collapsed_json.first
          break;
        case 2:
          this.collapsed_json.second = !this.collapsed_json.second
          break;
        case 3:
          this.collapsed_json.third = ! this.collapsed_json.third
          break;
        case 4:
          this.collapsed_json.four = ! this.collapsed_json.four
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

  opcionesEsDocente() {
    this.empleadoService.getOpcionesEsDocente();
  }
}
