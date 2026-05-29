// ─── Configuración ───
// Reemplazá esta URL por la de tu webhook real en N8N
const N8N_WEBHOOK_URL = 'https://TU_INSTANCIA.n8n.io/webhook/jornadas-fce';

// ─── Credencial ───
let _lastCredData = null;

function showCredential(data) {
  _lastCredData = data;
  if (!data._credId) {
    data._credId = 'FCE2026-' + Math.random().toString(36).substring(2, 9).toUpperCase();
  }

  document.getElementById('cred-name').textContent   = data.nombre + ' ' + data.apellido;
  document.getElementById('cred-doc').textContent    = data.tipo_doc + ' · ' + data.num_doc;
  document.getElementById('cred-nat').textContent    = 'Nacionalidad: ' + data.nacionalidad;
  document.getElementById('cred-role').textContent   = data.rol;
  document.getElementById('cred-dias').textContent   = data.dias;
  document.getElementById('cred-id').textContent     = 'ID: ' + data._credId;

  const qrBox = document.getElementById('credential-qr');
  qrBox.innerHTML = '';
  if (typeof QRCode !== 'undefined') {
    new QRCode(qrBox, {
      text: [
        'JORNADAS FCE-UNCUYO 2026',
        data.nombre + ' ' + data.apellido,
        data.tipo_doc + ': ' + data.num_doc,
        'Nac: ' + data.nacionalidad,
        data._credId
      ].join('\n'),
      width: 110,
      height: 110,
      colorDark: '#003366',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.M
    });
  }

  document.getElementById('credential-modal').classList.add('open');
}

function closeCredential() {
  document.getElementById('credential-modal').classList.remove('open');
}

function reopenCredential() {
  if (_lastCredData) showCredential(_lastCredData);
}

function printCredential() {
  window.print();
}

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

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validación básica
    const required = ['nombre', 'apellido', 'email', 'tipo_doc', 'num_doc', 'nacionalidad', 'rol', 'dias'];
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

    successMsg.style.display = 'none';
    errorMsg.style.display = 'none';

    const payload = {
      nombre:       document.getElementById('nombre').value.trim(),
      apellido:     document.getElementById('apellido').value.trim(),
      email:        document.getElementById('email').value.trim(),
      tipo_doc:     document.getElementById('tipo_doc').value,
      num_doc:      document.getElementById('num_doc').value.trim(),
      nacionalidad: document.getElementById('nacionalidad').value,
      rol:          document.getElementById('rol').value,
      dias:         document.getElementById('dias').value,
      institucion:  document.getElementById('institucion').value.trim(),
      timestamp:    new Date().toISOString(),
      origen:       'landing-jornadas-fce-uncuyo-2025'
    };

    // TODO: enviar payload al webhook cuando el registro esté listo
    // const res = await fetch(N8N_WEBHOOK_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });

    const credData = { ...payload };
    successMsg.style.display = 'block';
    form.reset();
    successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    showCredential(credData);
  });

  // Limpiar estilos de error al escribir
  form.querySelectorAll('input, select').forEach(el => {
    el.addEventListener('input', () => { el.style.borderColor = ''; });
  });
});
