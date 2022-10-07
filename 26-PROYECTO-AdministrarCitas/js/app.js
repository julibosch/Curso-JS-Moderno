// ***** Variables *****
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');
const submitBtn = document.querySelector('#submit');
const divMensajeNuevaCita = document.querySelector('.alertas');

let editando;

// Formulario
const formulario = document.querySelector('#nueva-cita');

// Contenedor de citas
const contenedorCitas = document.querySelector('#citas');

// Logica de validaciones de inputs
let validateArray = [false, false, false, false, false, false];

// ***** Listeners *****
eventListeners();
function eventListeners() {
    // Eventos de inputs
    mascotaInput.addEventListener('blur', datosCitaText);
    propietarioInput.addEventListener('blur', datosCitaText);
    telefonoInput.addEventListener('blur', datosCitaPhone);
    fechaInput.addEventListener('blur', datosCitaDate);
    horaInput.addEventListener('blur', datosCitaHour);
    sintomasInput.addEventListener('blur', datosCitaSintoma);

    // Evento cuando carga el document
    document.addEventListener('DOMContentLoaded', () => {
        ui.habilitarSubmit();
    })

    // Evento de submit
    formulario.addEventListener('submit', crearNuevaCita);
}

// ***** Clases *****
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

class Citas {
    constructor() {
        this.citas = [];
    }

    agregarCita(cita) {
        this.citas.push(cita);
    }

    eliminarCita(id) {
        this.citas = this.citas.filter( cita => cita.id != id );
    }

    editarCita(citaActual) {
        this.citas.forEach( cita => {
            if(cita.id === citaActual.id) {
                cita.mascota = citaActual.mascota;
                cita.propietario = citaActual.propietario;
                cita.telefono = citaActual.telefono;
                cita.fecha = citaActual.fecha;
                cita.hora = citaActual.hora;
                cita.sintomas = citaActual.sintomas;
                console.log(cita);
                console.log(this.citas);
            }
        })
    }
}

// ***** Instancias *****
const ui = new UI();
const citas = new Citas();

// Objeto cita actual
const citaActual = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: '',
    id: ''
};


// ***** Funciones *****

// Carga los datos y modo de edicion
function cargarEdicion(cita) {

    // Activar modo edicion
    editando = true;
    
    validateArray = [true, true, true, true, true, true];
    ui.habilitarSubmit();
    
    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;
    
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;
    citaActual.id = id;

    console.log(citaActual)

    // Cambiar el texto
    document.querySelector('#submit').textContent = 'Guardar cambios';
}

// Eliminar citas
function eliminarCitas(id) {
    // Eliminar la cita
    citas.eliminarCita(id);

    // Mostrar mensaje
    ui.imprimirMensaje('La cita se elimino correctamente', 'error');

    // Actualizar listado de citas
    ui.imprimirCitas(citas);
}

function crearNuevaCita(e) {
    e.preventDefault();

    // Se crea un objeto con los datos obtenidos de la cita
    citaActual.mascota = mascotaInput.value;
    citaActual.propietario = propietarioInput.value;
    citaActual.telefono = telefonoInput.value;
    citaActual.fecha = fechaInput.value;
    citaActual.hora = horaInput.value;
    citaActual.sintomas = sintomasInput.value;

    if(editando) {
        // Imprime mensaje de exito
        ui.imprimirMensaje('La cita se edito exitosamente', 'success');

        // Metodo de editar el objeto
        citas.editarCita({...citaActual});

        // Cambiar el texto
        document.querySelector('#submit').textContent = 'Crear cita';

        editando = false;
    } else {
        // Creamos el id
        citaActual.id = Date.now();
        
        // Se crea una nueva cita con el objeto rellenado con los datos del form
        citas.agregarCita({...citaActual});
        
        // Imprime mensaje de exito
        ui.imprimirMensaje('La cita se agrego con exito', 'success');
    }
    
    
    // Reiniciamos el formulario
    formulario.reset();
    mascotaInput.classList.remove('success');
    propietarioInput.classList.remove('success');
    telefonoInput.classList.remove('success');
    fechaInput.classList.remove('success');
    horaInput.classList.remove('success');
    sintomasInput.classList.remove('success');

    // Reiniciamos el objeto
    reiniciarObjeto(citaActual);

    // Mostrar el HTML de las citas
    ui.imprimirCitas(citas);
}

