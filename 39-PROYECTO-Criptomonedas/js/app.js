const criptomonedasSelect = document.querySelector('#criptomonedas');
const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');
const keyAPI = '3bf93827647e54d77eb3fb258b9832a09428fc44b7f6724f78c08737665ea43c';
let criptosTotal;
let visible = false;

document.addEventListener('DOMContentLoaded', () => {
    consultarCriptosSelect();

    eventListeners();
});

function eventListeners() {
    formulario.addEventListener('submit', validarForm);
}

function consultarCriptosSelect() {
    const urlAPI = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD&api_key=${keyAPI}`;

    fetch(urlAPI)
        .then( response => response.json())
        .then( criptos => rellenarSelect(criptos.Data))
}

function rellenarSelect(criptos) {
    criptosTotal = criptos;

    criptos.forEach( cripto => {
        
        const nombreCripto = cripto.CoinInfo.FullName
        const internalName = cripto.CoinInfo.Internal
        
        const criptoOption = document.createElement('option');

        criptoOption.textContent = nombreCripto;
        criptoOption.value = internalName;

        criptomonedasSelect.appendChild(criptoOption);
    })
}

function validarForm(e) {
    e.preventDefault();

    const moneda = document.querySelector('#moneda').value;
    const internal = criptomonedasSelect.value;

    if(moneda === '' || internal === '') {
        mostrarError('Todos los campos son obligatorios');
        
        return;
    }

    consultarAPI(moneda, internal);
}

function mostrarError(mensaje) {
    if(!visible) {
        const mensajeHTML = document.createElement('p');
    
        mensajeHTML.textContent = mensaje;
        mensajeHTML.classList.add('error');
    
        resultado.appendChild(mensajeHTML);
        visible = true;
    
        setTimeout(() => {
            mensajeHTML.remove();
            visible = false;
        }, 2500);
    }
}

function consultarAPI(moneda, internal) {
    const urlAPI = `https://min-api.cryptocompare.com/data/price?fsym=${internal}&tsyms=${moneda}&api_key=${keyAPI}`;

    fetch(urlAPI)
        .then(response => response.json())
        .then(datosCripto => mostrarCripto(datosCripto, internal, moneda))
}

function mostrarCripto(datosCripto, internal, moneda) {

    limpiarHTML();
    let criptoElegida;

    criptosTotal.forEach( cripto => {
        if(cripto.CoinInfo.Internal === internal){
            criptoElegida = cripto.CoinInfo;
        }
    });

    console.log(Object.keys(datosCripto))
    console.log(Object.values(datosCripto))

    
    const criptoHTML = document.createElement('div');
    criptoHTML.classList.add('div-cripto');
    criptoHTML.innerHTML = `
        <div class="cripto-header">
            <img style="margin-top: 0px" class="cripto-icon" src="https://www.cryptocompare.com/${criptoElegida.ImageUrl}">
            <h2>${criptoElegida.FullName}</h2>
        </div>    
        <span class="separador"></span>
        <p class="precio">Valor en ${moneda}: $ ${Object.values(datosCripto)[0]}</p>
    `;

    resultado.appendChild(criptoHTML);
}

function limpiarHTML() {
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}