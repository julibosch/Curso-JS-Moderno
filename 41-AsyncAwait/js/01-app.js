const urlAPI = 'https://picsum.photos/v2/list?limit=35';

document.addEventListener('DOMContentLoaded', obtenerDatos);



async function obtenerDatos() {
    try {
        const response = await fetch(urlAPI);
        const fotos = await response.json();

        console.log(fotos);
    } catch (error) {
        console.log(error);
    }
}