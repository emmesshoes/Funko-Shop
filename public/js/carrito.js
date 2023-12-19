
 console.log('carrito.js cargado ok');

// async function getStockItem(productId) {
//     console.log('updateQtyCart: ', productId);
//     try {
//         const response = await fetch(`/productos/stock/${productId}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });

//         if (!response.ok) {
//             throw new Error('Error en la solicitud: La respuesta no es válida');
//         }

//         const data = await response.json();
//         return data;

//     } catch (error) {
//         console.error('Error en la solicitud:', error.message);
//         throw error; // Relanzo el error para que pueda ser manejado externamente si es necesario
//     }
// }

// document.addEventListener('DOMContentLoaded', function () {
//     // Variables
//     const counterElement = document.getElementById('counter');
//     let counterValue = 1; // Valor inicial del contador


//     window.updateQuantity = async function (productId, action, quantity) {
//         try {
//             const quantityElement = document.getElementById(productId);
//             let cantidad = parseInt(quantityElement.textContent);
//             const stock = await getStockItem(productId);

//             // Actualizo la pantalla
//             if (action == 'increment') {
//                 cantidad = cantidad + 1;
//             } else {
//                 cantidad = cantidad - 1;
//                 if (cantidad <= 0) {
//                     cantidad = 1;
//                 }
//             }

//             if (stock >= cantidad) {
//                 quantityElement.textContent = cantidad;
//             } else{
//                 alert('Se alcanzó la cantidad maxima de las unidades en Stock!! ');
//             }

//         } catch (error) {
//             console.error('Error:', error.message);
//         }
//     }
// });

//-----------------------------script anterior-------------------------


async function getStockItem(productId) {
    try {
        // Realizar la solicitud GET al servidor
        const response = await fetch(`/productos/stock/${productId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
                // Puedes agregar más encabezados según sea necesario
            }
        });

        // Verificar si la respuesta es exitosa (código de estado 200)
        if (!response.ok) {
            throw new Error('Error en la solicitud: La respuesta no es válida');
        }

        // Parsear la respuesta como JSON
        const data = await response.json();

        // Obtener y retornar la propiedad 'stock' del objeto JSON
        const stock = data.stock;
        return stock;

    } catch (error) {
        console.error('Error en la solicitud:', error.message);
        throw error; // Relanzar el error para que pueda ser manejado externamente si es necesario
    }
}
document.addEventListener('DOMContentLoaded', function () {
    
    // Variables
    const counterElement = document.getElementById('counter');
    let counterValue = 1; // Valor inicial del contador

    // Funciones

    // Función para actualizar la pantalla del contador
    function updateCounterDisplay() {
        counterElement.textContent = counterValue;
    }

    // Función para decrementar
    window.decrement = function () {
        if (counterValue > 1) {
            counterValue--;
            updateCounterDisplay();
        }
    };

    // Función para incrementar
    window.increment = function () {
        counterValue++;
        updateCounterDisplay();
    };

    

        window.addToCart = async function () {
            try {
                // Obtener el stock antes de verificar
                const stock = getStockItem(productId);
    
                // Obtener la cantidad actual
                const quantityElement = document.getElementById('counter');
                let cantidad = parseInt(quantityElement.textContent);
    
                // Verificar si hay suficiente stock
                if (stock >= cantidad) {
                    // Actualizar la cantidad en el elemento HTML
                    quantityElement.textContent = cantidad;
    
                    // Datos que se enviarán al servidor
                    
                    const data = {
                        productoId: productoId,
                        cantidad: cantidad,
                    };
    
                    // Enviar datos al servidor
                    fetch('/carrito-elementos/add', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.insertProductToCartResult) {
                            alert("Mensaje: " + data.message + "\nProducto ID: " + data.productoId + "\nCantidad: " + data.cantidad);
                        } else {
                            alert("Mensaje: " + data.message);
                        }
                    })
                    .catch(error => {
                        console.error('Error al enviar datos:', error);
                    });
                } else {
                    console.error(`Se alcanzó la cantidad máxima de las unidades en Stock para el elemento con ID ${productId_stock}.`);
                    alert('Se alcanzó la cantidad máxima de las unidades en Stock!! ');
                }
            } catch (error) {
                console.error('Error al verificar el stock:', error.message);
            }
        };
    
    
    });
    

            
            
            

            

            




