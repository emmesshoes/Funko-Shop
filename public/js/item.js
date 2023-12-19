document.addEventListener('DOMContentLoaded', function () {

    iniGlide();
    
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

    window.addToCart = async function (idProduct, precio) {
        const cantidadInput = document.getElementById('cantidad');
        const cantidad = counterValue;
        const precioUnitario = precio;
        const productoId = idProduct;

        if (isNaN(cantidad) || cantidad <= 0) {
            alert('Por favor, ingresa una cantidad válida.');
            return;
        }

        try {
            const result = await addToCartServerRequest(productoId, cantidad);
            if(result.resultCantidad === -1){
                alert(result.message);
            } else{
                alert(`Producto agregado al carrito. Nueva cantidad: ${result.resultCantidad}`);
            }
            
        } catch (error) {
            console.error('Error al agregar producto al carrito:', error);
            alert('Error al agregar producto al carrito. Por favor, inténtalo de nuevo.');
        }
    };

    async function addToCartServerRequest(productoId, cantidad) {
        const data = {
            productoId: productoId,
            cantidad: cantidad,
        };

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
        return responseData;
    }
});

// Inicializar el carrusel con los productos obtenidos
function iniGlide(){
    new Glide('.glide', {
        type: 'carousel',
        startAt: 0,
        perView: 3,
        gap: 30,
        breakpoints: {
            991: {
                perView: 2
            },
            768: {
                perView: 1
            }
        }
    }).mount();
}
    
    
