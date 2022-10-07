let cliente = {
    mesa: '',
    hora: '',
    pedido: []
}   

let categorias = {
    1: 'Comidas',
    2: 'Bebidas',
    3: 'Postres'
}

let visible = false;

const modal = document.querySelector('.modal-body');

const btnGuardarCliente = document.querySelector('#guardar-cliente');
btnGuardarCliente.addEventListener('click', guardarCliente);

function guardarCliente() {
    /* Tomamos los values de los inputs */
    const mesa = document.querySelector('#mesa').value;
    const hora = document.querySelector('#hora').value;
    
    if(mesa === '' || hora === '') {
        mostrarMensaje('Los campos no pueden quedar vacios', 'error');
    
        return;
    }

    /* Le asignamos al cliente la mesa y la hora */
    cliente = {...cliente, mesa, hora};

    /* Cerramos el modal con una funcion nativa de Bootstrap */
    const modalFormulario = document.querySelector('#formulario');
    const modalBootstrap = bootstrap.Modal.getInstance(modalFormulario);

    modalBootstrap.hide();

    /* Reseteamos el formulario */
    document.querySelector('#formulario form').reset();

    /* Mostrar Secciones */
    mostrarSecciones();

    /* Traernos los platillos desde el JSON server */
    obtenerPlatillos();
}

function obtenerPlatillos() {
    const url = 'http://localhost:3000/platillos';

    fetch(url)
        .then(response => response.json())
        .then(platillos => mostrarPlatillos(platillos))
}

function mostrarPlatillos(platillos) {
    const contenido = document.querySelector('#platillos .contenido');

    const encabezado = document.createElement('div');
    encabezado.classList.add('row', 'encabezado-platillos');

    const encNom = document.createElement('div');
    encNom.textContent = 'Nombre';
    encNom.classList.add('col-md-4');

    const encPre = document.createElement('div');
    encPre.textContent = 'Precio';
    encPre.classList.add('col-md-3');

    const encCat = document.createElement('div');
    encCat.textContent = 'Categoria';
    encCat.classList.add('col-md-3');
    
    const cantidadAgregada = document.createElement('div');
    cantidadAgregada.textContent = 'Cantidad';
    cantidadAgregada.classList.add('col-md-2');

    encabezado.appendChild(encNom);
    encabezado.appendChild(encPre);
    encabezado.appendChild(encCat);
    encabezado.appendChild(cantidadAgregada);

    contenido.appendChild(encabezado);

    platillos.forEach( platillo => {

        const {id, nombre, precio, categoria} = platillo;

        const row = document.createElement('div');
        row.classList.add('row', 'platillo');
        row.setAttribute('data-id', id);

        const nombrePlatillo = document.createElement('div');
        nombrePlatillo.classList.add('col-md-4');
        nombrePlatillo.textContent = nombre;

        const precioPlatillo = document.createElement('div');
        precioPlatillo.classList.add('col-md-3', 'fw-bold');
        precioPlatillo.textContent = `$${precio}`;

        const categoriaPlatillo = document.createElement('div');
        categoriaPlatillo.classList.add('col-md-3');
        categoriaPlatillo.textContent = categorias[categoria];

        const inputCantidad = document.createElement('input');
        inputCantidad.type = 'number';
        inputCantidad.defaultValue = 0;
        inputCantidad.min = 0;
        inputCantidad.id = `producto-${id}`
        inputCantidad.classList.add('col-md-1', 'form-control');

        /* Funcion de change en input */
        inputCantidad.onchange = () => {
            const cantidad = parseInt(inputCantidad.value);

            agregarPlatillo({...platillo, cantidad})
        }
        
        const agregar = document.createElement('div');
        agregar.classList.add('col-md-2');
        agregar.appendChild(inputCantidad);

        row.appendChild(nombrePlatillo);
        row.appendChild(precioPlatillo);
        row.appendChild(categoriaPlatillo);
        row.appendChild(agregar);

        contenido.appendChild(row);
    })
}

function agregarPlatillo(objetoPlatillo) {
    let { pedido } = cliente;
    
    if(objetoPlatillo.cantidad > 0) {
        let existe = cliente.pedido.some( platillo => platillo.id === objetoPlatillo.id);

        if(!existe) {
            cliente.pedido = [...pedido, objetoPlatillo];
        } else {
            cliente.pedido.forEach( pedido => {
                if(pedido.id === objetoPlatillo.id) {
                    pedido.cantidad = objetoPlatillo.cantidad;
                }
            })
        }
    } else {
        cliente.pedido = cliente.pedido.filter( pedido => pedido.id !== objetoPlatillo.id);
    }
    
    /* Actualizar Resumen */
    actualizarResumen();
}

function mostrarSecciones() {
    const seccionesOcultas = document.querySelectorAll('.d-none');

    seccionesOcultas.forEach( seccion => seccion.classList.remove('d-none'));
}

function mostrarMensaje(mensaje, tipo) {
    if(!visible) {
        const mensajeHTML = document.createElement('p');
    
        mensajeHTML.textContent = mensaje;
    
        if(tipo === 'error') {
            mensajeHTML.classList.add('error');
        }
    
        modal.appendChild(mensajeHTML);
    
        visible = true;
    
        setTimeout(() => {
            mensajeHTML.remove();
            visible = false;
        }, 2500);
    }
}

function actualizarResumen() {
    const contenidoResumen = document.querySelector('#resumen .contenido');
    
    if(cliente.pedido.length != 0) {
        limpiarHTML(contenidoResumen);

        const pedidoTable = document.createElement('table');
        pedidoTable.classList.add('tabla-resumen');

        pedidoTable.innerHTML = `
            <tr class="border-bottom">
                <th class="col-md-3">Platillo</td>
                <th class="col-md-2">Cantidad</td>
                <th class="col-md-2">Precio unitario</td>
                <th class="col-md-2">Total</td>
            </tr>    
        `;

        contenidoResumen.appendChild(pedidoTable);
        const pedidoTableBody = document.querySelector('.tabla-resumen tbody')

        console.log({pedidoTable, cliente})

        cliente.pedido.forEach( pedido => {
            const { nombre, precio, cantidad } = pedido;
            const pedidoRow = document.createElement('tr');
            const total = precio*cantidad;

            pedidoRow.innerHTML = `
                <td class="col-md-3">${nombre}</td>
                <td class="col-md-2">${cantidad}</td>
                <td class="col-md-2">${precio}</td>
                <td class="col-md-2">${total}</td>
            `;

            pedidoTableBody.appendChild(pedidoRow);
        });

        const tableTotal = document.createElement('div');
        tableTotal.innerHTML = `
            <p class="py-4 border-top"><span class="fw-bold">Total: </span>${calcularTotal()}</p>
        `;

        contenidoResumen.appendChild(tableTotal);

    } else {
        limpiarHTML(contenidoResumen)
        const mensajeVacio = document.createElement('p');
        mensajeVacio.classList.add('text-center')
        mensajeVacio.textContent = 'Añade los elementos del pedido';
        contenidoResumen.appendChild(mensajeVacio);
    }
}

function limpiarHTML(div) {
    while(div.firstChild) {
        div.removeChild(div.firstChild)
    }
}

function calcularTotal() {
    let total = 0;
    let totalPedido = 0;

    cliente.pedido.forEach( pedido => {
        totalPedido = pedido.cantidad*pedido.precio;

        total += totalPedido;
    });

    return total;
}