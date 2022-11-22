import {validarCampoVacio, validarNumeroEntero, validarSubmit, validarNumerosYLetras} from "./validaciones.js";
import {AnuncioMascota} from "./AnuncioMascota.js";
import {borrarAnuncioFetch,modificarAnuncioFetch,anuncios,traerAnunciosAxiosAsync, crearAnuncioAxiosAsync} from "./controladoresDeDatos.js";

const formulario = document.forms[0];
const controles = formulario.elements;
const divLista = document.getElementById("divLista");
const checkbox = document.querySelectorAll('.cbox');


const filtro = document.getElementById("filtro");
const promedio = document.getElementById("promedio");

window.addEventListener("DOMContentLoaded", ()=>
{   
    document.addEventListener("click", manejadorDelClick);

    traerAnunciosAxiosAsync();
    checkbox.forEach((element) => element.addEventListener("click", eventoClick));
});

formulario.addEventListener("submit", (e) => {   
    e.preventDefault();
    if(validarSubmit(controles))
    {
        manejadorDelSubmit(e);
    }
});

export function renderizarLista(arrayDeAnuncios, contenedor)
{
    while(contenedor.hasChildNodes())
    {
        contenedor.removeChild(contenedor.firstChild);
    }

    if(arrayDeAnuncios)
    {
        contenedor.appendChild(arrayDeAnuncios);
    }
}

export function crearTabla(arrayDeAnuncios)
{
    const tabla = document.createElement("table");

    tabla.appendChild(crearThead(arrayDeAnuncios[0]));

    tabla.appendChild(crearTbody(arrayDeAnuncios));

    return tabla;
}

function crearThead(anuncio)
{
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");

    for (const key in anuncio) 
    {
        if(key !== "id")
        {
            const th = document.createElement("th");
            th.textContent = key;
            tr.appendChild(th);
        }    
        thead.appendChild(tr);
    }
    return thead;
}

function crearTbody(arrayDeAnuncios)
{
    const tbody = document.createElement("tbody");

    arrayDeAnuncios.forEach(anuncio => {
        const tr = document.createElement("tr");

        for (const key in anuncio) 
        {
            if(key == "id")
            {
                tr.setAttribute("data-id", anuncio[key]);
            }
            else
            {
                const td = document.createElement("td");
                td.textContent = anuncio[key];
                tr.appendChild(td);
            }
        }
        tbody.appendChild(tr);
    });
    return tbody;
}

function manejadorDelClick(e)
{
    if(e.target.matches("td"))
    {
        let id = e.target.parentNode.dataset.id;
        console.log("El ID seleccionado es: " + id);
        cargarFormulario(id);
    }
    else if(e.target.matches("#btnEliminar"))
    {
        let id = formulario.id.value;

        if(confirm("Confirma la eliminacion?"))
        {   
            borrarAnuncioFetch(id);
        }

        limpiarFormulario(formulario);
    }
    else if(e.target.matches("#btnLimpiar"))
    {
        limpiarFormulario(formulario);
    }
}

function manejadorDelSubmit(e)
{
    const form = e.target;
    const btnSubmit = document.getElementById("btnSubmit").value;

    if(btnSubmit == "Guardar")
    {
        console.log("Dando de alta");

        const nuevoAnuncio = new AnuncioMascota(Date.now(),
                                             form.titulo.value,
                                             form.descripcion.value,
                                             form.animal.value,
                                             form.precio.value,
                                             form.raza.value,
                                             form.fecha.value,
                                             form.vacuna.value);
        crearAnuncioAxiosAsync(nuevoAnuncio);
    }
    else if(btnSubmit == "Modificar")
    {
        const anuncioEditado = new AnuncioMascota(parseInt(form.id.value),
                                                        form.titulo.value,
                                                        form.descripcion.value,
                                                        form.animal.value,
                                                        form.precio.value,
                                                        form.raza.value,
                                                        form.fecha.value,
                                                        form.vacuna.value);

        if(confirm("Confirma la modificacion del anuncio?"))
        {
            modificarAnuncioFetch(anuncioEditado);
        }
    }
    limpiarFormulario(form);
}

function limpiarFormulario(form)
{
    form.reset();
    document.getElementById("btnEliminar").classList.add("invisible");
    document.getElementById("btnLimpiar").classList.add("invisible");
    document.getElementById("btnSubmit").value = "Guardar";
}

function cargarFormulario(id)
{
    let anuncio = null;

    anuncio = anuncios.filter(e => e.id == id)[0];

    formulario.id.value = anuncio.id;
    formulario.titulo.value = anuncio.titulo;
    formulario.descripcion.value = anuncio.descripcion;
    formulario.animal.value = anuncio.animal;
    formulario.precio.value = anuncio.precio;
    formulario.raza.value = anuncio.raza;
    formulario.fecha.value = anuncio.fecha;
    formulario.vacuna.value = anuncio.vacuna;

    document.getElementById("btnSubmit").value = "Modificar";
    document.getElementById("btnEliminar").classList.remove("invisible");
    document.getElementById("btnLimpiar").classList.remove("invisible");
}

export function agregarSpinner(){
    let spinner = document.createElement("img");
    spinner.setAttribute("src","../images/animal.gif");
    spinner.setAttribute("alt","Imagen spinner");
    document.getElementById("spinner-container").appendChild(spinner);
}


export function eliminarSpinner(){
    document.getElementById("spinner-container").innerHTML="";
}

filtro.addEventListener("change", (e) =>{
    e.preventDefault();

    let valorPromediado = promedioAnimales(anuncios);
    
    promedio.value = valorPromediado;
});

function promedioAnimales(lista)
{
    let sumaDeLosPrecios;
    let promedioPrecios;
    let listaFiltrada = [];
    if(filtro.value != "Todos")
    {
        listaFiltrada = lista.filter((mascota)=>{
            return mascota.animal == filtro.value;
        });
        
        sumaDeLosPrecios = listaFiltrada.reduce((prev, actual)=>{
            return prev + parseInt(actual.precio);
        }, 0);
        
        promedioPrecios = sumaDeLosPrecios / listaFiltrada.length;
        renderizarLista(crearTabla(listaFiltrada), divLista);
    }
    else
    {
        promedioPrecios = "N/A";
        renderizarLista(crearTabla(lista), divLista);
    }
    return promedioPrecios
}

const eventoClick = () => {
    const checkeado = {};
    checkbox.forEach((elemento) => {
        checkeado[elemento.name] = elemento.checked;
    });

    const listaMapeada = anuncios.map((elemento) => {
        const fila = {};
        for (const key in elemento) 
        {
            if (checkeado[key] || key == "id") 
            {
                fila[key] = elemento[key];
            }
        }
        
        return fila;
    });
    
    renderizarLista(crearTabla(listaMapeada), divLista);
};

for(let i = 0; i < controles.length; i++)
{
    const control = controles.item(i);
    if(control.matches("input"))
    {
        if(control.matches("[type=text]") || control.matches("[type=number]"))
        {
            control.addEventListener("blur", validarCampoVacio);

            if(control.matches("[type=number]"))
            {
                control.addEventListener("blur", validarNumeroEntero);
            }

            if(control.matches("[type=text]"))
            {
                control.addEventListener("blur", validarNumerosYLetras);
            }
            
        }
    }
}