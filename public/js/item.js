// script.js

document.addEventListener('DOMContentLoaded', function () {
    // Variables
    const counterElement = document.getElementById('counter');
    let counterValue = 1; // Valor inicial del contador

    // Funciones
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

    // Función para agregar al carrito
    window.addToCart = function () {
        // Aquí puedes agregar la lógica para agregar al carrito
        // Puedes utilizar counterValue para obtener la cantidad seleccionada
        // y productoSeleccionado para obtener la información del producto
        alert(`Agregado ${counterValue} ${productoSeleccionado.nombre} al carrito`);
    };
});

// document.addEventListener('DOMContentLoaded', function () {
//     // Variables
//     const decrementButton = document.getElementById('decrement');
//     const incrementButton = document.getElementById('increment');
//     const counterElement = document.getElementById('counter');
//     const addToCartButton = document.getElementById('addToCart');
//     let counterValue = 1; // Valor inicial del contador

//     // Funciones
//     function updateCounterDisplay() {
//         counterElement.textContent = counterValue;
//     }

//     // Evento para decrementar
//     decrementButton.addEventListener('click', function () {
//         if (counterValue > 1) {
//             counterValue--;
//             updateCounterDisplay();
//         }
//     });

//     // Evento para incrementar
//     incrementButton.addEventListener('click', function () {
//         counterValue++;
//         updateCounterDisplay();
//     });

//     // Evento para agregar al carrito
//     addToCartButton.addEventListener('click', function () {
//         // Aquí puedes agregar la lógica para agregar al carrito
//         // Puedes utilizar counterValue para obtener la cantidad seleccionada
//         // y productoSeleccionado para obtener la información del producto
//         alert(`Agregado ${counterValue} ${productoSeleccionado.nombre} al carrito`);
//     });
// });
