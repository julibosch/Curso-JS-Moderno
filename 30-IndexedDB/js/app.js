let DB;

document.addEventListener('DOMContentLoaded', () => {
    crmDB();

    setTimeout(() => {
        crearCliente('Marquitos', 'jonaimuro@gmail.com', 124567585);
    }, 5000);
})

function crmDB() {
    let crmDB = window.indexedDB.open('crm', 1);

    crmDB.onerror = function() {
        console.log('Acaba de ocurrir un error');
    }

    crmDB.onsuccess = function() {
        console.log('Base de datos creada con exito!!!');

        DB = crmDB.result;
        console.log(DB)
    }

    crmDB.onupgradeneeded = function(e) {
        const db = e.target.result;

        const objectStore = db.createObjectStore('crm', {
            keyPath: 'crm',
            autoIncrement: true
        });

        objectStore.createIndex('nombre', 'nombre', { unique: false });
        objectStore.createIndex('email', 'email', { unique: true });
        objectStore.createIndex('telefono', 'telefono', { unique: true });

        console.log('Columnas creadas con exito!!!')
    }
}

function crearCliente(nombre, email, telefono) {
    let transaction = DB.transaction(['crm'], 'readwrite');

    transaction.oncomplete = function() {
        console.log('Transaccion completada');
    };

    transaction.onerror = function() {
        console.log('Hubo un error');
    };

    const objectStore = transaction.objectStore('crm');

    const nuevoCliente = {
        telefono: telefono,
        nombre: nombre,
        email: email
    }

    const peticion = objectStore.add(nuevoCliente);

    console.log(peticion);
}