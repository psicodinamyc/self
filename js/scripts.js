document.addEventListener('DOMContentLoaded', function() {
    // Manejar botones de navegación
    const btnPrev = document.querySelector('.btn-prev');
    const btnNext = document.querySelector('.btn-next');
    
    if (btnPrev) {
        btnPrev.addEventListener('click', function() {
            // Lógica para ir a la parte anterior
            const currentPart = window.location.pathname.match(/parte(\d+)\.html/)[1];
            if (currentPart > 1) {
                window.location.href = `parte${parseInt(currentPart)-1}.html`;
            }
        });
    }
    
    if (btnNext) {
        btnNext.addEventListener('click', function() {
            // Lógica para ir a la siguiente parte
            const currentPart = window.location.pathname.match(/parte(\d+)\.html/)[1];
            if (currentPart < 5) {
                window.location.href = `parte${parseInt(currentPart)+1}.html`;
            }
        });
    }
    
    // Manejar botón de impresión
    const btnPrint = document.querySelector('.btn-print');
    if (btnPrint) {
        btnPrint.addEventListener('click', function() {
            window.print();
        });
    }
    
    // Manejar botón de guardar
    const btnSave = document.querySelector('.btn-save');
    if (btnSave) {
        btnSave.addEventListener('click', function() {
            // Aquí iría la lógica para guardar los datos
            alert('Los datos han sido guardados (simulación)');
            
            // En una implementación real, esto enviaría los datos a un servidor
            // const formData = new FormData(document.querySelector('form'));
            // fetch('/guardar-historia', { method: 'POST', body: formData })
            //     .then(response => response.json())
            //     .then(data => alert('Datos guardados correctamente'));
        });
    }
    
    // Mostrar/ocultar campos según selecciones
    document.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(input => {
        input.addEventListener('change', function() {
            // Lógica para mostrar/ocultar campos relacionados
            const parentGroup = this.closest('.form-group');
            if (parentGroup) {
                const observation = parentGroup.querySelector('textarea');
                if (observation) {
                    if (this.checked) {
                        observation.style.display = 'block';
                    } else {
                        // Verificar si hay otras opciones seleccionadas en el mismo grupo
                        const anyChecked = Array.from(parentGroup.querySelectorAll('input[type="radio"], input[type="checkbox"]'))
                            .some(i => i.checked);
                        
                        if (!anyChecked) {
                            observation.style.display = 'none';
                        }
                    }
                }
            }
        });
    });
    
    // Inicializar visibilidad de campos de observación
    document.querySelectorAll('.form-group').forEach(group => {
        const observation = group.querySelector('textarea');
        if (observation) {
            const anyChecked = Array.from(group.querySelectorAll('input[type="radio"], input[type="checkbox"]'))
                .some(i => i.checked);
            
            observation.style.display = anyChecked ? 'block' : 'none';
        }
    });

    // Función para actualizar puntaje cuando se selecciona un rango
    const scoreInput = document.querySelector('input[type="number"]');
    const scoreSelect = document.querySelector('select.form-control');
    
    if (scoreSelect && scoreInput) {
        scoreSelect.addEventListener('change', function() {
            const selectedValue = this.value;
            if (selectedValue) {
                const score = selectedValue.split('-')[0];
                scoreInput.value = score;
            } else {
                scoreInput.value = '';
            }
        });
    }
});