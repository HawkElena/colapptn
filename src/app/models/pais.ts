export class Pais{
    constructor(
        public paisId: number,
        public paisNombre : string,
        public estadoId : number,
        public opcionDML : number,
        public opcionSelect : number,
        public pagina : number,
        public registrosPorPagina : number
    ){}
}