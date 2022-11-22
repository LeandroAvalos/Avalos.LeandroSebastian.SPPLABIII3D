const URL = "http://localhost:3000/animales";

import {crearTabla,renderizarLista, agregarSpinner, eliminarSpinner} from "./app.js";
const divLista = document.getElementById("divLista");

export let anuncios = [];

export async function traerAnunciosAxiosAsync()
{    
    try 
    {
        agregarSpinner();
        const {data} = await axios(URL);
        anuncios = data;
        renderizarLista(crearTabla(data), divLista);        
    } 
    catch (err) 
    {
        console.error(err);
    }
    finally
    {
        eliminarSpinner();
    }
}

export async function crearAnuncioAxiosAsync(nuevoAnuncio)
{
    const options = {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        data : JSON.stringify(nuevoAnuncio),
    };
    try {
        agregarSpinner();
        const {data} = await axios(URL, options);
    } catch (err) {
        console.error(err);
    }
    finally{
        eliminarSpinner();
    }
};

export const modificarAnuncioFetch = (anuncio) => {
    agregarSpinner();
  
    fetch(URL + `/${anuncio.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(anuncio),
    })
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject(`Error: ${res.status} - ${res.statusText}`)
      )
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        eliminarSpinner();
      });
};

export const borrarAnuncioFetch = (id) => {
    agregarSpinner();
  
    fetch(URL + `/${id}`, {
      method: "DELETE",
    })
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject(`Error: ${res.status} - ${res.statusText}`)
      )
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        eliminarSpinner();
      });
};

