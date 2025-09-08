// Common JavaScript functionality for all pages

// Load components function
async function loadComponent(elementId, componentPath) {
  try {
    const response = await fetch(componentPath);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const html = await response.text();
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = html;
    }
  } catch (error) {
    console.error('Error loading component:', error);
  }
}

// Initialize all components
async function initializeComponents() {
  // Determine the base path based on current location
  const basePath = window.location.pathname.includes('/escalas/') ? '..' : '.';
  
  // Load components
  await Promise.all([
    loadComponent('navbar-container', `${basePath}/components/navbar.html`),
    loadComponent('header-container', `${basePath}/components/header.html`),
    loadComponent('footer-container', `${basePath}/components/footer.html`)
  ]);
  
  // Initialize Bootstrap components after loading
  if (typeof bootstrap !== 'undefined') {
    // Initialize dropdowns
    const dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
    dropdownElementList.map(function (dropdownToggleEl) {
      return new bootstrap.Dropdown(dropdownToggleEl);
    });
  }
  
  // Initialize dark mode
  initializeDarkMode();
  
  // Show HCPE actions if on HCPE page
  if (window.location.pathname.includes('hcpe.html') || window.location.pathname.includes('escalas/')) {
    const hcpeActions = document.getElementById('hcpeActions');
    if (hcpeActions) {
      hcpeActions.style.display = 'flex !important';
    }
  }
}

// Dark mode functionality
function initializeDarkMode() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;
  
  // Check for saved dark mode preference
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  if (isDarkMode) {
    body.classList.add('dark-mode');
    updateDarkModeIcon(true);
  }
  
  // Add event listener to toggle button
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', toggleDarkMode);
  }
}

function toggleDarkMode() {
  const body = document.body;
  const isDarkMode = body.classList.toggle('dark-mode');
  
  // Save preference
  localStorage.setItem('darkMode', isDarkMode);
  
  // Update icon
  updateDarkModeIcon(isDarkMode);
}

function updateDarkModeIcon(isDarkMode) {
  const icon = document.querySelector('#darkModeToggle i');
  if (icon) {
    icon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
  }
}

// Common functions for HCPE pages
function imprimirDocumento() {
  window.print();
}

function guardarDocumento() {
  // Basic save functionality - can be enhanced with actual backend integration
  const formData = new FormData();
  const inputs = document.querySelectorAll('input, select, textarea');
  
  inputs.forEach(input => {
    if (input.name || input.id) {
      formData.append(input.name || input.id, input.value);
    }
  });
  
  // For now, just save to localStorage
  const dataObject = {};
  for (let [key, value] of formData.entries()) {
    dataObject[key] = value;
  }
  
  localStorage.setItem('hcpe_data', JSON.stringify(dataObject));
  alert('Documento guardado localmente.');
}

function exportarAWord() {
  // Check if docx library is available
  if (typeof docx === 'undefined') {
    alert('La funcionalidad de exportar a Word no está disponible en esta página.');
    return;
  }
  
  // Use the existing exportarAWord function if available
  if (typeof window.exportarAWord === 'function') {
    window.exportarAWord();
  } else {
    alert('Función de exportación no disponible en esta página.');
  }
}

// Password toggle function for login page
function togglePassword() {
  const pwd = document.getElementById("password");
  if (pwd) {
    pwd.type = pwd.type === "password" ? "text" : "password";
  }
}

// Age calculation function
function calcularEdad(fechaNacimiento) {
  const fechaNac = new Date(fechaNacimiento);
  const hoy = new Date();
  let edad = hoy.getFullYear() - fechaNac.getFullYear();
  const mes = hoy.getMonth() - fechaNac.getMonth();
  
  if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
    edad--;
  }
  
  const edadField = document.getElementById('edad');
  if (edadField) {
    edadField.value = edad;
  }
  return edad;
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeComponents();
  
  // Initialize any existing form validation
  const forms = document.querySelectorAll('.needs-validation');
  forms.forEach(form => {
    form.addEventListener('submit', function(event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });
});

// Export functions for global access
window.togglePassword = togglePassword;
window.calcularEdad = calcularEdad;
window.imprimirDocumento = imprimirDocumento;
window.guardarDocumento = guardarDocumento;
window.exportarAWord = exportarAWord;