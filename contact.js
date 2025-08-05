
// Funcionalidad del formulario de contacto
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    // Elementos del formulario
    const nombreInput = document.getElementById('nombre');
    const telefonoInput = document.getElementById('telefono');
    const emailInput = document.getElementById('email');
    const mensajeTextarea = document.getElementById('mensaje');
    const privacidadCheckbox = document.getElementById('privacidad');
    const submitBtn = contactForm.querySelector('.submit-btn');
    
    // Función para validar email
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    
    // Función para validar teléfono
    function isValidPhone(phone) {
      const phoneRegex = /^[+]?[\d\s\-\(\)]{9,}$/;
      return phoneRegex.test(phone.trim());
    }
    
    // Función para mostrar mensajes
    function showMessage(message, type) {
      // Remover mensajes anteriores
      const existingMessages = contactForm.querySelectorAll('.success-message, .error-message');
      existingMessages.forEach(msg => msg.remove());
      
      // Crear nuevo mensaje
      const messageDiv = document.createElement('div');
      messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
      messageDiv.textContent = message;
      messageDiv.style.display = 'block';
      
      // Insertar al inicio del formulario
      contactForm.insertBefore(messageDiv, contactForm.firstChild);
      
      // Auto-ocultar después de 5 segundos
      setTimeout(() => {
        messageDiv.style.display = 'none';
        messageDiv.remove();
      }, 5000);
    }
    
    // Función para validar campos en tiempo real
    function setupRealTimeValidation() {
      nombreInput.addEventListener('blur', function() {
        if (this.value.trim().length < 2) {
          this.style.borderColor = '#dc3545';
        } else {
          this.style.borderColor = '#c09a76';
        }
      });
      
      telefonoInput.addEventListener('blur', function() {
        if (!isValidPhone(this.value)) {
          this.style.borderColor = '#dc3545';
        } else {
          this.style.borderColor = '#c09a76';
        }
      });
      
      emailInput.addEventListener('blur', function() {
        if (!isValidEmail(this.value)) {
          this.style.borderColor = '#dc3545';
        } else {
          this.style.borderColor = '#c09a76';
        }
      });
      
      mensajeTextarea.addEventListener('blur', function() {
        if (this.value.trim().length < 10) {
          this.style.borderColor = '#dc3545';
        } else {
          this.style.borderColor = '#c09a76';
        }
      });
      
      // Resetear borde cuando el usuario empiece a escribir
      [nombreInput, telefonoInput, emailInput, mensajeTextarea].forEach(input => {
        input.addEventListener('focus', function() {
          this.style.borderColor = '#c09a76';
        });
      });
    }
    
    // Función para validar todo el formulario
    function validateForm() {
      let isValid = true;
      let errors = [];
      
      // Validar nombre
      if (nombreInput.value.trim().length < 2) {
        isValid = false;
        errors.push('El nombre debe tener al menos 2 caracteres');
        nombreInput.style.borderColor = '#dc3545';
      }
      
      // Validar teléfono
      if (!isValidPhone(telefonoInput.value)) {
        isValid = false;
        errors.push('Por favor, introduce un número de teléfono válido');
        telefonoInput.style.borderColor = '#dc3545';
      }
      
      // Validar email
      if (!isValidEmail(emailInput.value)) {
        isValid = false;
        errors.push('Por favor, introduce un email válido');
        emailInput.style.borderColor = '#dc3545';
      }
      
      // Validar mensaje
      if (mensajeTextarea.value.trim().length < 10) {
        isValid = false;
        errors.push('El mensaje debe tener al menos 10 caracteres');
        mensajeTextarea.style.borderColor = '#dc3545';
      }
      
      // Validar checkbox de privacidad
      if (!privacidadCheckbox.checked) {
        isValid = false;
        errors.push('Debes aceptar la política de privacidad');
      }
      
      if (!isValid) {
        showMessage(errors.join('. '), 'error');
      }
      
      return isValid;
    }
    
    // Función para simular envío del formulario
    function submitForm(formData) {
      return new Promise((resolve) => {
        // Simular tiempo de procesamiento
        setTimeout(() => {
          // Simular éxito (en producción aquí iría la llamada al servidor)
          console.log('Datos del formulario:', Object.fromEntries(formData));
          resolve(true);
        }, 1500);
      });
    }
    
    // Configurar validación en tiempo real
    setupRealTimeValidation();
    
    // Manejar envío del formulario
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // Validar formulario
      if (!validateForm()) {
        return;
      }
      
      // Deshabilitar botón y mostrar loading
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';
      submitBtn.style.opacity = '0.7';
      
      try {
        // Preparar datos del formulario
        const formData = new FormData(contactForm);
        
        // Enviar formulario
        const success = await submitForm(formData);
        
        if (success) {
          showMessage('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
          contactForm.reset();
          
          // Resetear estilos de los campos
          [nombreInput, telefonoInput, emailInput, mensajeTextarea].forEach(input => {
            input.style.borderColor = '#e5d5c8';
          });
        } else {
          showMessage('Error al enviar el mensaje. Por favor, inténtalo de nuevo.', 'error');
        }
      } catch (error) {
        console.error('Error:', error);
        showMessage('Error al enviar el mensaje. Por favor, inténtalo de nuevo.', 'error');
      } finally {
        // Restaurar botón
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        submitBtn.style.opacity = '1';
      }
    });
    
    // Añadir animaciones suaves al scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href')?.substring(1);
        if (targetId) {
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });
    
    // Añadir efecto de aparición gradual cuando la página se carga
    setTimeout(() => {
      document.body.style.opacity = '1';
      document.body.style.transition = 'opacity 0.5s ease-in-out';
    }, 100);
  }
});
// Configurar opacidad inicial
document.body.style.opacity = '0';
