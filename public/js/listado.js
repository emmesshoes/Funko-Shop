document.addEventListener('DOMContentLoaded', function (e) {
    
    const lapizIcons = document.querySelectorAll('.lapiz');

    lapizIcons.forEach(function (icon) {
        icon.addEventListener('click', function () {
            console.log(icon);
            const productId = icon.getAttribute('data-id');
            // Verifica directamente si productId tiene un valor
            if (!productId) {
                console.error('El productId no tiene un valor.');
                return;
            }
            console.log('productId: ', productId);
            // Determina si el ícono es de editar o eliminar y redirige en consecuencia
            if (icon.src.includes('edit_pencil.svg')) {
                editarItem(productId);
            } else if (icon.src.includes('delete_trash.svg')) {
                mostrarConfirm(productId); // Pasa el id_producto a la función
            } 
        });
    });
    
});

function editarItem(productId) {
    window.location.href = `/admin/editar-prod/${productId}`;
    /*
    // Realizar una solicitud POST usando fetch
    fetch(`/admin/editar-prod/${productId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ productId: productId })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud: La respuesta no es válida');
        }
        // En lugar de esperar JSON, puedes redirigir directamente
        window.location.href = `/admin/editar-prod/${productId}`;
    })
    .catch(error => {
        // Manejar errores de la solicitud
        console.error('Error en la solicitud:', error.message);
    });
    */
}


function mostrarConfirm(productId) {
    let confirmacion = confirm('¿Estás seguro que quieres borrar el item?');

    if (confirmacion) {
        // Realizar una solicitud DELETE usando fetch
        fetch(`/productos/delete/${productId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
                // Puedes agregar más encabezados según sea necesario
            },
            // Puedes enviar datos adicionales en el cuerpo si es necesario
            body: JSON.stringify({ productId: productId })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud: La respuesta no es válida');
            }
            return response.json();
        })
        .then(data => {
            //Actualizo la pantalla con el listado nuevo
            window.location.href = '/admin';
            console.log(data);
        })
        .catch(error => {
            // Manejar errores de la solicitud
            console.error('Error en la solicitud:', error.message);
        });
    }

}

