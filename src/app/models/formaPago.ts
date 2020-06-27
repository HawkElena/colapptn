export class FormaPago{
    constructor(
        public colegioId        : number,
        public formaPagoId      : number,
        public formaPagoNombre  : string,
        public opcionDML        : number,
        public opcionConsulta   : number       
    ){}
}