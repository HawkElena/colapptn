//toast.service.ts
import { Injectable, TemplateRef } from '@angular/core';
import{ GLOBAL} from '../services/global'
@Injectable({
      providedIn: 'root'
})

export class ToastService {
    toasts: any[]= [];
    // variables globales que utilizo para configurar los tipos de mensajes
    private classname_error       = 'bg-danger text-light';
    private classname_exito       = 'bg-success text-light';
    private classname_precaucion  = 'bg-warning text-light';
    private json_config_default  =   {
                            'classname':'bg-primary text-light'
                            ,'delay':5000
                            ,'autohide':true
                            ,'headertext':GLOBAL.strNameCompany
                            }

    private show(textOrTpl:string | TemplateRef<any>, options: any ={}){

        this.toasts.push({textOrTpl,TemplateRef,...options});
    }

    //Callback method to remove Toast DOM element from view
    private remove(toast){
        this.toasts= this.toasts.filter(t => t !==toast);
    }

    show_mensaje_error(textOrTpl:string|TemplateRef<any>, options:any={}){
      this.json_config_default.classname = this.classname_error
      this.json_config_default.autohide= false;
      this.json_config_default.delay=15000;
      this.show(textOrTpl,this.json_config_default);

    }
    show_mensaje_exito(textOrTpl:string|TemplateRef<any>, options:any={}){
      this.json_config_default.classname = this.classname_exito
      this.show(textOrTpl,this.json_config_default);

    }

    show_mensaje_precaucion(textOrTpl:string|TemplateRef<any>, options:any={}){
      this.json_config_default.classname = this.classname_precaucion;
      this.show(textOrTpl,this.json_config_default);
    }
}
