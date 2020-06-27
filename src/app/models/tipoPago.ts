export class TipoPago{
    constructor(
        public colegioId        : number,
        public tipoPagoId       : number,
        public tipoPagoNombre   : string,
        public estadoId         : number,
        public opcionDML        : number,
        public opcionSelect     : number,               
    ){}
}