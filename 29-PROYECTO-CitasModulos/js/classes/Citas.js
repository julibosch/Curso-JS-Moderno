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

export default Citas;