const abrirBtn = document.querySelector('#abrir-pantalla-completa');
const salirBtn = document.querySelector('#salir-pantalla-completa');

abrirBtn.addEventListener('click', abrirPantallaCompleta);
salirBtn.addEventListener('click', salirPantallaCompleta);

function abrirPantallaCompleta() {
    document.documentElement.requestFullscreen();
}

function salirPantallaCompleta() {
    document.exitFullscreen();
}