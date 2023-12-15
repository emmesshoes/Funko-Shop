console.log('header.js loaded');

document.addEventListener('click', function(e) {
    const cartLink = document.getElementById('cartLink');
    if (cartLink && e.target === cartLink) {
        mostrarAlerta();
    }
});


// mostrarAlerta.js
function mostrarAlerta() {
   
    console.log('SOY LA FUNCION MOSTRAR ALERTA');
    alert('Debe estar logueado para ver su carrito');
}
