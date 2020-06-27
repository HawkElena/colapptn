export class Alumno{
    constructor(
        public alumnoId: number,
        public colegioId: number,
        public alumnoNombre1: string,
        public alumnoNombre2: string,
        public alumnoNombre3: string,
        public alumnoApellido1: string,
        public alumnoApellido2: string,
        public alumnoApellido3: string,
        public alumnoCarnet: number,
        public codigoMineduc: string,
        public identificacion: string, //cui-dpi
        // pasaporte: string,
        // paisPasaporteId: number,
        public fechaNacimiento: string,
        public email:  string,
        public direccion: string,
        public telefono1: string,
        public telefono2: string,
        public foto: string,
        public fechaIngreso: string,
        public fechaModificacion: string,
        public genero: number,
        public municipioId: number,
        public departamentoId: number,
        public paisId : number,
        //nacionalidad en la bd es tipo string
        public nacionalidad: number,
        public estadoId: number,
        public estadoNombre: string,
        public representanteId: number,
        public errorId : number,
        public errorNombre: string,
        public opcionDML: number,
        public identity: number,
        public opcionConsulta,
        public descuento

    ){}
}