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
        console.log('DATA: ', data)
        return data;

    } catch (error) {
        console.error('Error en la solicitud:', error.message);
        throw error; // Relanzo el error para que pueda ser manejado externamente si es necesario
    }
}

async function updateStockItem(productId, cantidad, action) {
    // Datos que se enviarán al servidor
    const data = {
        productoId: productId,
        cantidad: 1,
    };

    try {
        if (action == 'increment'){
            const response = await fetch(`/carrito-elementos/add`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
    
            if (!response.ok) {
                throw new Error('Error en la solicitud: La respuesta no es válida');
            }
            .then(data => {
                /*
                if (data.cantidad > -1){
                    alert("Mensaje: " + data.message + "\nCantidad: " + data.cantidad);
                } else {
                    alert("Mensaje: " + data.message );
                }
                */

                return data;
            })

        } else {
            const response = await fetch(`/carrito-elementos/sub`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
    
            if (!response.ok) {
                throw new Error('Error en la solicitud: La respuesta no es válida');
            }
            
            const responseData = await response.json();
            console.log('responseData', responseData);
    
            // Manejar la respuesta del servidor y devolver la información deseada
            return responseData.cantidadTotal;
            //mensaje: responseData.mensaje,
            
           
        }
        

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
                let actuallyStock = await updateStockItem(productId, cantidad, action);
                quantityElement.textContent = parseInt(actuallyStock);
            } else{
                alert('Se alcanzó la cantidad maxima de las unidades en Stock!! ');
            }

        } catch (error) {
            console.error('Error:', error.message);
        }
    }
});