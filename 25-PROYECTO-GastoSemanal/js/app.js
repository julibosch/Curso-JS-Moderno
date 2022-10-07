// Variables
const formulario = document.querySelector("#agregar-gasto");
const gastosListado = document.querySelector("#gastos ul");

// Eventos
eventListeners();

function eventListeners() {
    document.addEventListener("DOMContentLoaded", preguntarPresupuesto);

    formulario.addEventListener("submit", agregarGasto);
}

// Classes
class Presupuesto {
    constructor(presupuesto) {
        (this.presupuesto = Number(presupuesto)),
            (this.restante = Number(presupuesto)),
            (this.gastos = []);
    }

    nuevoGasto(gasto) {
        this.gastos.push(gasto);
        this.calcularRestante();
    }

    calcularRestante() {
        const gastado = this.gastos.reduce(
            (total, gasto) => total + gasto.cantidadGasto,
            0
        );

        this.restante = this.presupuesto - gastado;
    }
}

class UI {
    insertarPresupuesto(cantidad) {
        const { presupuesto, restante } = cantidad;

        document.querySelector("#total").textContent = presupuesto;
        document.querySelector("#restante").textContent = restante;
    }

    imprimirAlerta(mensaje, tipo) {
        // Crear div
        const divAlerta = document.createElement("div");
        divAlerta.classList.add("text-center", "alert");

        if (tipo === "error") {
            divAlerta.classList.add("alert-danger");
        } else {
            divAlerta.classList.add("alert-success");
        }

        // Insertar en el HTML
        divAlerta.textContent = mensaje;
        document.querySelector(".primario").insertBefore(divAlerta, formulario);

        // Quitar del HTML
        setTimeout(() => {
            divAlerta.remove();
        }, 3000);
    }

    agregarGastoListado(gastos) {
        limpiarHTML();

        gastos.forEach((gasto) => {
            const { nombreGasto, cantidadGasto, id } = gasto;

            // Crear el LI
            const gastoHTML = document.createElement("li");
            gastoHTML.className =
                "list-group-item d-flex justify-content-between align-items-center";
            gastoHTML.setAttribute("data-id", id);

            // Agregar HTML del gasto
            gastoHTML.innerHTML = `${nombreGasto} <span class="badge badge-primary badge-pill"> $${cantidadGasto} </span>`;

            // Agregar boton de borrar gasto
            const btnBorrar = document.createElement("button");
            btnBorrar.innerHTML = "Borrar &times";
            btnBorrar.classList.add("btn", "btn-danger", "borrar-gasto");

            // Insertar boton borrar
            gastoHTML.appendChild(btnBorrar);

            // Insertar gasto en el HTML
            gastosListado.appendChild(gastoHTML);

            // Funcion de borrar gasto
            btnBorrar.onclick = (e) => {
                actualizarRestanteBorrado(e, gastos);
            };
        });
    }

    actualizarRestante(restante, presupuesto) {
        document.querySelector("#restante").textContent = restante;

        const pres = presupuesto.presupuesto;

        let indice = restante / pres;

        if (indice <= 0.2) {
            const restanteHTML =
                document.querySelector("#restante").parentElement.parentElement;
            let estado = restanteHTML.classList[2];
            restanteHTML.classList.replace(estado, "alert-danger");
        } else if (indice <= 0.4) {
            const restanteHTML =
                document.querySelector("#restante").parentElement.parentElement;
            let estado = restanteHTML.classList[2];
            restanteHTML.classList.replace(estado, "alert-warning");
        }
    }
}

// Instancias
const ui = new UI();

let presupuesto;

// Funciones

// Actualiza restante al borrar un gasto
function actualizarRestanteBorrado(e, gastos) {
    const monto = e.target.parentElement.children[0].textContent;
    const id = e.target.parentElement.attributes[1].value;
    console.log(monto);
    console.log(id);

    gastos.forEach( gasto => {
        if(gasto.id === Number(id)) {
            console.log(gastos.indexOf());
        }
    });
    console.log(gastos);
    console.log(e.target.parentElement);
}

// Pregunta el presupuesto al ingresar a la pagina
function preguntarPresupuesto() {
    const presupuestoUsuario = prompt("¿Cual es tu presupuesto?");

    if (
        presupuestoUsuario === "" ||
        presupuestoUsuario === null ||
        isNaN(presupuestoUsuario) ||
        presupuestoUsuario == 0
    ) {
        window.location.reload();
    }

    presupuesto = new Presupuesto(presupuestoUsuario);

    ui.insertarPresupuesto(presupuesto);
}

// Añadir gastos
function agregarGasto(e) {
    e.preventDefault();

    const nombre = document.querySelector("#gasto");
    const cantidad = document.querySelector("#cantidad");

    let nombreGasto = nombre.value;
    let cantidadGasto = Number(cantidad.value);

    // Validar forms
    if (nombreGasto === "" || cantidadGasto === "") {
        ui.imprimirAlerta("Ambos campos deben ser completados", "error");
        return;
    } else if (cantidadGasto <= 0 || isNaN(cantidadGasto)) {
        ui.imprimirAlerta("El monto debe ser mayor a 0(cero)", "error");
        return;
    }

    // Hasta que ambos campos esten correctos, no se ejecutara esta sentencia
    // Crear objeto con el gasto
    const gasto = { nombreGasto, cantidadGasto, id: Date.now() };

    // Añade el nuevo gasto
    presupuesto.nuevoGasto(gasto);

    // Imprime alerta de gasto agregado correctamente
    ui.imprimirAlerta("El gasto se ha agregado correctamente", "success");

    // Imprimir gasto en listado
    const { gastos, restante } = presupuesto;
    ui.agregarGastoListado(gastos);
    ui.actualizarRestante(restante, presupuesto);

    // Reset form
    setTimeout(() => {
        formulario.reset();
    }, 3000);
}

// Limpiar HTML
function limpiarHTML() {
    while (gastosListado.firstChild) {
        gastosListado.removeChild(gastosListado.firstChild);
    }
}
