document.addEventListener('DOMContentLoaded', function (e) {
    function updateFileLabel(input, labelId) {
        const label = document.getElementById(labelId);
        if (input.files.length > 0) {
            label.textContent = input.files[0].name; // Muestra el nombre del archivo seleccionado
        }
    }
});

async function handleSubmit() {
    event.preventDefault();

    const response = await fetch('/productos/edit', {
      method: 'POST',
      body: new FormData(document.getElementById('editar-producto-form')),
    });

    const responseData = await response.json();
    handleServerResponse(responseData);
  }

  function handleServerResponse(response) {
    if (response.message) {
      showAlert(response.message);
    } else {
      showAlert('Error desconocido en el servidor');
    }
  }
  
  function showAlert(message) {
    alert(message);
  }


