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
        return data;

    } catch (error) {
        console.error('Error en la solicitud:', error.message);
        throw error; // Relanzo el error para que pueda ser manejado externamente si es necesario
    }
}

document.addEventListener('DOMContentLoaded', function () {
    window.updateQuantity = async function (productId, action, quantity) {
        try {
            const quantityElement = document.getElementById(productId);
            let cantidad = parseInt(quantityElement.textContent);
            const stock = await getStockItem(productId);

            // Actualizo la pantalla
            if (action == 'increment') {
                cantidad = cantidad + 1;
            } else {
                cantidad = cantidad - 1;
                if (cantidad <= 0) {
                    cantidad = 1;
                }
            }

            if (stock >= cantidad) {
                quantityElement.textContent = cantidad;
            } else{
                alert('Se alcanzó la cantidad maxima de las unidades en Stock!! ');
            }

        } catch (error) {
            console.error('Error:', error.message);
        }
    }
});
