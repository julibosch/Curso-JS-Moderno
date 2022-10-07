const inputName = document.querySelector('.inputName');
const formulario = document.querySelector('.formulario');
const legend = document.querySelector('legend');
const btnEliminar = document.querySelector('.btn-eliminar');
const inputEliminar = document.querySelector('.input-eliminar');

const productos = new Set();

eventListeners();
function eventListeners() {
    formulario.addEventListener('submit', agregarProducto);

    btnEliminar.addEventListener('click', eliminarProducto);
}


function eliminarProducto() {
    let producto = inputEliminar.value;

    if(productos.has(producto)) {
        productos.delete(producto);
        console.log(productos)
    } else {
        console.log('El producto que desea eliminar no existe');
    }
}

function agregarProducto(e) {
    e.preventDefault();
    
    let nuevoProducto = inputName.value;
    productos.add(nuevoProducto);

    console.log(productos);
    console.log(productos.size);
    
    imprimirMensaje();

    formulario.reset();
}

function imprimirMensaje() {
    const mensajeAgregado = document.createElement('p');
    mensajeAgregado.textContent = 'El producto se agrego con exito';
    mensajeAgregado.classList.add('success');
    legend.appendChild(mensajeAgregado);

    setTimeout(() => {
        mensajeAgregado.remove();
    }, 2000);
}

let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 3, 5, 7];
console.log(numeros);

let noDuplicados = [];

numeros.forEach(numero => {
    if(!noDuplicados.includes(numero)) {
        noDuplicados.push(numero);
    }
})

console.log(noDuplicados);