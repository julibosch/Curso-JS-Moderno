import {mostrarMensaje, validar} from '../js/funciones.js';
import {nuevoCliente} from '../js/API.js';

(function() {
    const formulario = document.querySelector('#formulario');
    formulario.addEventListener('submit', validarCliente);

    function validarCliente(e) {
        e.preventDefault();

        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        const objetoCliente = {nombre, email, telefono, empresa};

        if(validar(objetoCliente)) {
            mostrarMensaje('Todos los campos son obligatorios', 'error');
        } else {
            const cliente = {nombre, email, telefono, empresa};

            nuevoCliente(cliente);
        }
    }
})();

