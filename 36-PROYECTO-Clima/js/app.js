const formulario = document.querySelector('#formulario');
const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const spinner = document.querySelector('.sk-chase');

let visible = false;

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
});


/****  FUNCIONES ****/
function mostrarError(mensaje) {
    if (!visible) {
        /* Crear una alerta */
        const mensajeError = document.createElement('div');

        mensajeError.classList.add('bg-red-100', 'border-red-600', 'text-red-700', 'rounded', 'px-4', 'py-3', 'mx-auto', 'max-w-md', 'mt-6', 'text-center');

        mensajeError.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block">${mensaje}</span>
        `;

        container.appendChild(mensajeError);
        visible = true;

        setTimeout(() => {
            mensajeError.remove();
            visible = false;
        }, 2500);
    };
}

/* Buscar clima */
function buscarClima(e) {
    e.preventDefault();

    /* Validar formulario */
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    if (ciudad === '' || pais === '') {
        mostrarError('Todos los campos son obligatorios...');
    }
    
    /* Consultar la API */
    consultarAPI(ciudad, pais);
}


function consultarAPI(ciudad, pais) {
    
    spinnerAnimation();

    /* ID de nuestra API de clima */
    const idAPI = 'a07e5a6be56e9ec5d3aafdfebda6958f';

    /* URL estructurada como nos pide la API */
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${idAPI}`;

    /* Hacemos el fetch */
    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            if (datos.cod === '404') {
                mostrarError('La ciudad ingresada no existe, ingrese otra.');
            } else {
                mostrarClima(datos, ciudad, pais);
            }
        })
}

function mostrarClima(datos, ciudad, pais) {

    console.log(datos);
    const { main: {temp, temp_min, temp_max} } = datos;

    const temperaturaActual = convertirTemperatura(temp);
    const temperaturaMinima = convertirTemperatura(temp_min);
    const temperaturaMaxima = convertirTemperatura(temp_max);

    setTimeout(() => {
        resultado.classList.add('bg-blue-200', 'border-blue-600', 'text-blue-700', 'rounded', 'px-4', 'py-3', 'mx-auto', 'max-w-md', 'mt-6', 'text-center', 'text-2xl');
        resultado.innerHTML = `
        <div>
            <p class="text-4xl"><strong class="font-bold">${ciudad}</strong> - <strong class="font-bold">${pais}</strong></p>
            <p class="text-5xl font-bold">${temperaturaActual}</p>
            <p>Minima: ${temperaturaMinima}</p>
            <p>Maxima: ${temperaturaMaxima}</p>
        </div>
    `;
    }, 1000);
}

function convertirTemperatura(temperatura) {
    temperatura = temperatura - 273.15;
    return `${temperatura.toFixed(1)}&#8451`;
}

function spinnerAnimation() {
    const texto = document.querySelector('#resultado p');

    texto.style.display = 'none';
    spinner.style.display = 'block';

    setTimeout(() => {
        spinner.style.display = 'none';
    }, 1500);
}