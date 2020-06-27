export class Banco{
    constructor(
        public colegioId        : number,
        public bancoId          : number,
        public bancoNombre      : string,
        public estadoId         : number,
        public opcionDML        : number,
        public opcionConsulta   : number       
    ){}
}