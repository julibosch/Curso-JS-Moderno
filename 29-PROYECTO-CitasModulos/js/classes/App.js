import { datosCitaText, datosCitaPhone, datosCitaDate, datosCitaHour, datosCitaSintoma, crearNuevaCita } from '../funciones.js';

import { mascotaInput, propietarioInput, telefonoInput, fechaInput, horaInput, sintomasInput, formulario} from '../selectores.js';
import { ui } from '../funciones.js';

class App {

    constructor() {
        this.initApp();
    }

    initApp() {
        mascotaInput.addEventListener('blur', datosCitaText);
        propietarioInput.addEventListener('blur', datosCitaText);
        telefonoInput.addEventListener('blur', datosCitaPhone);
        fechaInput.addEventListener('blur', datosCitaDate);
        horaInput.addEventListener('blur', datosCitaHour);
        sintomasInput.addEventListener('blur', datosCitaSintoma);

        // Evento de submit
        formulario.addEventListener('submit', crearNuevaCita);

        // Evento cuando carga el document
        document.addEventListener('DOMContentLoaded', () => {
            ui.habilitarSubmit();
        })
    }
}

export default App;