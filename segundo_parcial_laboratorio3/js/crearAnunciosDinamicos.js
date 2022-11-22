export function crearCartaParaAnuncio(elemento)
{
    const article = document.createElement("article");
    article.classList.add("tarjeta");
    
    const titulo = document.createElement("h3");
    titulo.classList.add("tarjeta-item");
    titulo.classList.add("tarjeta-titulo");
    titulo.textContent = elemento.titulo;
    article.appendChild(titulo);
    
    const descripcion = document.createElement("p");
    descripcion.classList.add("tarjeta-item");
    descripcion.classList.add("tarjeta-descripcion");
    descripcion.textContent = elemento.descripcion;
    article.appendChild(descripcion);
    
    const animal = document.createElement("p");
    animal.classList.add("tarjeta-item");
    animal.classList.add("tarjeta-transaccion");
    animal.textContent = elemento.transaccion;
    article.appendChild(animal);

    const precio = document.createElement("p");
    precio.classList.add("tarjeta-item");
    precio.classList.add("tarjeta-precio");
    precio.textContent = elemento.precio;
    article.appendChild(precio);
    
    const contenedorDeImagenes = document.createElement("div");
    contenedorDeImagenes.classList.add("icono-contenedor");
    
    const iconoRaza = document.createElement("img");
    iconoRaza.setAttribute("src", "../images/perro.png");
    iconoRaza.classList.add("iconos");
    const raza = document.createElement("p");
    raza.textContent = elemento.raza;
    contenedorDeImagenes.appendChild(iconoRaza);
    contenedorDeImagenes.appendChild(raza);
    
    const iconoFecha = document.createElement("img");
    iconoFecha.setAttribute("src", "../images/ciguena.png");
    iconoFecha.classList.add("iconos");
    const fecha = document.createElement("p");
    fecha.textContent =elemento.fecha;
    contenedorDeImagenes.appendChild(iconoFecha);
    contenedorDeImagenes.appendChild(fecha);
    
    const iconoVacuna = document.createElement("img");
    iconoVacuna.setAttribute("src", "../images/jeringuilla.png");
    iconoVacuna.classList.add("iconos");
    const vacuna = document.createElement("p");
    vacuna.textContent = elemento.vacuna;
    contenedorDeImagenes.appendChild(iconoVacuna);
    contenedorDeImagenes.appendChild(vacuna);
    
    article.appendChild(contenedorDeImagenes);

    const boton = document.createElement("button");
    boton.classList.add("tarjeta-item");
    boton.classList.add("ver-mascota-btn");
    boton.textContent = "Ver Mascota";
    
    article.appendChild(boton);

    return article;
}
