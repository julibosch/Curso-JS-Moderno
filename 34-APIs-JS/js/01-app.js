const notificarBtn = document.querySelector('#notificar');

notificarBtn.addEventListener('click', () => {
    Notification
        .requestPermission()
            .then(resultado => {
                console.log('El resultado es: ', resultado)
            })
})

const verNotificacion = document.querySelector('#verNotificacion');

verNotificacion.addEventListener('click', () => {
    if(Notification.requestPermission === 'granted') {
        new Notification('Esta es la notificacion')
    } else {
        new Notification('Anasheeee', {
            icon: 'img/ccj.png'
        })
    }
})
