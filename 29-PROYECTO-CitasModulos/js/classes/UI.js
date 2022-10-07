import { eliminarCitas, cargarEdicion, validateArray } from '../funciones.js'

import { divMensajeNuevaCita, contenedorCitas, submitBtn} from '../selectores.js';

class UI {
    mostrarSugerencia(e, mensaje) {
        // Creo el HTML del mensaje
        const mensajeSugerencia = document.createElement('p');
        const inputDiv = e.target.parentElement;
        mensajeSugerencia.textContent = mensaje;
        mensajeSugerencia.classList.add('mensajeError');

        // Lo inserto en el HTML
        inputDiv.appendChild(mensajeSugerencia);

        // Luego de 3seg lo borro
        setTimeout(() => {
            mensajeSugerencia.remove();
        }, 3000);
    }

    habilitarSubmit() {
        const valido = validateArray.every(validate => validate === true);

        if (valido) {
            submitBtn.classList.remove('inactiva');
            submitBtn.classList.add('activa');
            submitBtn.disabled = false;
        } else {
            submitBtn.classList.add('inactiva');
            submitBtn.disabled = true;
        }
    }

    imprimirCitas(citas) {

        // Limpiar el HTML
        while(contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild)
        }

        citas.citas.forEach( cita => {

            const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;
            
            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            // Scripting elementos de las citas
            const mascotaParrafo = document.createElement('h3');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = `Mascota: ${mascota}`;

            const propietaroParrafo = document.createElement('p');
            propietaroParrafo.innerHTML = `<span class="font-weigth-bolder"> Dueño:</span> ${propietario} <span class="font-weigth-bolder"> Tel:</span> ${telefono}`;


            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `<span class="font-weigth-bolder"> Fecha:</span> ${fecha} - ${hora}`


            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `<span class="font-weigth-bolder"> Sintomas:</span> ${sintomas}`;

            // Boton para eliminar
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger')
            btnEliminar.innerHTML = `Eliminar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
            `

            // Boton para editar
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-info');
            btnEditar.innerHTML = `Editar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
            `

            // Agregamos los parrafos al div
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietaroParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);

            // Agregamos el div al HTML
            contenedorCitas.appendChild(divCita);

            // Eliminar la cita
            btnEliminar.onclick = () => eliminarCitas(id);

            // Editar una cita
            btnEditar.onclick = () => cargarEdicion(cita);
        })
    }

    imprimirMensaje(mensaje, estado) {
        const alertaNuevaCita = document.createElement('p');
        alertaNuevaCita.textContent = mensaje;
        if(estado == 'error') {
            alertaNuevaCita.classList.add('alert', 'alert-danger');
        } else {
            alertaNuevaCita.classList.add('alert', 'alert-success');
        }

        divMensajeNuevaCita.appendChild(alertaNuevaCita);

        setTimeout(() => {
            alertaNuevaCita.remove();
        }, 2000);
    }
}

export default UI;