export class Pago{
    constructor(
        public colegioId        : number,
        public pagoId          : number,
        public monto            : number,
        public descuento        : number,
        public mora             : number,  
        public total            : number,  //Total con descuentos y moras
        public fechaIngreso     : string,
        public mesId            : number, //lkl
        public usuarioId        : number,
        public fechaModificacion: string,
        public alumnoId         : number,
        public tipoPagoId       : number,
        public estadoId         : number,
        public clienteId        : number,
        public noFactura        : string,//despues
        public noBoleta         : string,
        public fechaDeposito    : string,
        public impuesto         : number, //despues
        public formaPagoId      : number,
        public bancoId          : number,
        public ciclo            : number,
        
        public carreraNombre    : string,
        public jornadaNombre    : string,        
        public tipoPagoNombre   : string,       
        public diaLimite        : number,       
        public montoConDescuento:number,      
        public estadoNombre     : string,
        public opcionDML        : number,
        public opcionConsulta   : number,
        public mensajeId        : number,
        public mensajeNombre    : string,       
        public formaPagoNombre  : string,
        public bancoNombre      : string,        
        public clienteNombre    : string,
        public mesNombre        : string,//jdkf
    ){}
}