// Reiniciar objeto
function reiniciarObjeto() {
    citaActual.mascota = '';
    citaActual.propietario = '';
    citaActual.telefono = '';
    citaActual.fecha = '';
    citaActual.hora = '';
    citaActual.sintomas = '';
    citaActual.id = '';

    // Reiniciamos el array de validaciones
    validateArray = [false, false, false, false, false, false];
    // Para luego deshabilitar el boton submit
    ui.habilitarSubmit();
}


// Validaciones input
function datosCitaText(e) {
    const id = e.target.id;
    if (e.target.value === '' || Number(e.target.value)) {
        // Agrega mensaje y estilos de error
        e.target.classList.remove('success');
        e.target.classList.add('danger');
        ui.mostrarSugerencia(e, 'Ingrese un nombre válido por favor :)');

        // Validacion por false
        if (id === 'mascota') {
            validateArray[0] = false;
        }

        if (id === 'propietario') {
            validateArray[1] = false;
        }

        ui.habilitarSubmit();

    } else {
        // Agrega mensaje y estilos de valido
        e.target.classList.remove('danger');
        e.target.classList.add('success');

        // Validacion por true
        if (id === 'mascota') {
            validateArray[0] = true;
        }

        if (id === 'propietario') {
            validateArray[1] = true;
        }

        ui.habilitarSubmit();
    }
}

// BOTON PARA CHECKEAR EL ARRAY DE VALIDACION
const boton = document.querySelector('#boton');
boton.addEventListener('click', () => {
    console.log(validateArray);
})

function datosCitaPhone(e) {
    if (e.target.value === '' || !Number(e.target.value)) {
        // Agrega mensaje y estilos de error
        e.target.classList.remove('success');
        e.target.classList.add('danger');
        ui.mostrarSugerencia(e, 'Ingrese un telefono válido por favor :)');

        // Validacion por false
        validateArray[2] = false;

        ui.habilitarSubmit();

    } else {
        // Agrega mensaje y estilos de valido
        e.target.classList.remove('danger');
        e.target.classList.add('success');

        // Validacion por true
        validateArray[2] = true;

        ui.habilitarSubmit();
    }
}

function datosCitaDate(e) {
    if (e.target.value === '') {
        // Agrega mensaje y estilos de error
        e.target.classList.remove('success');
        e.target.classList.add('danger');
        ui.mostrarSugerencia(e, 'Ingrese una fecha válida por favor :)');

        // Validacion por false
        validateArray[3] = false;

        ui.habilitarSubmit();

    } else {
        // Agrega mensaje y estilos de valido
        e.target.classList.remove('danger');
        e.target.classList.add('success');

        // Validacion por true
        validateArray[3] = true;

        ui.habilitarSubmit();
    }
}

function datosCitaHour(e) {
    if (e.target.value === '') {
        // Agrega mensaje y estilos de error
        e.target.classList.remove('success');
        e.target.classList.add('danger');
        ui.mostrarSugerencia(e, 'Ingrese una hora válida por favor :)');

        // Validacion por false
        validateArray[4] = false;

        ui.habilitarSubmit();

    } else {
        // Agrega mensaje y estilos de valido
        e.target.classList.remove('danger');
        e.target.classList.add('success');

        // Validacion por true
        validateArray[4] = true;

        ui.habilitarSubmit();
    }
}

function datosCitaSintoma(e) {
    if (e.target.value === '') {
        // Agrega mensaje y estilos de error
        e.target.classList.remove('success');
        e.target.classList.add('danger');
        ui.mostrarSugerencia(e, 'Ingrese una descripcion válida por favor :)');

        // Validacion por false
        validateArray[5] = false;

        ui.habilitarSubmit();

    } else {
        // Agrega mensaje y estilos de valido
        e.target.classList.remove('danger');
        e.target.classList.add('success');

        // Validacion por true
        validateArray[5] = true;

        ui.habilitarSubmit();
    }
}
