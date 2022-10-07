//Variables
let arrayClientes = [];

const btnCrearCliente = document.querySelector('.crear-cliente');
const contenedorClientes = document.querySelector('.array-clientes');

class Cliente {
    constructor(nombre, saldo, localidad){
        this.nombre = nombre,
        this.saldo = saldo,
        this.localidad = localidad
    }
}

cargarEventListeners();

function cargarEventListeners() {
    btnCrearCliente.addEventListener('click', crearCliente);

    document.addEventListener('DOMContentLoaded', mostrarClientes);
}

function mostrarClientes() {
    arrayClientes = JSON.parse(localStorage.getItem('clientes'));
    console.log(arrayClientes);

    arrayClientes.forEach(cliente => {
        const datosCliente = document.createElement('p');
        datosCliente.textContent = `${cliente.nombre} - $${cliente.saldo} - ${cliente.localidad}`;
        datosCliente.classList.add('cliente');

        contenedorClientes.appendChild(datosCliente);
    })
}

function crearCliente() {
    let nombre = prompt('Ingrese su nombre');
    let saldo = prompt('Ingrese su saldo');
    let localidad = prompt('Ingrese su localidad');

    const cliente = new Cliente(nombre, saldo, localidad);
    console.log(`El cliente ${cliente.nombre} se ha registrado correctamente, con un saldo de $${cliente.saldo} oriundo de la localidad de ${cliente.localidad}`)

    arrayClientes.push(cliente);
    almacenarCliente(arrayClientes);
}

function almacenarCliente(cliente) {
    localStorage.setItem('clientes', JSON.stringify(cliente))
}