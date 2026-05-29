// ─── Configuración ───
// Reemplazá esta URL por la de tu webhook real en N8N
const N8N_WEBHOOK_URL = 'https://TU_INSTANCIA.n8n.io/webhook/jornadas-fce';

// ─── Tabs del cronograma ───
function showDay(index) {
  document.querySelectorAll('.tab-panel').forEach((panel, i) => {
    panel.classList.toggle('visible', i === index);
  });
  document.querySelectorAll('.tab-btn').forEach((btn, i) => {
    btn.classList.toggle('active', i === index);
    btn.setAttribute('aria-selected', i === index ? 'true' : 'false');
  });
}

// ─── Nav activo según scroll ───
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('.site-nav-links a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));

  // ─── Formulario → N8N ───
  const form = document.getElementById('registration-form');
  const submitBtn = document.getElementById('submit-btn');
  const successMsg = document.getElementById('form-success');
  const errorMsg = document.getElementById('form-error');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validación básica
    const required = ['nombre', 'apellido', 'email', 'rol', 'dias'];
    let valid = true;
    for (const id of required) {
      const el = document.getElementById(id);
      if (!el.value.trim()) {
        el.focus();
        el.style.borderColor = '#E24B4A';
        valid = false;
        break;
      } else {
        el.style.borderColor = '';
      }
    }
    if (!valid) return;

    // Deshabilitar botón durante el envío
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
    successMsg.style.display = 'none';
    errorMsg.style.display = 'none';

    const payload = {
      nombre:      document.getElementById('nombre').value.trim(),
      apellido:    document.getElementById('apellido').value.trim(),
      email:       document.getElementById('email').value.trim(),
      rol:         document.getElementById('rol').value,
      dias:        document.getElementById('dias').value,
      institucion: document.getElementById('institucion').value.trim(),
      timestamp:   new Date().toISOString(),
      origen:      'landing-jornadas-fce-uncuyo-2025'
    };

    try {
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        successMsg.style.display = 'block';
        form.reset();
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        throw new Error('Response not ok: ' + res.status);
      }
    } catch (err) {
      console.error('Error al enviar formulario:', err);
      errorMsg.style.display = 'block';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar inscripción';
    }
  });

  // Limpiar estilos de error al escribir
  form.querySelectorAll('input, select').forEach(el => {
    el.addEventListener('input', () => { el.style.borderColor = ''; });
  });
});
