import { confirmarEditar } from "./API.js";

export function mostrarMensaje(mensaje, tipo) {
    const alerta = document.querySelector('.bg-red-200');

    if (!alerta) {
        const mensajeHTML = document.createElement('p');
        mensajeHTML.textContent = mensaje;

        if (tipo === 'error') {
            mensajeHTML.classList.add('border', 'border-red-400', 'bg-red-200', 'text-red-700', 'block', 'mt-4', 'px-4', 'py-2', 'text-center')
        } else {
            mensajeHTML.classList.add('border', 'border-green-400', 'bg-green-200', 'text-green-700', 'block', 'mt-4', 'px-4', 'py-2', 'text-center')
        }

        formulario.appendChild(mensajeHTML);

        setTimeout(() => {
            mensajeHTML.remove();
        }, 2500);
    }
}

export function editarCliente(e) {
    e.preventDefault();
    const parametrosURL = new URLSearchParams(window.location.search);
    const idCliente = parseInt(parametrosURL.get('id'));

    const nombre = document.querySelector('#nombre').value;
    const email =document.querySelector('#email').value;
    const telefono =document.querySelector('#telefono').value;
    const empresa =document.querySelector('#empresa').value;

    const clienteEditado = {nombre, email, telefono, empresa, idCliente};

    if(validar(clienteEditado)) {
        mostrarMensaje('Todos los campos son obligatorios', 'error');
    } else {
        confirmarEditar(clienteEditado);
    }

}

export function validar(obj) {
    return !Object.values(obj).every( input => input !== '');
}

