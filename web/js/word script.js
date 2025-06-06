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

document.addEventListener('DOMContentLoaded', function() {
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
                
                // Contactos de referencia
                new Paragraph(`Referente 1: ${formData['Referente 1'] || 'No especificado'}`),
                new Paragraph(`Contacto: ${formData['Contacto'] || 'No especificado'}`),
                new Paragraph(`Relación: ${formData['Relación'] || 'No especificada'}`),
                new Paragraph(`Psicólogo/a: ${formData['Psicólogo/a'] || 'No especificado'}`),
                new Paragraph(`Observaciones: ${formData['Observaciones'] || 'Ninguna'}`),
                
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
                
                // 4. ANTECEDENTES PSIQUIÁTRICOS
                new Paragraph({
                    heading: HeadingLevel.HEADING_2,
                    children: [
                        new TextRun({
                            text: "4. ANTECEDENTES PSIQUIÁTRICOS",
                            bold: true
                        })
                    ]
                }),
                new Paragraph(`Diagnósticos/Presuntivos previos: ${formData['Diagnósticos/Presuntivos previos'] || 'Ninguno'}`),
                new Paragraph(`Hospitalizaciones psiquiátricas previas: ${formData['Hospitalizaciones psiquiátricas previas'] || 'No'}`),
                new Paragraph(`Detalles hospitalizaciones: ${formData['Detalles hospitalizaciones'] || 'Ninguno'}`),
                new Paragraph(`Intentos de suicidio previos: ${formData['Intentos de suicidio previos'] || 'No'}`),
                new Paragraph(`Detalles intentos suicidio: ${formData['Detalles intentos suicidio'] || 'Ninguno'}`),
                new Paragraph(`Número de intentos: ${formData['Número de intentos'] || '0'}`),
                new Paragraph(`Método utilizado: ${formData['Método utilizado'] || 'No especificado'}`),
                new Paragraph(`Último intento: ${formData['Último intento'] || 'No especificado'}`),
                new Paragraph(`Tratamientos previos: ${formData['Tratamientos previos'] || 'Ninguno'}`),
                new Paragraph(`Medicación y/o esquemas utilizados: ${formData['Medicación y/o esquemas utilizados'] || 'Ninguno'}`),
                new Paragraph(`Otros tratamientos: ${formData['Otros tratamientos'] || 'Ninguno'}`),
                
                // 5. ANTECEDENTES MÉDICOS
                new Paragraph({
                    heading: HeadingLevel.HEADING_2,
                    children: [
                        new TextRun({
                            text: "5. ANTECEDENTES MÉDICOS",
                            bold: true
                        })
                    ]
                }),
                new Paragraph(`Enfermedades médicas Agudas/Semi Agudas: ${formData['Enfermedades médicas Agudas/Semi Agudas'] || 'No'}`),
                new Paragraph(`Detalles enfermedades: ${formData['Detalles enfermedades'] || 'Ninguno'}`),
                new Paragraph(`Cirugías previas: ${formData['Cirugías previas'] || 'No'}`),
                new Paragraph(`Detalles cirugías: ${formData['Detalles cirugías'] || 'Ninguno'}`),
                new Paragraph(`Alergias: ${formData['Alergias'] || 'No'}`),
                new Paragraph(`Detalles alergias: ${formData['Detalles alergias'] || 'Ninguno'}`),
                new Paragraph(`Consumo de sustancias: ${formData['Consumo de sustancias'] || 'No'}`),
                new Paragraph(`Alcohol: ${formData['Alcohol'] || 'No'}`),
                new Paragraph(`Opiáceos: ${formData['Opiáceos'] || 'No'}`),
                new Paragraph(`Drogas ilícitas: ${formData['Drogas ilícitas'] || 'No'}`),
                new Paragraph(`Tipo drogas: ${formData['Tipo drogas'] || 'No especificado'}`),
                new Paragraph(`Antecedentes Ginecoobstetricos: ${formData['Antecedentes Ginecoobstetricos'] || 'No aplica'}`),
                
                // 6. ANTECEDENTES FAMILIARES
                new Paragraph({
                    heading: HeadingLevel.HEADING_2,
                    children: [
                        new TextRun({
                            text: "6. ANTECEDENTES FAMILIARES",
                            bold: true
                        })
                    ]
                }),
                new Paragraph(`Historia de enfermedad psiquiátrica en la familia: ${formData['Historia de enfermedad psiquiátrica en la familia'] || 'No'}`),
                new Paragraph(`Historia de suicidio en la familia: ${formData['Historia de suicidio en la familia'] || 'No'}`),
                new Paragraph(`Parentesco suicidio: ${formData['Parentesco suicidio'] || 'No aplica'}`),
                new Paragraph(`Historia de consumo de sustancias: ${formData['Historia de consumo de sustancias'] || 'No'}`),
                new Paragraph(`Parentesco consumo sustancias: ${formData['Parentesco consumo sustancias'] || 'No aplica'}`),
                
                // 7. HISTORIA PSICOSOCIAL
                new Paragraph({
                    heading: HeadingLevel.HEADING_2,
                    children: [
                        new TextRun({
                            text: "7. HISTORIA PSICOSOCIAL",
                            bold: true
                        })
                    ]
                }),
                new Paragraph(`Dinámica familiar actual: ${formData['Dinámica familiar actual'] || 'No especificada'}`),
                new Paragraph(`Red de apoyo: ${formData['Red de apoyo'] || 'No especificada'}`),
                new Paragraph(`Eventos vitales estresantes recientes: ${formData['Eventos vitales estresantes recientes'] || 'Ninguno'}`),
                
                // 8. EXPLORACIÓN PSICOPATOLÓGICA
                new Paragraph({
                    heading: HeadingLevel.HEADING_2,
                    children: [
                        new TextRun({
                            text: "8. EXPLORACIÓN PSICOPATOLÓGICA",
                            bold: true
                        })
                    ]
                }),
                
                // Apariencia y conducta
                new Paragraph({
                    heading: HeadingLevel.HEADING_3,
                    children: [
                        new TextRun({
                            text: "Apariencia y conducta",
                            bold: true
                        })
                    ]
                }),
                new Paragraph(`Higiene y arreglo personal: ${formData['Higiene y arreglo personal'] || 'No especificado'}`),
                new Paragraph(`Observaciones higiene: ${formData['Observaciones higiene'] || 'Ninguna'}`),
                new Paragraph(`Actitud hacia el examinador: ${formData['Actitud hacia el examinador'] || 'No especificada'}`),
                new Paragraph(`Observaciones actitud: ${formData['Observaciones actitud'] || 'Ninguna'}`),
                new Paragraph(`Expresión facial: ${formData['Expresión facial'] || 'No especificada'}`),
                new Paragraph(`Observaciones expresión: ${formData['Observaciones expresión'] || 'Ninguna'}`),
                new Paragraph(`Conducta general durante la entrevista: ${formData['Conducta general durante la entrevista'] || 'No especificada'}`),
                new Paragraph(`Observaciones conducta: ${formData['Observaciones conducta'] || 'Ninguna'}`),
                
                // Estado de ánimo y afecto
                new Paragraph({
                    heading: HeadingLevel.HEADING_3,
                    children: [
                        new TextRun({
                            text: "Estado de ánimo y afecto",
                            bold: true
                        })
                    ]
                }),
                new Paragraph(`Estado de Ánimo: ${formData['Estado de Ánimo'] || 'No especificado'}`),
                new Paragraph(`Observaciones ánimo: ${formData['Observaciones ánimo'] || 'Ninguna'}`),
                new Paragraph(`Afecto: ${formData['Afecto'] || 'No especificado'}`),
                new Paragraph(`Observaciones afecto: ${formData['Observaciones afecto'] || 'Ninguna'}`),
                
                // Forma del pensamiento
                new Paragraph({
                    heading: HeadingLevel.HEADING_3,
                    children: [
                        new TextRun({
                            text: "Forma del pensamiento",
                            bold: true
                        })
                    ]
                }),
                new Paragraph(`Forma del pensamiento: ${formData['Forma del pensamiento'] || 'No especificada'}`),
                new Paragraph(`Observaciones forma pensamiento: ${formData['Observaciones forma pensamiento'] || 'Ninguna'}`),
                new Paragraph(`Velocidad del pensamiento: ${formData['Velocidad del pensamiento'] || 'No especificada'}`),
                new Paragraph(`Observaciones velocidad pensamiento: ${formData['Observaciones velocidad pensamiento'] || 'Ninguna'}`),
                new Paragraph(`Curso del pensamiento: ${formData['Curso del pensamiento'] || 'No especificado'}`),
                new Paragraph(`Observaciones curso pensamiento: ${formData['Observaciones curso pensamiento'] || 'Ninguna'}`),
                new Paragraph(`Contenido del pensamiento: ${formData['Contenido del pensamiento'] || 'No especificado'}`),
                new Paragraph(`Observaciones contenido pensamiento: ${formData['Observaciones contenido pensamiento'] || 'Ninguna'}`),
                
                // Sensopercepción
                new Paragraph({
                    heading: HeadingLevel.HEADING_3,
                    children: [
                        new TextRun({
                            text: "Sensopercepción",
                            bold: true
                        })
                    ]
                }),
                new Paragraph(`Alucinaciones: ${formData['Alucinaciones'] || 'No'}`),
                new Paragraph(`Observaciones alucinaciones: ${formData['Observaciones alucinaciones'] || 'Ninguna'}`),
                new Paragraph(`Pseudoalucinaciones: ${formData['Pseudoalucinaciones'] || 'No'}`),
                new Paragraph(`Observaciones pseudoalucinaciones: ${formData['Observaciones pseudoalucinaciones'] || 'Ninguna'}`),
                new Paragraph(`Ilusiones: ${formData['Ilusiones'] || 'No'}`),
                new Paragraph(`Observaciones ilusiones: ${formData['Observaciones ilusiones'] || 'Ninguna'}`),
                new Paragraph(`Despersonalización: ${formData['Despersonalización'] || 'No'}`),
                new Paragraph(`Observaciones despersonalización: ${formData['Observaciones despersonalización'] || 'Ninguna'}`),
                new Paragraph(`Desrealización: ${formData['Desrealización'] || 'No'}`),
                new Paragraph(`Observaciones desrealización: ${formData['Observaciones desrealización'] || 'Ninguna'}`),
                
                // Orientación
                new Paragraph({
                    heading: HeadingLevel.HEADING_3,
                    children: [
                        new TextRun({
                            text: "Orientación",
                            bold: true
                        })
                    ]
                }),
                new Paragraph(`Orientación en tiempo: ${formData['Orientación en tiempo'] || 'No especificada'}`),
                new Paragraph(`Observaciones tiempo: ${formData['Observaciones tiempo'] || 'Ninguna'}`),
                new Paragraph(`Orientación en espacio: ${formData['Orientación en espacio'] || 'No especificada'}`),
                new Paragraph(`Observaciones espacio: ${formData['Observaciones espacio'] || 'Ninguna'}`),
                new Paragraph(`Orientación personal: ${formData['Orientación personal'] || 'No especificada'}`),
                new Paragraph(`Observaciones personal: ${formData['Observaciones personal'] || 'Ninguna'}`),
                new Paragraph(`Orientación social: ${formData['Orientación social'] || 'No especificada'}`),
                new Paragraph(`Observaciones social: ${formData['Observaciones social'] || 'Ninguna'}`),
                
                // Atención y concentración
                new Paragraph({
                    heading: HeadingLevel.HEADING_3,
                    children: [
                        new TextRun({
                            text: "Atención y concentración",
                            bold: true
                        })
                    ]
                }),
                new Paragraph(`Atención: ${formData['Atención'] || 'No especificada'}`),
                new Paragraph(`Observaciones atención: ${formData['Observaciones atención'] || 'Ninguna'}`),
                new Paragraph(`Concentración: ${formData['Concentración'] || 'No especificada'}`),
                new Paragraph(`Observaciones concentración: ${formData['Observaciones concentración'] || 'Ninguna'}`),
                
                // Memoria
                new Paragraph({
                    heading: HeadingLevel.HEADING_3,
                    children: [
                        new TextRun({
                            text: "Memoria",
                            bold: true
                        })
                    ]
                }),
                new Paragraph(`Memoria Inmediata: ${formData['Memoria Inmediata'] || 'No especificada'}`),
                new Paragraph(`Observaciones memoria inmediata: ${formData['Observaciones memoria inmediata'] || 'Ninguna'}`),
                new Paragraph(`Memoria reciente: ${formData['Memoria reciente'] || 'No especificada'}`),
                new Paragraph(`Observaciones memoria reciente: ${formData['Observaciones memoria reciente'] || 'Ninguna'}`),
                new Paragraph(`Memoria remota: ${formData['Memoria remota'] || 'No especificada'}`),
                new Paragraph(`Observaciones memoria remota: ${formData['Observaciones memoria remota'] || 'Ninguna'}`),
                
                // Voluntad
                new Paragraph({
                    heading: HeadingLevel.HEADING_3,
                    children: [
                        new TextRun({
                            text: "Voluntad",
                            bold: true
                        })
                    ]
                }),
                new Paragraph(`Iniciativa: ${formData['Iniciativa'] || 'No especificada'}`),
                new Paragraph(`Observaciones iniciativa: ${formData['Observaciones iniciativa'] || 'Ninguna'}`),
                new Paragraph(`Perseverancia: ${formData['Perseverancia'] || 'No especificada'}`),
                new Paragraph(`Observaciones perseverancia: ${formData['Observaciones perseverancia'] || 'Ninguna'}`),
                new Paragraph(`Interés en actividades previas: ${formData['Interés en actividades previas'] || 'No especificado'}`),
                new Paragraph(`Observaciones interés actividades: ${formData['Observaciones interés actividades'] || 'Ninguna'}`),
                
                // Psicomotricidad
                new Paragraph({
                    heading: HeadingLevel.HEADING_3,
                    children: [
                        new TextRun({
                            text: "Psicomotricidad",
                            bold: true
                        })
                    ]
                }),
                new Paragraph(`Actividad motora global: ${formData['Actividad motora global'] || 'No especificada'}`),
                new Paragraph(`Observaciones actividad motora: ${formData['Observaciones actividad motora'] || 'Ninguna'}`),
                new Paragraph(`Postura: ${formData['Postura'] || 'No especificada'}`),
                new Paragraph(`Observaciones postura: ${formData['Observaciones postura'] || 'Ninguna'}`),
                new Paragraph(`Movimientos involuntarios / anómalos: ${formData['Movimientos involuntarios / anómalos'] || 'No'}`),
                new Paragraph(`Observaciones movimientos: ${formData['Observaciones movimientos'] || 'Ninguna'}`),
                
                // Juicio e introspección
                new Paragraph({
                    heading: HeadingLevel.HEADING_3,
                    children: [
                        new TextRun({
                            text: "Juicio e introspección",
                            bold: true
                        })
                    ]
                }),
                new Paragraph(`Juicio: ${formData['Juicio'] || 'No especificado'}`),
                new Paragraph(`Observaciones juicio: ${formData['Observaciones juicio'] || 'Ninguna'}`),
                new Paragraph(`Tipos clásicos de alteración del juicio: ${formData['Tipos clásicos de alteración del juicio'] || 'No aplica'}`),
                new Paragraph(`Observaciones tipos juicio: ${formData['Observaciones tipos juicio'] || 'Ninguna'}`),
                new Paragraph(`Introspección: ${formData['Introspección'] || 'No especificada'}`),
                new Paragraph(`Observaciones introspección: ${formData['Observaciones introspección'] || 'Ninguna'}`),
                
                // 9. DIAGNÓSTICO MULTIAXIAL
                new Paragraph({
                    heading: HeadingLevel.HEADING_2,
                    children: [
                        new TextRun({
                            text: "9. DIAGNÓSTICO MULTIAXIAL – CIE-10 / DSM 5",
                            bold: true
                        })
                    ]
                }),
                
                // Eje I
                new Paragraph({
                    heading: HeadingLevel.HEADING_3,
                    children: [
                        new TextRun({
                            text: "❖ Eje I: Trastornos clínicos principales",
                            bold: true
                        })
                    ]
                }),
                new Paragraph(`CÓDIGO: ${formData['CÓDIGO Eje I'] || 'No especificado'}`),
                new Paragraph(`Observación: ${formData['Observación Eje I'] || 'No especificada'}`),
                
                // Eje II
                new Paragraph({
                    heading: HeadingLevel.HEADING_3,
                    children: [
                        new TextRun({
                            text: "❖ Eje II: Discapacidad mental y trastornos del desarrollo",
                            bold: true
                        })
                    ]
                }),
                new Paragraph(`CÓDIGO: ${formData['CÓDIGO Eje II'] || 'No especificado'}`),
                new Paragraph(`Observación: ${formData['Observación Eje II'] || 'No especificada'}`),
                
                // Eje III
                new Paragraph({
                    heading: HeadingLevel.HEADING_3,
                    children: [
                        new TextRun({
                            text: "❖ Eje III: Enfermedades médicas generales relevantes",
                            bold: true
                        })
                    ]
                }),
                new Paragraph(`CÓDIGO: ${formData['CÓDIGO Eje III'] || 'No especificado'}`),
                new Paragraph(`Observación: ${formData['Observación Eje III'] || 'No especificada'}`),
                
                // Eje IV
                new Paragraph({
                    heading: HeadingLevel.HEADING_3,
                    children: [
                        new TextRun({
                            text: "❖ Eje IV: Factores psicosociales y ambientales",
                            bold: true
                        })
                    ]
                }),
                new Paragraph(`CÓDIGO: ${formData['CÓDIGO Eje IV'] || 'No especificado'}`),
                new Paragraph(`Observación: ${formData['Observación Eje IV'] || 'No especificada'}`),
                
                // Eje V
                new Paragraph({
                    heading: HeadingLevel.HEADING_3,
                    children: [
                        new TextRun({
                            text: "❖ Eje V: Nivel global de funcionamiento",
                            bold: true
                        })
                    ]
                }),
                new Paragraph(`Puntaje (0-100): ${formData['Puntaje Eje V'] || 'No especificado'}`),
                new Paragraph(`Escala GAF/WHODAS: ${formData['Escala GAF/WHODAS'] || 'No especificada'}`),
                new Paragraph(`Observación: ${formData['Observación Eje V'] || 'No especificada'}`),
                
                // 10. PLAN DE TRATAMIENTO
                new Paragraph({
                    heading: HeadingLevel.HEADING_2,
                    children: [
                        new TextRun({
                            text: "10. PLAN DE TRATAMIENTO",
                            bold: true
                        })
                    ]
                }),
                new Paragraph(`Tipos: ${formData['Tipos tratamiento'] || 'No especificado'}`),
                new Paragraph(`Observaciones tipos: ${formData['Observaciones tipos tratamiento'] || 'Ninguna'}`),
                new Paragraph(`Frecuencia de seguimiento: ${formData['Frecuencia de seguimiento'] || 'No especificada'}`),
                new Paragraph(`Observaciones frecuencia: ${formData['Observaciones frecuencia'] || 'Ninguna'}`),
                new Paragraph(`PRONÓSTICO: ${formData['PRONÓSTICO'] || 'No especificado'}`),
                new Paragraph(`Observaciones pronóstico: ${formData['Observaciones pronóstico'] || 'Ninguna'}`),
                new Paragraph(`Reevaluación: ${formData['Reevaluación'] || 'No especificada'}`),
                new Paragraph(`Observaciones reevaluación: ${formData['Observaciones reevaluación'] || 'Ninguna'}`),
                new Paragraph(`Fecha próxima consulta: ${formData['Fecha próxima consulta'] || 'No especificada'}`),
                new Paragraph(`Observaciones próxima consulta: ${formData['Observaciones próxima consulta'] || 'Ninguna'}`),
                
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