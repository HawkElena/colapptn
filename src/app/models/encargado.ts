export class Encargado{
    constructor(
        public encargadoId: number,
        public colegioId: number,
        public alumnoId: number,
        public encargadoNombre1: string,
        public encargadoNombre2: string,
        public encargadoApellido1: string,
        public encargadoApellido2: string,
        public telefono1: string,
        public telefono2: string,
        public email:  string,
        public direccion: string,
        public fechaIngreso: string,
        public fechaModificacion: string,
        public generoId: number,
        public esEncargado: number,
        public municipioId: number,
        public municipioNombre: string,
        public departamentoId: number,
        public departamentoNombre: string,
        public paisId : number,
        public paisNombre: string,
        public estadoId: number,
        public estadoNombre: string,
        public errorId : number,
        public errorNombre: string,
        public opcionDML: number,
        public opcionSelect: number,
        public identityEncargado: number
        ,public opcionInsert:number
    ){}
}
