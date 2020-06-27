export class Cliente{
    constructor(
        public colegioId        : number,
        public clienteId        : number,
        public clienteNombre    : string,
        public nit              : string,
        public direccion        : string,
        public opcionDML        : number,
        public opcionConsulta   : number,
        public estadoId         : number,
        public mensajeId        : number,
        public mensajeNombre    : string
    ){}
}