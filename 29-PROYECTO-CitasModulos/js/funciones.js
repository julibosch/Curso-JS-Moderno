import Citas from './classes/Citas.js';
import UI from './classes/UI.js';

import { mascotaInput, propietarioInput, telefonoInput, fechaInput, horaInput, sintomasInput, formulario} from './selectores.js';

// ***** Instancias *****
export const ui = new UI();
const citas = new Citas();

// ***** Variables *****
let editando = false;

// Logica de validaciones de inputs
export let validateArray = [false, false, false, false, false, false];

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

// Carga los datos y modo de edicion
export function cargarEdicion(cita) {

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
export function eliminarCitas(id) {
    // Eliminar la cita
    citas.eliminarCita(id);

    // Mostrar mensaje
    ui.imprimirMensaje('La cita se elimino correctamente', 'error');

    // Actualizar listado de citas
    ui.imprimirCitas(citas);
}

export function crearNuevaCita(e) {
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
export function reiniciarObjeto() {
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
export function datosCitaText(e) {
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

// Funciones de datos de inputs
export function datosCitaPhone(e) {
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

export function datosCitaDate(e) {
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

export function datosCitaHour(e) {
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

export function datosCitaSintoma(e) {
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