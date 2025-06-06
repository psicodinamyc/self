
// Imprimir el formulario
function imprimirFormulario() {
    window.print();
}

// Validar campos requeridos (puede personalizarse más)
function validarFormulario() {
    const inputs = document.querySelectorAll('input[required], textarea[required], select[required]');
    let valido = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = 'red';
            valido = false;
        } else {
            input.style.borderColor = '#ccc';
        }
    });

    if (!valido) {
        alert('Por favor, completá todos los campos obligatorios.');
    }

    return valido;
}

// Mostrar/ocultar secciones si hay colapsables
function toggleSeccion(id) {
    const seccion = document.getElementById(id);
    if (seccion) {
        seccion.style.display = (seccion.style.display === 'none') ? 'block' : 'none';
    }
}

function calcularEdad(fechaNacimiento) {
    if (!fechaNacimiento) return; // Si no hay fecha, no hace nada

    // Convierte la fecha a un objeto Date
    const fechaNac = new Date(fechaNacimiento);
    const hoy = new Date();

    // Calcula la diferencia de años
    let edad = hoy.getFullYear() - fechaNac.getFullYear();

    // Ajusta si aún no ha pasado el cumpleaños este año
    const mesActual = hoy.getMonth();
    const mesNac = fechaNac.getMonth();
    if (
        mesNac > mesActual || 
        (mesNac === mesActual && hoy.getDate() < fechaNac.getDate())
    ) {
        edad--;
    }

    // Muestra la edad en el campo
    document.getElementById('edad').value = `${edad} años`;
}

// Carga las secciones dinámicamente
document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario-hcpe');
    
    // Secciones del formulario (puedes cargarlas desde un JSON o API)
    const secciones = [
        { titulo: "Datos del Paciente", campos: ["nombre", "apellido", "dni", "edad"] },
        { titulo: "Antecedentes", campos: ["tratamientos", "estudios"] }
    ];

    // Genera el HTML dinámico
    secciones.forEach(seccion => {
        const html = `
            <div class="seccion">
                <h2>${seccion.titulo}</h2>
                ${seccion.campos.map(campo => `
                    <div class="campo">
                        <label for="${campo}">${campo.toUpperCase()}:</label>
                        <input type="text" id="${campo}" name="${campo}">
                    </div>
                `).join('')}
            </div>
        `;
        formulario.innerHTML += html;
    });
});

function autoExpand(textarea) {
    // Reset height to get correct scrollHeight
    textarea.style.height = 'auto';
    // Set new height based on content
    textarea.style.height = (textarea.scrollHeight) + 'px';
}

// Aplicar a todos los textareas
document.querySelectorAll('textarea').forEach(textarea => {
    // Aplicar al cargar la página
    autoExpand(textarea);
    
    // Aplicar al escribir
    textarea.addEventListener('input', function() {
        autoExpand(this);
    });
});

ocument.addEventListener('DOMContentLoaded', function() {
    // Configurar el botón de imprimir
    const printBtn = document.querySelector('.btn-print');
    printBtn.addEventListener('click', generateWordDocument);
    
    // Función para calcular la edad (si no está ya en tu script)
    window.calcularEdad = function(fechaNacimiento) {
        const fechaNac = new Date(fechaNacimiento);
        const hoy = new Date();
        let edad = hoy.getFullYear() - fechaNac.getFullYear();
        const mes = hoy.getMonth() - fechaNac.getMonth();
        
        if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
            edad--;
        }
        
        document.getElementById('edad').value = edad + ' años';
        return edad;
    };
});

