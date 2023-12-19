document.addEventListener('DOMContentLoaded', function () {
    let counterValue = 1;

    function updateCounterDisplay(productId) {
        const counterElement = document.getElementById(`counter-${productId}`);
        if (counterElement) {
            counterElement.textContent = counterValue;
        }
    }

    window.decrement = function () {
        if (counterValue > 1) {
            counterValue--;
            updateCounterDisplay();
        }
    };

    window.increment = function () {
        counterValue++;
        updateCounterDisplay();
    };

    window.addToCart = function (idProduct, precio) {
        const cantidadInput = document.getElementById('cantidad');
        const cantidad = counterValue;
        const precioUnitario = precio;
        const productoId = idProduct;

        if (isNaN(cantidad) || cantidad <= 0) {
            alert('Por favor, ingresa una cantidad válida.');
            return;
        }

        const data = {
            productoId: productoId,
            cantidad: cantidad,
        };

        fetch('/carrito-elementos/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.insertProductToCartResult){
                alert("Mensaje: " + data.message + "\nProducto ID: " + data.productoId + "\nCantidad: " + data.cantidad);
            } else {
                alert("Mensaje: " + data.message );
            }
        })
        .catch(error => {
            console.error('Error al enviar datos:', error);
        });
    };
});
