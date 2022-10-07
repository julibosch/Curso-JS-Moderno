import * as UI from './interfaz.js';

class API {
    constructor(artista, cancion) {
        this.artista = artista,
        this.cancion = cancion
    }

    consultarAPI() {
        const url = './letras.json';

        fetch(url)
            .then( response => response.json())
            .then( temas => {
                temas.forEach( tema => {
                    if(tema.artista === this.artista && tema.cancion === this.cancion) {
                        console.log(tema.letra)
                    }
                })
            })
    }

}

export default API;