import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CicloService } from '../services/ciclo.service';
import { EstadoService } from '../services/estado.service';
import { Ciclo } from '../models/ciclo';
import { NgForm } from '@angular/forms';
import { Estado } from '../models/estado';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'ciclo',
    templateUrl: '../views/ciclo.html',    
    providers: [CicloService],
    styleUrls: ['../style_hawk/general.style.css']
})

export class CicloComponent implements OnInit{
    public titulo         : string;
    /* Nieles2 es un json que se crea alternativamente para mandarlo como parametro en la funcion listar niveles, porque asi lo requiere el servicio */
    public ciclos         : Ciclo;
    closeResult           : string;
    // habilitadoInscripcion : string;    
    /* se declara este objeto porque se debe pasar un json como parametro al servicio */
    estados: Estado;


    constructor(private httpClient:HttpClient,
        private _route: ActivatedRoute,
        private _router: Router,
        public cicloService: CicloService,
        public estadoService: EstadoService,
        public modalService: NgbModal,
        // public flashMensaje: FlashMessageService
        // private toastr : ToastrService
    ){
        this.titulo = 'Ciclos Escolares';
        // this.nivelService.nivelSeleccionado = new Nivel2(null,null,'',null,null,null,'');
        //inicializamos el modelo
        this.ciclos = new Ciclo(0,0,0,'',0,'',0,0,'', 0);
        this.estados = new Estado(0,0,'',0,'');

    }

    ngOnInit(){
        console.log('Se ha cargado el componente ciclo.component.ts');
        this.limpiarForm();
        // this.listarCiclo();
        this.listarEstado();
    }

    limpiarForm(form?: NgForm){
        if(form != null)
        form.reset();
        this.cicloService.cicloSeleccionado= {
            colegioId : 3,
            cicloId : null,
            anio : null,
            cicloNombre : '',
            estado: null,
            codEstadoNombre: '',
            opcionDML: null,
            opcionSelect: null,
            error: '' ,
            habilitadoParaIncripcion: null
        }
      
        // this.cicloService.cicloList = [{
        //     colegioId : 3,
        //     cicloId : null,
        //     anio : null,
        //     cicloNombre : '',
        //     estado: null,
        //     codEstadoNombre: '',
        //     opcionDML: null,
        //     opcionSelect: null,
        //     error: '',
        //     habilitadoParaIncripcion: null
        // }]
    }

    onSubmit(form: NgForm) {
        form.value.colegioId = 3;
        form.value.opcionSelect = 0; //parametro que indica que sp se va a ejecutar en la base de datos
        form.value.error = '';
        if (form.value.cicloId == null) {
            // alert('Guardamos');
            form.value.cicloId = 0;
            form.value.opcionDML = 1; //parametro que indica que metodo de la clase nivel se va a ejecutar en el servicio
        } else {
            // alert('Editamos');
            form.value.opcionDML = 3; //parametro que indica que metodo de la clase nivel se va a ejecutar en el servicio
        }
        this.cicloService.postCiclo(form.value)
            .subscribe(data => {
                this.limpiarForm(form);
                this.listarCiclo();
                // this.toastr.success('Nuevo registro guardado con éxito', 'Rgistro de Niveles Educativos');
            })
    }


    listarCiclo(){
        this.ciclos.cicloId = 0;
        this.ciclos.anio = 0;
        this.ciclos.colegioId = 3;
        this.ciclos.opcionDML = 2;
        this.ciclos.error = '';
        this.ciclos.opcionSelect = 1;
        this.cicloService.getCicloList(this.ciclos).subscribe(response => {
          this.cicloService.cicloList = response.mCicloResult;
          // console.log('response.mCicloResult', this.cicloService.cicloList);
        //   this.carreraService.carreraList = response.mCarreraResult;  
                // this.cicloService.cicloList = response;
                // this._router.navigate(["/buscar-nivel"]);
            },
            error => {
                console.log(<any>error);
                alert('Error... ' + <any>error);
            }
        );
    }


    showForEdit(cic : Ciclo){
         this.cicloService.cicloSeleccionado = Object.assign({}, cic);
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

    /**-------------------------------------------MODAL--------------------------------------- */

  open(content) {
      this.listarCiclo();
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
