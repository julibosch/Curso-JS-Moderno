import * as UI from './interfaz.js';
import API from './api.js';

UI.formularioBuscar.addEventListener('submit', buscarCancion);

function buscarCancion(e) {
    e.preventDefault();

    /* Obtener los datos de los inputs */
    const artista = document.querySelector('#artista').value;
    const cancion = document.querySelector('#cancion').value;

    if(artista === '' || cancion === '') {
        mostrarError('Todos los campos son obligatorios');

        return;
    }

    /* Consultamos la API */
    const busqueda = new API(artista, cancion);
    busqueda.consultarAPI();
}

function mostrarError(mensaje) {
    UI.divMensajes.textContent = mensaje;
    UI.divMensajes.classList.add('error');

    setTimeout(() => {
        UI.divMensajes.textContent = '';
        UI.divMensajes.classList.remove('error');
    }, 3000);
}