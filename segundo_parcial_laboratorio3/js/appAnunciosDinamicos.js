import {crearCartaParaAnuncio} from "./crearAnunciosDinamicos.js";

const divContenedorAnuncios = document.getElementById("container");

const URL = "http://localhost:3000/animales";

const getAnunciosAjax = () => {

    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState == 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                const data = JSON.parse(xhr.responseText);
                data.forEach(elemento => {
                    divContenedorAnuncios.appendChild(crearCartaParaAnuncio(elemento));
                });
                eliminarSpinner();
            }
            else {
                console.error(`Error ${xhr.status} : ${xhr.statusText}`);
            }
        }
        else {
            agregarSpinner();
        }
    });
    xhr.open("GET", URL);
    xhr.send();
};

getAnunciosAjax();

function agregarSpinner(){
    let spinner = document.createElement("img");
    spinner.setAttribute("src","../images/animal.gif");
    spinner.setAttribute("alt","Imagen spinner");
    document.getElementById("spinner-container").appendChild(spinner);
}

function eliminarSpinner(){
    document.getElementById("spinner-container").innerHTML="";
}
