export class Grado{
    constructor(
        public colegioId    : number,
        public gradoId       :number,        
        public nivelId      : number, //para filtrar por nivel
        public gradoNombre: string,
        public estadoId       : number,
        public estadoNombre : string,
        public opcionDML    : number,
        public errorId      : number,
        public errorNombre  : string              
    ){}
}