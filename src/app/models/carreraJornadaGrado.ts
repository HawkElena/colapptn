export class CarreraJornadaGrado{
    constructor(
        public colegioId    : number,
        public carJorGraId  : number,
        public carJorId     : number,
        public gradoId      : number,
        public nivelId      : number, //para filtrar por nivel        
        public estadoId     : number,
        public estadoNombre : string,
        public opcionDML    : number,
        public errorId      : number,
        public errorNombre  : string,
        //para el select
        public carreraNombre: string,
        public jornadaNombre: string,
        public gradoNombre  : string,
        public opcionConsulta: number,
        public nivelPrerrequisitoId  : number, //????
        public cjgIdPrerrequisito    : number,
        public carJorIdPrerrequisito : number,
       
    ){}
}
