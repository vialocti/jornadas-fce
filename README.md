# Jornadas Anuales de Ciencias Económicas 2025
## Facultad de Ciencias Económicas — UNCUYO · Mendoza, Argentina

Landing page estática para las Jornadas Anuales de Ciencias Económicas 2025.
**20, 21 y 22 de agosto de 2025 · Aula Magna FCE UNCUYO**

---

## Estructura del proyecto

```
jornadas-fce-2025/
├── index.html              # Página principal
├── assets/
│   ├── css/
│   │   └── main.css        # Estilos
│   ├── js/
│   │   └── main.js         # Lógica: tabs, nav, formulario → N8N
│   └── img/                # Carpeta para imágenes (logo, fotos, etc.)
└── README.md
```

---

## Configuración del formulario (N8N)

En `assets/js/main.js`, línea 2, reemplazá la URL del webhook:

```js
const N8N_WEBHOOK_URL = 'https://TU_INSTANCIA.n8n.io/webhook/jornadas-fce';
```

El formulario envía un `POST` con este JSON:

```json
{
  "nombre": "Ana",
  "apellido": "López",
  "email": "ana@ejemplo.com",
  "rol": "Estudiante de grado — FCE UNCUYO",
  "dias": "Los tres días (20, 21 y 22)",
  "institucion": "",
  "timestamp": "2025-08-01T10:00:00.000Z",
  "origen": "landing-jornadas-fce-uncuyo-2025"
}
```

---

## Despliegue en GitHub Pages

1. Crear repositorio en GitHub: `jornadas-fce-2025`
2. Subir todos los archivos (mantener la estructura de carpetas)
3. Ir a **Settings → Pages → Source: Deploy from branch → main → / (root)**
4. La URL pública será: `https://TU-USUARIO.github.io/jornadas-fce-2025`

### Comandos Git rápidos

```bash
git init
git add .
git commit -m "feat: landing inicial jornadas FCE UNCUYO 2025"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/jornadas-fce-2025.git
git push -u origin main
```

---

## Desarrollo local

Abrí en VS Code con la extensión **Live Server** (ritwickdey.liveserver):
- Clic derecho en `index.html` → **Open with Live Server**
- O presioná `Alt+L Alt+O`

---

## Personalización rápida

| Qué cambiar | Dónde |
|---|---|
| Fechas, lugar, horarios | `index.html` → sección `.hero` y `.cta-bar` |
| Paneles del cronograma | `index.html` → sección `#cronograma` |
| Datos de disertantes | `index.html` → sección `#disertantes` |
| Colores institucionales | `assets/css/main.css` → bloque `:root` |
| URL del webhook N8N | `assets/js/main.js` → línea 2 |
| Correo y teléfono | `index.html` → sección `#contacto` y `footer` |

---

## Tecnologías

- HTML5 semántico
- CSS3 con variables (sin frameworks)
- JavaScript vanilla (sin dependencias)
- Fuentes: [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) + [Source Serif 4](https://fonts.google.com/specimen/Source+Serif+4) vía Google Fonts
- Íconos: [Tabler Icons](https://tabler.io/icons) vía CDN
- Integración: [N8N](https://n8n.io) webhook → Excel / Google Sheets
