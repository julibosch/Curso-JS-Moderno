(function () {
    document.addEventListener('DOMContentLoaded', () => {

        conectarDB();

        formulario.addEventListener('submit', validarCliente);

    })

    // Funcion de validar el cliente al dar submit al form
    function validarCliente(e) {
        e.preventDefault();

        // Leer valor de los inputs
        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        if (nombre === '' || email === '' || telefono === '' || empresa === '') {
            imprimirAlerta('Todos los campos son obligatorios', 'error');

        } else {
            // Crear un objeto con la informacion de los inputs
            const cliente = { 
                nombre, 
                email, 
                telefono, 
                empresa,
                id : Date.now()
            }; 

            crearNuevoCliente(cliente);

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }
    }

    function crearNuevoCliente(cliente) {
        const transaction = DB.transaction(['crm'], 'readwrite');

        const objectStore = transaction.objectStore('crm');

        objectStore.add(cliente);

        transaction.onerror = () => {
            imprimirAlerta('Ha ocurrido un error al agregar el cliente', 'error');
        }

        transaction.oncomplete = () => {
            imprimirAlerta('Cliente creado con exito', 'success');
        }
    }
})();