import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NivelService } from '../services/nivel.service';
import { Nivel2 } from '../models/nivel2';
import { NgForm } from '@angular/forms';
//combos
import { EstadoService } from '../services/estado.service';
import { Estado } from '../models/estado';
import { ToastService } from '../toast/toast.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

// import { FlashMessageService } from 'angular2-flash-message';
// import { ToastrService } from 'ngx-toastr'


@Component({
    selector: 'nivel',
    templateUrl: '../views/nivel.html',
    providers: [  NivelService
                  ,ToastService
                ],
    styleUrls: ['../style_hawk/general.style.css']
})

export class NivelComponent implements OnInit{
    public titulo: string;
    closeResult  : string;
    /* Nieles2 es un json que se crea alternativamente para mandarlo como parametro en la funcion listar niveles, porque asi lo requiere el servicio */
    public niveles2: Nivel2;
    /* se declara este objeto porque se debe pasar un json como parametro al servicio estado */
    estados: Estado;

    constructor(private httpClient:HttpClient,
        private _route: ActivatedRoute,
        private _router: Router,
        public nivelService: NivelService,
        public estadoService: EstadoService
        // public flashMensaje: FlashMessageService
        // private toastr : ToastrService
        ,public toastService: ToastService,
        public modalService: NgbModal,

    ){
        this.titulo = 'Nivel educativo';
        // this.nivelService.nivelSeleccionado = new Nivel2(null,null,'',null,null,null,'');
        //inicializamos el modelo
        this.niveles2 = new Nivel2(0,0,'',0,0,0,'');
        this.estados = new Estado(0,0,'',0,'');
    }

    ngOnInit(){
        console.log('Se ha cargado el componente nivel.component.ts');
        this.limpiarForm();
        // this.listarNivel();
    }

    limpiarForm(form?: NgForm){
        if(form != null)
        form.reset();
        this.nivelService.nivelSeleccionado= {
            colegioId : 3,
            nivelId : null,
            nivelNombre : '',
            estado: null,
            opcionDML: null,
            opcionSelect: null,
            error: ''
        }
    }

    onSubmit(form: NgForm) {
        form.value.colegioId = 3;
        form.value.opcionSelect = 0; //parametro que indica que sp se va a ejecutar en la base de datos
        form.value.error = '';
        if (form.value.nivelId == null) {
            // alert('Guardamos');
            form.value.nivelId = 0;
            form.value.opcionDML = 1; //parametro que indica que metodo de la clase nivel se va a ejecutar en el servicio
        } else {
            // alert('Editamos');
            form.value.opcionDML = 3; //parametro que indica que metodo de la clase nivel se va a ejecutar en el servicio
        }

        this.nivelService.postNivel(form.value)
            .subscribe(data => {
                this.limpiarForm(form);
                this.listarNivel();
                // this.toastr.success('Nuevo registro guardado con éxito', 'Rgistro de Niveles Educativos');
            })
    }


    listarNivel(){
        this.nivelService.getNivelList(this.niveles2).subscribe(
            response => {
                //alert('buscar nivel')
                this.nivelService.nivelList = response.mNivelResult;
                console.log(this.nivelService.nivelList);
                // this._rou ter.navigate(["/buscar-nivel"]);
            },
            error => {
                console.log(<any>error);
                this.toastService.show_mensaje_error('Error... ' + <any>error);
            }
        );
    }

    showForEdit(niv : Nivel2){
        this.nivelService.nivelSeleccionado = Object.assign({}, niv);
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
                this.toastService.show_mensaje_error('Error... ' + <any>error);
            }
        );
    }

    bloqearDesbloquear(niv : Nivel2){        
        this.nivelService.seleccionadoParaBloquear = Object.assign({}, niv);        
        if(this.nivelService.seleccionadoParaBloquear.estado == 1){ // bloqueamos
            if (confirm(' Precaución!!. Esta acción deshabilitará el registro ¿Desea continuar?')) {   
                this.nivelService.seleccionadoParaBloquear.estado = 0;                   
                this.nivelService.seleccionadoParaBloquear.opcionDML = 3; //actualizamos
                this.nivelService.seleccionadoParaBloquear.colegioId = 3; 
                this.nivelService.seleccionadoParaBloquear.opcionSelect = 0;       
                this.nivelService.postNivel(this.nivelService.seleccionadoParaBloquear)                
                .subscribe(data => {})
                this.listarNivel();
            }
        }else if(this.nivelService.seleccionadoParaBloquear.estado == 0){ // desbloqueamos
            if (confirm(' Precaución!!. Esta acción habilitará el registro. ¿Desea continuar?')) {   //desbloqueamos 
                this.nivelService.seleccionadoParaBloquear.estado = 1;                   
                this.nivelService.seleccionadoParaBloquear.opcionDML = 3; //actualizamos
                this.nivelService.seleccionadoParaBloquear.colegioId = 3;  
                this.nivelService.seleccionadoParaBloquear.opcionSelect = 0;      
                this.nivelService.postNivel(this.nivelService.seleccionadoParaBloquear)                
                .subscribe(data => {})
                this.listarNivel();
            }
        }
        
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
