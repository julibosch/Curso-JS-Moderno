const publicarTweet = document.querySelector('.publicar-tweet');
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];


// Event Listeners
eventListeners();

function eventListeners() {
    formulario.addEventListener('submit', agregarTweet);

    document.addEventListener('DOMContentLoaded', () => {
        let tweetsAlmacenados = JSON.parse(localStorage.getItem('tweets'));

        if(tweetsAlmacenados != null) {
            tweetsAlmacenados.forEach(tweet => {
                tweets.push(tweet);
            })
            console.log(tweets)
            mostrarTweets();
        } else {
            checkearTweets();
        }
    })

}


// Funciones
function agregarTweet(e) {
    e.preventDefault();

    // Textarea donde se escribe el tweet
    const tweet = document.querySelector('#tweet').value;

    // Validacion
    if(tweet.length == 0) {
        mostrarError('Un tweet no puede ir vacio...');

        return;
    }

    // Agregar tweet
    tweets.push(tweet);
    const tweetsStr = JSON.stringify(tweets);
    localStorage.setItem('tweets', tweetsStr);

    // Mostrar tweets
    mostrarTweets();
}

function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove();
    }, 2000);
}

function mostrarTweets() {
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild)
    }
    tweets.forEach( tweet => {
        const mensajeTweet = document.createElement('p');
        mensajeTweet.textContent = tweet;
        mensajeTweet.classList.add('mensajeTweet');

        listaTweets.appendChild(mensajeTweet);
    })
}

function checkearTweets() {
    if(!listaTweets.firstChild) {
        const noHayTweets = document.createElement('p');
        noHayTweets.textContent = 'Aun no existen tweets';
        noHayTweets.classList.add('error');

        listaTweets.appendChild(noHayTweets)
    }
}