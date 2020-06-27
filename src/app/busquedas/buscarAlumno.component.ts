import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
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

import { ToastService } from '../toast/toast.service';

@Component({
  selector: 'buscar-alumno',
  templateUrl: './buscarAlumno.html',
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
export class BuscarAlumno implements OnInit {

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
  @Output() output_data_enviar = new EventEmitter;

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
    ,public toastservice: ToastService
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
  }

  ngOnInit() {
    // let aluId: any;
    this.limpiarForm();
    this.limpiarFormAlu();
    if(this.childData.alumnoId != 0){
      this.registroAlumnoService.alumnoSeleccionado.alumnoId = this.childData.alumnoId;
      this.buscarAlumnoXId()
    }
    // this.aluIdUrl = +this._route.snapshot.paramMap.get('id');
    // if (isNaN(this.aluIdUrl) === true) {
    //   this.registroAlumnoService.alumnoSeleccionado.alumnoId = 0;
    // } else {
    //   if (this.childData.esHijo == true) {
    //     this.registroAlumnoService.alumnoSeleccionado.alumnoId = this.childData.alumnoId;

    //     // asociarEncargado(1);
    //     // this.verPerfilAlumno(this.registroAlumnoService.alumnoList);
    //     this.buscarAlumnoXId();
    //     // this.buscarEncargado();
    //     // if(this.registroAlumnoService.alumnoSeleccionado.foto !=''){
    //     //   this.foto_alumno = this.registroAlumnoService.alumnoSeleccionado.foto;
    //     //   this.blnBanderafoto=true;
    //     // }else{
    //     //   this.blnBanderafoto=false;

    //     // }

    //   } else {
    //     this.registroAlumnoService.alumnoSeleccionado.alumnoId = this.aluIdUrl;
    //   }

    // }
    // // this.listarGenero();
    // // this.listarPais();
    // // this.listarEstado();
    // if (this.registroAlumnoService.alumnoSeleccionado.alumnoId > 0) {
    //   this.buscarAlumnoXId();
    // }
    this.registroAlumnoService.alumnoSeleccionado.alumnoId= this.childData.alumnoId;
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
      ,opcionInsert:0
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
  verPerfilAlumno(alu: Alumno) {
    this.registroAlumnoService.alumnoSeleccionado = Object.assign({}, alu);
    this.output_data_enviar.emit(this.registroAlumnoService.alumnoSeleccionado);
      if (this.registroAlumnoService.alumnoSeleccionado.foto != '') {
        this.foto_alumno = this.registroAlumnoService.alumnoSeleccionado.foto;
        this.blnBanderafoto = true;
      } else {
        this.blnBanderafoto = false;
      };

  }


}
