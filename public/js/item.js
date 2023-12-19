document.addEventListener('DOMContentLoaded', function () {

    const counterElement = document.getElementById('counter');
    let counterValue = 1; 

    function updateCounterDisplay() {
        counterElement.textContent = counterValue;
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



    // Función para agregar al carrito
    window.addToCart = function (idProduct, precio,) {
        // cantidad seleccionada
        const cantidadInput = document.getElementById('cantidad');
        const cantidad = counterValue;
        // producto
        const precioUnitario = precio;
        console.log('precioUnitario', precioUnitario);
        const productoId = idProduct;
        
        // asegurarse de que la cantidad sea un número positivo
        if (isNaN(cantidad) || cantidad <= 0) {
            alert('Por favor, ingresa una cantidad válida.');
            return;
        }

        // Datos que se enviarán al servidor
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
            if (data.cantidad > -1){
                alert("Mensaje: " + data.message + "\nCantidad: " + data.cantidad);
            } else {
                alert("Mensaje: " + data.message );
            }
           
        })
        .catch(error => {
            console.error('Error al enviar datos:', error);
        });
    };
});



       
        
    
       



