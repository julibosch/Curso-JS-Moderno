let visible = false;
const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

document.addEventListener('DOMContentLoaded', () => {
    
    formulario.addEventListener('submit', validarCampo);
})


function validarCampo(e) {
    e.preventDefault();

    const termino = document.querySelector('#termino').value;

    if(termino === '') {
        mostrarMensaje('El campo es obligatorio...');

        return;
    }

    /* Consultar a la API */
    consultarAPI(termino);
}

function mostrarMensaje(mensaje) {
    if(!visible) {
        const buscadorDiv = document.querySelector('.buscador');
        
        const mensajeHTML = document.createElement('p');
        mensajeHTML.textContent = mensaje;
        mensajeHTML.classList.add('font-bold', 'error', 'w-full', 'mx-5', 'my-4', 'bg-red-300', 'border', 'text-red-700', 'border-red-600', 'text-center', 'mx-auto', 'rounded');
        
        buscadorDiv.appendChild(mensajeHTML);
        visible = true;
        
        setTimeout(() => {
            mensajeHTML.remove();
            visible = false;
        }, 3000);
    }
}

function consultarAPI(termino) {
    const keyAPI = '30137227-f6a3425a1c8e9c38b2c04fd71';
    const urlAPI = `https://pixabay.com/api/?key=${keyAPI}&lang=es&q=${termino}&image_type=photo`;

    fetch(urlAPI)
        .then(response => response.json())
        .then(datos => mostrarFotos(datos.hits))
}

function mostrarFotos(datosFotos) {
    limpiarHTML();

    console.log(datosFotos)

    datosFotos.forEach(foto => {
        const urlFoto = foto.largeImageURL;

        const fotoHTML = document.createElement('img');
        fotoHTML.setAttribute('src', urlFoto);
        fotoHTML.classList.add('foto');

        resultado.appendChild(fotoHTML);
    })
}

function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}