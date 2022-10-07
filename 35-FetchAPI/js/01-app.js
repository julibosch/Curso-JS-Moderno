const cargarAPIbtn = document.querySelector('#cargarAPI');

cargarAPIbtn.addEventListener('click', cargarAPI)

function cargarAPI() {
    
    const urlAPI = 'https://picsum.photos/list';

    fetch(urlAPI)
        .then( respuesta => respuesta.json())
        .then( respuesta => imprimirResultados(respuesta))
}

function imprimirResultados(datos) {
    const contenido = document.querySelector('.contenido');

    let html = '';

    datos.forEach( perfil => {
        const { author, post_url } = perfil;

        html += `
            <p>${author}</p>
            <a href="${post_url}" target="_blank">Ver imagen</a>
        `

        contenido.innerHTML = html;
    })
}