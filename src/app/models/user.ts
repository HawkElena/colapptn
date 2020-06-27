export class User{
    constructor(
        public colegioId        : number,
        public usuarioId        : number,
        public usuario          : string,
        public password         : string,
        public email            : string,
        public primerNombre     : string,
        public apellido         : string,
        public descripcionPath  : string, 
        public routePath        : string,
        public estado           : number,
        public opcionDML        : number        
    ){}
}