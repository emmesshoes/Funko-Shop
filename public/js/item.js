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

    window.addToCart = function () {
        alert(`Agregado ${counterValue} ${productoSeleccionado.nombre} al carrito`);
    };
});
