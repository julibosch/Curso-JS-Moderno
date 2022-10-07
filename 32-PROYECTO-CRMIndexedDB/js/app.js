(function () {
    document.addEventListener("DOMContentLoaded", () => {
        crearDB();

        listadoClientes.addEventListener('click', eliminarRegistro);
    });

    let DB;
    const listadoClientes = document.querySelector("#listado-clientes");

    function crearDB() {
        let crmDB = window.indexedDB.open("crm", 1);

        crmDB.onerror = function () {
            console.log("Ha ocurrido un error al crear la DB");
        };

        crmDB.onsuccess = function () {
            console.log("Base de datos creada con exito!");

            DB = crmDB.result;

            mostrarClientes();
        };

        crmDB.onupgradeneeded = function (e) {
            const db = e.target.result;

            const objectStore = db.createObjectStore("crm", {
                keyPath: "id",
                autoIncrement: true,
            });

            objectStore.createIndex("nombre", "nombre", { unique: false });
            objectStore.createIndex("email", "email", { unique: true });
            objectStore.createIndex("telefono", "telefono", { unique: false });
            objectStore.createIndex("empresa", "empresa", { unique: false });
            objectStore.createIndex("id", "id", { unique: true });

            console.log("Columnas creadas con exito!");
        };
    }

    function mostrarClientes() {
        const objectStore = DB.transaction("crm").objectStore("crm");

        objectStore.openCursor().onsuccess = (e) => {
            const cursor = e.target.result;

            if (cursor) {
                const { nombre, email, telefono, empresa, id } = cursor.value;

                const cliente = document.createElement("tr");

                cliente.innerHTML = ` <tr>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                    <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
                    <p class="text-sm leading-10 text-gray-700"> ${email} </p>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                    <p class="text-gray-700">${telefono}</p>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                    <p class="text-gray-600">${empresa}</p>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                    <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                    <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
                </td>
            </tr>
        `;

                listadoClientes.appendChild(cliente);

                cursor.continue();
            }
        };
    }

    function eliminarRegistro(e) {
        e.preventDefault();

        if(e.target.classList.contains('eliminar')) {
            const idEliminar = Number(e.target.dataset.cliente);
            
            const confirmar = confirm('¿Esta seguro que desea eliminar este cliente?');

            if( confirmar ) {
                const transaction = DB.transaction(['crm'], 'readwrite');
                const objectStore = transaction.objectStore('crm');

                objectStore.delete(idEliminar);

                transaction.oncomplete = () => { 
                    e.target.parentElement.parentElement.remove();
                }

                transaction.onerror = () => {
                    console.log('Hubo un error');
                }
            }
        }
    }

})();
