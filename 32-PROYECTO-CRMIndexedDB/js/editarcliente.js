(function() {
    const nombreInput = document.querySelector('#nombre');
    const emailInput = document.querySelector('#email');
    const telefonoInput = document.querySelector('#telefono');
    const empresaInput = document.querySelector('#empresa');

    let idCliente;

    document.addEventListener('DOMContentLoaded', () => {
        conectarDB();

        // Actualizar el registro del cliente
        formulario.addEventListener('submit', actualizarFormulario);

        // Verificar el id del cliente
        const parametrosURL = new URLSearchParams(window.location.search);

        idCliente = parametrosURL.get('id');

        if(idCliente) {
            setTimeout(() => {
                obtenerCliente(idCliente);
            }, 100);
        }
    });

    function actualizarFormulario(e) {
        e.preventDefault();

        if( nombreInput.value === '' || emailInput.value === '' || telefonoInput.value === '' || empresaInput.value === '' ) {
            imprimirAlerta('Todos los campos son obligatorios', 'error');
        } else {

            // Actualizar el cliente
            const clienteActualizado = {
                nombre: nombreInput.value,
                email: emailInput.value,
                telefono: telefonoInput.value,
                empresa: empresaInput.value,
                id: Number(idCliente)
            }

            const transaction = DB.transaction(['crm'], 'readwrite');
            const objectStore = transaction.objectStore('crm');

            objectStore.put(clienteActualizado);

            transaction.oncomplete = () => {
                imprimirAlerta('Cliente editado correctamente!', 'success');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            }
        }
    }

    function obtenerCliente(id) {
        const transaction = DB.transaction(['crm'], 'readonly');
        const objectStore = transaction.objectStore('crm');

        const cliente = objectStore.openCursor();
        
        cliente.onsuccess = function(e) {
            const cursor = e.target.result;

            if(cursor) {
                
                if(cursor.value.id === Number(id)) {
                    llenarFormulario(cursor.value);
                }
                cursor.continue();
            }
        }
    }

    function llenarFormulario(datosCliente) {

        const {nombre, email, telefono, empresa} = datosCliente;

        nombreInput.value = nombre;
        emailInput.value = email;
        telefonoInput.value = telefono;
        empresaInput.value = empresa;
    }
})();