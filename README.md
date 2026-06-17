# AdminPanel Pro 🛡️

Panel administrativo empresarial desarrollado con HTML5, CSS3 y JavaScript puro.
Desplegado en **Render Static Site**.

## 🚀 Demo en vivo
> URL pública Render: `https://adminpanel-pro.onrender.com`

## 🔐 Credenciales de acceso (simuladas)
| Usuario   | Contraseña | Rol           |
|-----------|------------|---------------|
| admin     | admin123   | Super Admin   |
| operador  | oper2024   | Operador      |
| demo      | demo       | Solo Consulta |

## 📁 Estructura del proyecto
```
AdminPanel-Render/
├── index.html          # Pantalla de login
├── dashboard.html      # Panel principal
├── css/
│   └── styles.css      # Estilos completos
├── js/
│   └── app.js          # Lógica frontend
├── assets/
│   ├── images/
│   └── icons/
├── README.md
└── .gitignore
```

## 🧩 Módulos incluidos
- **Login** — Validación visual con JavaScript, credenciales simuladas
- **Dashboard** — Tarjetas estadísticas con animación, gráficos con Chart.js
- **Usuarios** — CRUD completo (agregar, editar, eliminar) con datos en array JS
- **Reportes** — 3 gráficos estadísticos (barras, líneas, dona/pie)
- **Productos** — Tabla con filtros por categoría y estado
- **Configuración** — Datos del sistema, perfil de usuario, toggles de preferencias

## 🛠️ Tecnologías
- HTML5 semántico
- CSS3 (variables CSS, flexbox, grid, animaciones)
- JavaScript ES6+ (sin frameworks)
- Chart.js v4 (CDN)
- Font Awesome 6 (CDN)
- Google Fonts — Inter

## ☁️ Despliegue en Render Static Site
1. Hacer fork/clonar este repositorio en GitHub
2. Crear cuenta en [render.com](https://render.com)
3. New → Static Site
4. Conectar repositorio GitHub
5. Configuración:
   - **Build Command**: *(vacío — proyecto estático)*
   - **Publish Directory**: `.` *(raíz del proyecto)*
6. Clic en **Create Static Site**
7. Render genera URL pública automáticamente

## 📦 Sin dependencias de build
Este proyecto no requiere Node.js, npm ni ningún bundler.
Se despliega directamente como archivos estáticos.

## 👨‍💻 Grupo 1 — Render Static Site
Proyecto académico universitario.
