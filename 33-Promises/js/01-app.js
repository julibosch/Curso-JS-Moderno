let paises = ['Alemania', 'Argentina', 'Brasil'];

function insertarPais(pais, callback) {
    paises.push(pais);
    console.log(`Se ha agregado: ${pais}`);

    callback();
}

function mostrarPaises() {
    console.log(paises);
}

function insertandoPaisesCallback() {
    setTimeout(() => {
        insertarPais('China', mostrarPaises);

        setTimeout(() => {
            insertarPais('Belgica', mostrarPaises);

            setTimeout(() => {
                insertarPais('Suiza', mostrarPaises);
            }, 3000);
        }, 3000);
    }, 3000);
}

insertandoPaisesCallback();