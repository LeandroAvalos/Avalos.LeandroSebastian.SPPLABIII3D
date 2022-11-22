import {Anuncio} from "./anuncio.js";

export class AnuncioMascota extends Anuncio {

    constructor(id,titulo,descripcion,animal,precio,raza,fecha,vacuna) {
        super(id,titulo,descripcion,animal,precio);
        this.raza = raza ;
        this.fecha = fecha ;
        this.vacuna = vacuna;
    }
}