async function getStockItem(productId) {
    console.log('updateQtyCart: ', productId);
    try {
        const response = await fetch(`/productos/stock/${productId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error en la solicitud: La respuesta no es válida');
        }

        const data = await response.json();
        console.log('getStockItem STOCK: ', data)
        return data;

    } catch (error) {
        console.error('Error en la solicitud:', error.message);
        throw error; // Relanzo el error para que pueda ser manejado externamente si es necesario
    }
}

async function updateStockItem(productId, cantidad, action) {
    const data = {
        productoId: productId,
        cantidad: 1,
    };

    const cantidadOriginal = cantidad;

    try {
        if (action == 'increment') {
            const response = await fetch(`/carrito-elementos/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            console.log(responseData.message); // "Producto agregado al carrito"
            console.log(responseData.resultCantidad); // 5
            console.log(responseData.tope); // "NONE"

            if (responseData.tope !== 'NONE') {
                alert(responseData.message);
                return cantidadOriginal;
            } else {
                return parseInt(responseData.resultCantidad);
            }
        } else {
            const response = await fetch(`/carrito-elementos/sub`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            console.log(responseData.message); // "Producto agregado al carrito"
            console.log(responseData.resultCantidad); // 5
            console.log(responseData.tope); // "NONE"

            if (responseData.tope !== 'NONE') {
                alert(responseData.message);
                return cantidadOriginal;
            } else {
                return parseInt(responseData.resultCantidad);
            }
        }
    } catch (error) {
        console.error('Error en la solicitud:', error.message);
        throw error;
    }
}


async function deleteItem(productId) {
    let confirmacion = confirm('¿Estás seguro que quieres borrar el item?');

    console.log('PRODUCT ID QUE ENTRA A deleteItem en carrito.js: ', productId);
    if (confirmacion) {
        try {
            const response = await fetch(`/carrito-elementos/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ productId: productId })
            });

            if (!response.ok) {
                throw new Error('Error en la solicitud: La respuesta no es válida');
            }

            const data = await response.json();
            // Actualizo la pantalla con el listado nuevo
            window.location.href = '/carrito-elementos';
            console.log(data);
        } catch (error) {
            console.error('Error en la solicitud:', error.message);
        }
    }
}

// carrito.js

function updatePageWithNewData(data) {
   
  
    // Actualizar la sección de resumen
    const cantidadTotalElement = document.getElementById('cantidadTotal');
    const subtotalElement = cantidadTotalElement.nextElementSibling.nextElementSibling.querySelector('.text-resumen.numero');
    const costoEnvioElement = subtotalElement.nextElementSibling.nextElementSibling.querySelector('.text-resumen.numero');
    const totalPagarElement = costoEnvioElement.nextElementSibling.nextElementSibling.querySelector('.numero');

    cantidadTotalElement.textContent = data.cantidadTotal;
    subtotalElement.textContent = `$${data.subTotal}`;
    costoEnvioElement.textContent = `$${data.costoEnvio}`;
    totalPagarElement.textContent = `$${data.totalPagar}`;

    console.log('cantidad total: ', data.cantidadTotal);
}
  
  
document.addEventListener('DOMContentLoaded', function () {
    
    const trashIcons = document.querySelectorAll('.trash');

    trashIcons.forEach(function (icon) {
        icon.addEventListener('click', function () {
            console.log(icon);
            const productId = icon.getAttribute('data-id');
            
            // Verifica directamente si productId tiene un valor
            if (!productId) {
                console.error('El productId no tiene un valor.');
                return;
            }
            
            // Determina si el ícono es de editar o eliminar y redirige en consecuencia
            if (icon.src.includes('delete_trash.svg')) {
                deleteItem(productId)
                    .then(result => {
                        console.log(result);
                    })
                    .catch(error => {
                        console.error('Error:', error.message);
                    });
            }
        });
    });

    window.updateQuantity = async function (productId, action, quantity) {
        try {
            const quantityElement = document.getElementById(productId);
            const cantidad = parseInt(quantityElement.textContent);
            const actuallyStock = await updateStockItem(productId, cantidad, action);
            quantityElement.textContent = parseInt(actuallyStock);

            location.reload();
          /*
            const response = await fetch(`/carrito-elementos?refreshDataOnly=true`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('ACA LLEGARON LOS DATOS: ', data);
            // Actualizar la página con los nuevos datos sin recargarla
            updatePageWithNewData(data);
*/
        } catch (error) {
            console.error('Error:', error.message);
        }
        
    }
});

