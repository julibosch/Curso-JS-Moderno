// Variables
const resultado = document.querySelector("#resultado");
const year = document.querySelector("#year");
const marca = document.querySelector("#marca");
const selects = document.querySelector('form');

const max = new Date().getFullYear();
const min = max - 13;

//Generar un objeto con la busqueda
let datosBusqueda = {
    marca: "",
    modelo: "",
    year: 0,
    puertas: 0,
    color: "",
    transmision: "",
};

let datosAuto = [];


// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    mostrarAutos(autos);

    //Llena los años del select "años"
    llenarSelect();
});

/* marca.addEventListener("change", leerDatosMarca); */
selects.addEventListener('change', leerDatosSelect);

// Funciones
function mostrarAutos(autos) {
    //limpiarHTML();
    //Recorremos el array de autos
    autos.forEach((auto) => {
        //Creamos el html de cada auto
        const autoHTML = document.createElement("p");

        const { marca, modelo, year, precio, puertas, color, transmision } = auto; //Destructuring

        autoHTML.textContent = `
            ${marca}   
            ${modelo}  -  
            Año: ${year}  -  
            $${precio}  -  
            ${puertas} puertas  -  
            Color: ${color}  -  
            Transmision: ${transmision}
        `;

        resultado.appendChild(autoHTML); //Insertamos cada auto en div resultado
    });
}

function llenarSelect() {
    for (let i = max; i > min; i--) {
        const yearHTML = document.createElement("option");

        yearHTML.value = i;
        yearHTML.textContent = i;

        year.appendChild(yearHTML);
    }
}

function leerDatosSelect(e) {
    //Creo una variable con el id del select que estamos cambiando (marca, modelo, año, etc..).
    let id = e.target.id;

    //Pregunto si el objeto de datos busqueda posee dicho id, lo cual es cierto.
    if(Object.keys(datosBusqueda).includes(id)) {

        //Si el id del select es año, convertimos el value a int y le asignamos el valor a la key year.
        if(id === 'year'){
            datosBusqueda[id] = parseInt(e.target.value);
            //console.log(datosBusqueda);
            filtrarAuto(datosBusqueda);
        } else {
            //Le asigno el value del select a la key con dicho id.
            datosBusqueda[id] = e.target.value;
            //console.log(datosBusqueda);
            filtrarAuto(datosBusqueda);
        }
    } else { //Aqui vendra cuando estemos seleccionando el precio min y max, lo cual no posee el id precio.
        if(id === 'minimo'){
            datosBusqueda[id] = e.target.value;
            //console.log(datosBusqueda)
            filtrarAuto(datosBusqueda);
        } else {
            datosBusqueda[id] = e.target.value;
            //console.log(datosBusqueda)
            filtrarAuto(datosBusqueda);
        }

    }
}

function filtrarAuto(datosBusqueda) {
    
    datosAuto = Object.values(datosBusqueda);

    const resultado = autos.filter( auto => {
        for(let i=0; i<datosAuto.length; i++) {
            auto[i] === datosAuto[i];
        }
    })
    console.log(resultado);
    //mostrarAutos(resultado);
}

function limpiarHTML() {
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

