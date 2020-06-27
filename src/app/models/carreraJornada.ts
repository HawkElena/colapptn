export class CarreraJornada{
    constructor(
        public colegioId    : number,
        public nivelId      : number, //para filtrar por nivel
        public carJorId     : number,
        public carreraId    : number,
        public jornadaId    : number,
        public carreraNombre: string,
        public jornadaNombre: string,
        public estado       : number,
        public estadoNombre : string,
        public opcionDML    : number,
        public error        : string             
    ){}
}
