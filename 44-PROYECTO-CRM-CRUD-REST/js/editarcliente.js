import { obtenerRegistro } from "./API.js";
import { editarCliente } from "./funciones.js";

(function() {
    const formulario = document.querySelector('#formulario');

    document.addEventListener('DOMContentLoaded', async () => {
        const parametrosURL = new URLSearchParams(window.location.search);
        const idCliente = parseInt(parametrosURL.get('id'));

        const cliente = await obtenerRegistro(idCliente);

        console.log(cliente)

        const {nombre, email, telefono, empresa} = cliente;

        document.querySelector('#nombre').value = nombre;
        document.querySelector('#email').value = email;
        document.querySelector('#telefono').value = telefono;
        document.querySelector('#empresa').value = empresa;
    });

    formulario.addEventListener('submit', editarCliente);
})();