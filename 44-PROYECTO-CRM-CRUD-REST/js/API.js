export const url = 'http://localhost:4000/clientes';

// Insertar un nuevo cliente
export const nuevoCliente = async cliente => {
    
    try {
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify(cliente),
            headers: {
                'content-type': 'application/json'
            }
        });

        window.location.href = 'index.html';
    } catch (error) {
        console.log(error);
    }
}

// Obtiene todos los clientes
export const obtenerClientes = async () => {
    try {
        const response = await fetch(url);
        const data = await response.json();

        return data;
    } catch (error) {
        console.log(error);
    }
}

// Elimina un cliente
export const eliminarCliente = async id => {
    try {
        await fetch(`${url}/${id}`, {
            method: 'DELETE'
        });
    } catch (error) {
        console.log(error);
    }
}

// Obtener un registro en base a un id para editarlo
export const obtenerRegistro = async id => {
    try {
        const response = await fetch(`${url}/${id}`);

        const cliente = await response.json();

        return cliente;
    } catch (error) {
        console.log(error);
    }
}

// Confirmar la edicion de un cliente
export const confirmarEditar = async (id, clienteEditado) => {
    try {
        await fetch(`${url}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(clienteEditado),
            headers: {
                'content-type': 'application/json'
            }
        });

        window.location.href = 'index.html';
    } catch (error) {
        console.log(error);
    }
}