async function generateWordDocument() {
    const { Document, Paragraph, TextRun, HeadingLevel, Packer } = docx;
    
    // Obtener todos los valores del formulario
    const formData = collectFormData();
    
    // Crear el documento Word
    const doc = new Document({
        sections: [{
            properties: {},
            children: [
                // Encabezado
                new Paragraph({
                    heading: HeadingLevel.HEADING_1,
                    children: [
                        new TextRun({
                            text: "HISTORIA CLÍNICA PSIQUIÁTRICA",
                            bold: true,
                            size: 28
                        })
                    ]
                }),
                
                // Información del doctor
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Dr. Mauricio Villamandos - Médico Especialista en Psiquiatría - MP: 07489",
                            bold: true
                        })
                    ]
                }),
                new Paragraph("Posadas, Misiones – Argentina"),
                new Paragraph("infopsicodinamyc@gmail.com | Teléfono: 3765 041832"),
                
                // Espacio
                new Paragraph(""),
                
                // 1. DATOS GENERALES
                new Paragraph({
                    heading: HeadingLevel.HEADING_2,
                    children: [
                        new TextRun({
                            text: "1. DATOS GENERALES",
                            bold: true
                        })
                    ]
                }),
                
                // Datos de evaluación
                new Paragraph(`Lugar de evaluación: ${formData['Lugar de evaluación'] || 'No especificado'}`),
                new Paragraph(`Fecha de evaluación: ${formData['Fecha de evaluación'] || 'No especificada'}`),
                new Paragraph(`Modalidad: ${formData['Modalidad'] || 'No especificada'}`),
                new Paragraph(`Código del paciente: ${formData['Código del paciente'] || 'No especificado'}`),
                
                // Datos personales
                new Paragraph(`Nombre: ${formData['Nombre'] || 'No especificado'} ${formData['Apellido'] || ''}`),
                new Paragraph(`DNI: ${formData['DNI'] || 'No especificado'}`),
                new Paragraph(`Nacionalidad: ${formData['Nacionalidad'] || 'No especificada'}`),
                new Paragraph(`Sexo/género: ${formData['Sexo/género'] || 'No especificado'}`),
                new Paragraph(`Fecha de nacimiento: ${formData['fecha-nacimiento'] || 'No especificada'}`),
                new Paragraph(`Edad actual: ${formData['edad'] || 'No especificada'}`),
                new Paragraph(`Estado civil: ${formData['Estado civil'] || 'No especificado'}`),
                
                // Información de contacto
                new Paragraph(`Domicilio: ${formData['Domicilio'] || 'No especificado'}`),
                new Paragraph(`C.P.: ${formData['C.P.'] || 'No especificado'}`),
                new Paragraph(`Celular: ${formData['Celular'] || 'No especificado'}`),
                new Paragraph(`Email: ${formData['Email'] || 'No especificado'}`),
                
                // Información profesional
                new Paragraph(`Ocupación: ${formData['Ocupación'] || 'No especificada'}`),
                new Paragraph(`Escolaridad: ${formData['Escolaridad'] || 'No especificada'}`),
                new Paragraph(`Obra social: ${formData['Obra social'] || 'No especificada'}`),
                new Paragraph(`Número: ${formData['Número'] || 'No especificado'}`),
                
                // 2. MOTIVO DE CONSULTA
                new Paragraph({
                    heading: HeadingLevel.HEADING_2,
                    children: [
                        new TextRun({
                            text: "2. MOTIVO DE CONSULTA",
                            bold: true
                        })
                    ]
                }),
                new Paragraph(formData['Motivo de consulta'] || 'No especificado'),
                
                // 3. ANTECEDENTES DE ENFERMEDAD ACTUAL
                new Paragraph({
                    heading: HeadingLevel.HEADING_2,
                    children: [
                        new TextRun({
                            text: "3. ANTECEDENTES DE ENFERMEDAD ACTUAL",
                            bold: true
                        })
                    ]
                }),
                new Paragraph(formData['Antecedentes de enfermedad actual'] || 'No especificado'),
                
                // Continúa con las demás secciones...
                // (Puedes agregar el resto de las secciones siguiendo el mismo patrón)
                
                // Firma
                new Paragraph(""),
                new Paragraph(""),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Firma y sello profesional",
                            bold: true
                        })
                    ]
                }),
                new Paragraph(""),
                new Paragraph("_________________________________________"),
                new Paragraph("Dr. Mauricio Villamandos - MP: 07489")
            ]
        }]
    });
    
    // Generar y descargar el documento
    Packer.toBlob(doc).then(blob => {
        saveAs(blob, `Historia_Clinica_${formData['Nombre'] || 'Paciente'}.docx`);
    });
}

function collectFormData() {
    const formData = {};
    
    // Recopilar datos de todos los campos del formulario
    document.querySelectorAll('input, select, textarea').forEach(element => {
        const label = element.closest('.form-group')?.querySelector('label')?.textContent?.trim() || '';
        let value = '';
        
        if (element.tagName === 'INPUT') {
            if (element.type === 'radio' || element.type === 'checkbox') {
                if (element.checked) {
                    value = element.value;
                }
            } else {
                value = element.value;
            }
        } else if (element.tagName === 'SELECT') {
            value = element.options[element.selectedIndex].text;
        } else if (element.tagName === 'TEXTAREA') {
            value = element.value;
        }
        
        if (label && value) {
            formData[label.replace(':', '').trim()] = value;
        }
    });
    
    return formData;
}