

document.addEventListener('click', function(e) {
    const cartLink = document.getElementById('cartLink');
    if (cartLink && e.target === cartLink) {
        mostrarAlerta();
    }
});


// mostrarAlerta.js
function mostrarAlerta() {
    alert('Debe estar logueado para ver su carrito');
}
