import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AreaCnbService } from '../services/areacnb.service';
import { AreaCnb } from '../models/areaCnb';
import { NgForm } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
//combos
// import { EstadoService } from '../services/estado.service';
// import { Estado } from '../models/estado';


@Component({
    selector: 'area-cnb',
    templateUrl: '../views/area-cnb.html',
    providers: [AreaCnbService],
    styleUrls: ['../style_hawk/general.style.css']
})

export class AreaCnbComponent implements OnInit{
    public titulo: string;  
    public msg : string;    
    public areas: AreaCnb;  
    closeResult: string;
    
    /* Area de Combos */
    // estadoSeleccionado: number;
    /* se declara este objeto porque se debe pasar un json como parametro al servicio */
    // estados: Estado;
  
        
    constructor(private httpClient:HttpClient,
        private _route: ActivatedRoute,
        private _router: Router,
        public areaCnbService: AreaCnbService,
        private modalService: NgbModal
        // public estadoService: EstadoService,  
        // public flashMensaje: FlashMessageService
        // private toastr : ToastrService       
    ){
        this.titulo = 'Areas del Curriculum Nacional Base';     
        // this.nivelService.nivelSeleccionado = new Nivel2(null,null,'',null,null,null,'');
        //inicializamos el modelo       
        this.areas = new AreaCnb(0,0,'',0,0,0,'');
        // this.estados = new Estado(0,0,'',0,'');      
        
    }    
  
    ngOnInit(){
        console.log('Se ha cargado el componente areaCnb.component.ts');
        this.limpiarForm();        
        // this.listarEstado();       
    }
       
    limpiarForm(form?: NgForm){
        if(form != null)
        form.reset();
        this.areaCnbService.areaCnbSeleccionado= {
            colegioId : 3,
            areaCnbId : 0,            
            areaCnbNombre : '',
            estadoId: 1,            
            opcionDML: 0,
            opcionSelect: 0,
            error: ''
        }       
    }


    guardar(form: NgForm){
        if(this.areaCnbService.areaCnbSeleccionado.areaCnbId == null)
        {
            this.areaCnbService.areaCnbSeleccionado.areaCnbId = 0
        }            
        if (this.areaCnbService.areaCnbSeleccionado.areaCnbId == 0) {    
            
            this.areaCnbService.areaCnbSeleccionado.opcionDML = 1; //guardamos
            this.areaCnbService.areaCnbSeleccionado.estadoId = 1;            
            this.areaCnbService.postAreaCnb(this.areaCnbService.areaCnbSeleccionado)
            .subscribe(data => {    
                this.areaCnbService.areaCnbList = data.mArea_CnbResult;           
                this.areaCnbService.areaCnbList.forEach(element => {                       
                        this.msg = element.error;                   
                    })                    
                alert(this.msg);
                this.limpiarForm(form);
                // this.listarAreaCnb();        
                // this.toastr.success('Nuevo registro guardado con éxito', 'Rgistro de Niveles Educativos');
            })

        } else {  
            if (confirm('Se van a guardar los cambios realizados, ¿Desea continuar?')) {                      
                this.areaCnbService.areaCnbSeleccionado.opcionDML = 3; //actualizamos
                this.areaCnbService.areaCnbSeleccionado.colegioId = 3;        
                this.areaCnbService.postAreaCnb(this.areaCnbService.areaCnbSeleccionado)
                .subscribe(data => {    
                    this.areaCnbService.areaCnbList = data.mArea_CnbResult;           
                    this.areaCnbService.areaCnbList.forEach(element => {                       
                            this.msg = element.error;                   
                        })                    
                    alert(this.msg);
                    this.limpiarForm(form);
                    // this.listarAreaCnb();        
                    // this.toastr.success('Nuevo registro guardado con éxito', 'Rgistro de Niveles Educativos');
                })
            }
        }        
        
    }

    onSubmit(form: NgForm) {
        form.value.colegioId = 3;
        form.value.opcionSelect = 0; //parametro que indica que sp se va a ejecutar en la base de datos
        form.value.error = '';        
        if(form.value.id == null){form.value.id = 0}        
        if (form.value.id == 0) {    
            form.value.estado 
            form.value.opcionDML = 1; //guardamos

        } else {                        
            form.value.opcionDML = 3; //actualizamos
        }
        this.areaCnbService.postAreaCnb(form.value)
            .subscribe(data => {    
                this.areaCnbService.areaCnbList = data.mArea_CnbResult;           
                this.areaCnbService.areaCnbList.forEach(element => {
                        // console.log(element.error);
                        this.msg = element.error;                   
                    })                    
                alert(this.msg);
                this.limpiarForm(form);
                this.listarAreaCnb();        
                // this.toastr.success('Nuevo registro guardado con éxito', 'Rgistro de Niveles Educativos');
            })
    }


    listarAreaCnb(){      
        // alert('listar carreras') 
        this.areas.colegioId = 3;
        this.areas.opcionDML = 4;
        this.areas.opcionSelect = 2;
        console.log('Json enviado: ', this.areas)    
        this.areaCnbService.getAreaCnbList(this.areas).subscribe(
            response => {
                this.areaCnbService.areaCnbList = response.mArea_CnbResult;  
                console.log(this.areaCnbService.areaCnbList);              
                // this._router.navigate(["/buscar-nivel"]);                   
            },
            error => {
                console.log(<any>error);
                alert('Error... ' + <any>error);
            }
        );
    }
  
    
    showForEdit(ar : AreaCnb){
         this.areaCnbService.areaCnbSeleccionado = Object.assign({}, ar);     
        //  console.log('showForEdit ',this.areaCnbService.areaCnbSeleccionado);     
    }

    bloqearDesbloquear(ar : AreaCnb){
        this.areaCnbService.seleccionadoParaBloquear = Object.assign({}, ar); 
        if(this.areaCnbService.seleccionadoParaBloquear.estadoId == 1){ // bloqueamos
            if (confirm(' Precaución!!. Esta acción deshabilitará el registro. ¿Desea continuar?')) {   
                this.areaCnbService.seleccionadoParaBloquear.estadoId = 0;                   
                this.areaCnbService.seleccionadoParaBloquear.opcionDML = 3; //actualizamos
                this.areaCnbService.seleccionadoParaBloquear.colegioId = 3;        
                this.areaCnbService.postAreaCnb(this.areaCnbService.seleccionadoParaBloquear)                
                .subscribe(data => {   
                
                })
                this.listarAreaCnb();
            }
        }else if(this.areaCnbService.seleccionadoParaBloquear.estadoId == 0){
            if (confirm(' Precaución!!. Esta acción habilitará el registro. ¿Desea continuar?')) {   //desbloqueamos 
                this.areaCnbService.seleccionadoParaBloquear.estadoId = 1;                   
                this.areaCnbService.seleccionadoParaBloquear.opcionDML = 3; //actualizamos
                this.areaCnbService.seleccionadoParaBloquear.colegioId = 3;        
                this.areaCnbService.postAreaCnb(this.areaCnbService.seleccionadoParaBloquear)                
                .subscribe(data => {    
                   
                })
                this.listarAreaCnb();
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

    /* ---------------------------------------AREA DE COMBOS------------------------------------------------ */
    // funcion para llenar el combo de estados en este formulario (se quietara al comunicar componentes)
    // listarEstado(){           
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

}