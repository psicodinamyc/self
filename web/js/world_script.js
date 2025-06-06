// Auto-expand textareas
function autoExpand(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = (textarea.scrollHeight) + 'px';
}

// Apply to all textareas
document.querySelectorAll('textarea').forEach(textarea => {
    autoExpand(textarea);
    textarea.classList.add('auto-expand');
    textarea.addEventListener('input', function() {
        autoExpand(this);
    });
});

// Calculate age function
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

// Generate Word document
async function generateWordDocument() {
    const { Document, Paragraph, TextRun, HeadingLevel, Packer } = docx;
    
    // Collect form data
    const formData = collectFormData();
    
    // Create document
    const doc = new Document({
        sections: [{
            properties: {},
            children: [
                // Header
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
                
                // Doctor info
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
                new Paragraph(""),
                
                // Continue with all sections as in your original script
                // For brevity, I'm showing the pattern for the first section
                
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
                
                // General data
                new Paragraph(`Lugar de evaluación: ${formData['Lugar de evaluación'] || 'No especificado'}`),
                new Paragraph(`Fecha de evaluación: ${formData['Fecha de evaluación'] || 'No especificada'}`),
                new Paragraph(`Modalidad: ${formData['Modalidad'] || 'No especificada'}`),
                new Paragraph(`Código del paciente: ${formData['Código del paciente'] || 'No especificado'}`),
                
                // Continue with all other fields...
                
                // Signature section
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
                new Paragraph("Dr. Mauricio Villamandos - MP: 07489"),
                new Paragraph(""),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "[HCPE] v2.0 © 2025 - [Historia Clínica Psiquiátrica Electrónica]",
                            bold: true
                        })
                    ]
                })
            ]
        }]
    });
    
    // Generate and download document
    Packer.toBlob(doc).then(blob => {
        saveAs(blob, `Historia_Clinica_${formData['Nombre'] || 'Paciente'}.docx`);
    });
}

// Collect form data
function collectFormData() {
    const formData = {};
    
    document.querySelectorAll('input, select, textarea').forEach(element => {
        const label = element.closest('.mb-3')?.querySelector('label')?.textContent?.trim() || 
                      element.closest('.form-check')?.querySelector('label')?.textContent?.trim() || '';
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

// Set up print button
document.addEventListener('DOMContentLoaded', function() {
    const printBtn = document.querySelector('.btn-print');
    if (printBtn) {
        printBtn.addEventListener('click', generateWordDocument);
    }
});