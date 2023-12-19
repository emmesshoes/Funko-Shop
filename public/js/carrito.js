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

document.addEventListener('DOMContentLoaded', function () {
    window.updateQuantity = async function (productId, action, quantity) {
        try {
            const quantityElement = document.getElementById(productId);
            const cantidad = parseInt(quantityElement.textContent);
            const actuallyStock = await updateStockItem(productId, cantidad, action);
            console.log('ESTA ES LA CANTIDAD QUE ME DEVUELVE: ', actuallyStock);
            quantityElement.textContent = parseInt(actuallyStock);
         

        } catch (error) {
            console.error('Error:', error.message);
        }
    }
});