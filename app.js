/* ══════════════════════════════════════════════════
   AdminPanel Pro — app.js
   Frontend-only: login simulation, navigation,
   data tables, charts, modals.
   ══════════════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────
   1. CREDENTIALS (simulated — no backend)
   ───────────────────────────────────── */
const VALID_USERS = [
  { username: 'admin',    password: 'admin123',  name: 'Administrador', role: 'Super Admin' },
  { username: 'operador', password: 'oper2024',  name: 'Carlos López',  role: 'Operador' },
  { username: 'demo',     password: 'demo',      name: 'Usuario Demo',  role: 'Consulta' },
];

/* ─────────────────────────────────────
   2. SAMPLE DATA
   ───────────────────────────────────── */
const usersData = [
  { id: 'USR-001', name: 'Ana Martínez',   email: 'a.martinez@empresa.com',  role: 'Administrador', status: 'Activo' },
  { id: 'USR-002', name: 'Carlos López',   email: 'c.lopez@empresa.com',     role: 'Operador',      status: 'Activo' },
  { id: 'USR-003', name: 'María González', email: 'm.gonzalez@empresa.com',  role: 'Supervisor',    status: 'Activo' },
  { id: 'USR-004', name: 'Juan Pérez',     email: 'j.perez@empresa.com',     role: 'Operador',      status: 'Inactivo' },
  { id: 'USR-005', name: 'Laura Sánchez',  email: 'l.sanchez@empresa.com',   role: 'Solo Consulta', status: 'Activo' },
  { id: 'USR-006', name: 'Roberto Díaz',   email: 'r.diaz@empresa.com',      role: 'Supervisor',    status: 'Suspendido' },
  { id: 'USR-007', name: 'Elena Torres',   email: 'e.torres@empresa.com',    role: 'Operador',      status: 'Activo' },
  { id: 'USR-008', name: 'Pedro Vargas',   email: 'p.vargas@empresa.com',    role: 'Solo Consulta', status: 'Inactivo' },
];

const productsData = [
  { code: 'PRD-001', name: 'Laptop HP 15"',         category: 'Electrónica',  stock: 25,  price: '$899.00',  status: 'Disponible' },
  { code: 'PRD-002', name: 'Monitor LG 27"',         category: 'Electrónica',  stock: 8,   price: '$320.00',  status: 'Bajo Stock' },
  { code: 'PRD-003', name: 'Teclado Mecánico',       category: 'Periféricos',  stock: 45,  price: '$75.00',   status: 'Disponible' },
  { code: 'PRD-004', name: 'Mouse Inalámbrico',      category: 'Periféricos',  stock: 0,   price: '$35.00',   status: 'Agotado' },
  { code: 'PRD-005', name: 'Licencia Office 365',    category: 'Software',     stock: 100, price: '$150.00',  status: 'Disponible' },
  { code: 'PRD-006', name: 'Silla Ergonómica Pro',   category: 'Mobiliario',   stock: 12,  price: '$285.00',  status: 'Disponible' },
  { code: 'PRD-007', name: 'Webcam 4K UltraVision',  category: 'Periféricos',  stock: 5,   price: '$129.00',  status: 'Bajo Stock' },
  { code: 'PRD-008', name: 'Disco SSD 1TB',          category: 'Electrónica',  stock: 0,   price: '$110.00',  status: 'Agotado' },
  { code: 'PRD-009', name: 'Antivirus Enterprise',   category: 'Software',     stock: 200, price: '$60.00',   status: 'Disponible' },
  { code: 'PRD-010', name: 'Escritorio Modular',     category: 'Mobiliario',   stock: 7,   price: '$420.00',  status: 'Disponible' },
];

/* ─────────────────────────────────────
   3. HELPERS
   ───────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function statusBadge(status) {
  const map = {
    'Activo':     'badge-green',
    'Inactivo':   'badge-gray',
    'Suspendido': 'badge-red',
    'Disponible': 'badge-green',
    'Bajo Stock': 'badge-yellow',
    'Agotado':    'badge-red',
  };
  return `<span class="badge ${map[status] || 'badge-gray'}">${status}</span>`;
}

function roleBadge(role) {
  const map = {
    'Administrador': 'badge-blue',
    'Supervisor':    'badge-blue',
    'Operador':      'badge-green',
    'Solo Consulta': 'badge-gray',
  };
  return `<span class="badge ${map[role] || 'badge-gray'}">${role}</span>`;
}

/* ─────────────────────────────────────
   4. LOGIN PAGE
   ───────────────────────────────────── */
function initLogin() {
  const form = $('#loginForm');
  if (!form) return;

  // Toggle password visibility
  const togglePass = $('#togglePass');
  const passInput  = $('#password');
  const eyeIcon    = $('#eyeIcon');
  if (togglePass) {
    togglePass.addEventListener('click', () => {
      const isText = passInput.type === 'text';
      passInput.type = isText ? 'password' : 'text';
      eyeIcon.className = isText ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash';
    });
  }

  // Form submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = $('#username').value.trim();
    const password = $('#password').value;
    let valid = true;

    // Clear previous errors
    $$('.form-group').forEach(g => g.classList.remove('error'));
    $$('.field-error').forEach(el => el.textContent = '');
    $('#globalError').classList.add('hidden');

    if (!username) {
      $('#group-user').classList.add('error');
      $('#err-user').textContent = 'El usuario es requerido.';
      valid = false;
    }
    if (!password) {
      $('#group-pass').classList.add('error');
      $('#err-pass').textContent = 'La contraseña es requerida.';
      valid = false;
    }
    if (!valid) return;

    // Show loader
    const btnText   = $('.btn-text');
    const btnLoader = $('.btn-loader');
    const btnIcon   = $('.btn-icon');
    btnText.textContent = 'Verificando...';
    btnLoader.classList.remove('hidden');
    btnIcon.classList.add('hidden');
    $('#btnLogin').disabled = true;

    setTimeout(() => {
      const user = VALID_USERS.find(u => u.username === username && u.password === password);

      if (user) {
        // Store session
        sessionStorage.setItem('ap_user', JSON.stringify(user));
        window.location.href = 'dashboard.html';
      } else {
        // Reset button
        btnText.textContent = 'Iniciar Sesión';
        btnLoader.classList.add('hidden');
        btnIcon.classList.remove('hidden');
        $('#btnLogin').disabled = false;

        // Show error
        $('#globalError').classList.remove('hidden');
        $('#globalErrorMsg').textContent = 'Usuario o contraseña incorrectos. Intenta con admin / admin123.';

        // Shake form
        form.style.animation = 'none';
        form.offsetHeight; // reflow
        form.style.animation = 'shake .4s ease';
        setTimeout(() => form.style.animation = '', 400);
      }
    }, 900);
  });

  // Add shake animation dynamically
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%,100%{ transform: translateX(0); }
      20%{ transform: translateX(-8px); }
      40%{ transform: translateX(8px); }
      60%{ transform: translateX(-6px); }
      80%{ transform: translateX(6px); }
    }
  `;
  document.head.appendChild(style);
}

/* ─────────────────────────────────────
   5. AUTH GUARD (dashboard)
   ───────────────────────────────────── */
function requireAuth() {
  const stored = sessionStorage.getItem('ap_user');
  if (!stored) {
    window.location.href = 'index.html';
    return null;
  }
  return JSON.parse(stored);
}

function logout() {
  sessionStorage.removeItem('ap_user');
  window.location.href = 'index.html';
}

/* ─────────────────────────────────────
   6. DASHBOARD
   ───────────────────────────────────── */
function initDashboard() {
  const user = requireAuth();
  if (!user) return;

  // Set user info
  $$('#sidebarUserName, #topbarUserName').forEach(el => {
    if (el) el.textContent = user.username;
  });
  $('#sidebarUserName') && ($('#sidebarUserName').textContent = user.name);

  // Date
  updateDate();
  setInterval(updateDate, 60000);

  // Sidebar toggle (mobile)
  const sidebar = $('#sidebar');
  const overlay = $('.sidebar-overlay');
  const menuToggle = $('#menuToggle');
  const sidebarClose = $('#sidebarClose');

  menuToggle?.addEventListener('click', () => {
    sidebar.classList.add('open');
    overlay.classList.add('open');
  });
  sidebarClose?.addEventListener('click', closeSidebar);
  overlay?.addEventListener('click', closeSidebar);
  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
  }

  // Navigation
  $$('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const mod = link.dataset.module;
      switchModule(mod, link);
      closeSidebar();
    });
  });

  // Topbar dropdowns
  setupDropdown('#notifBtn', '#notifDropdown');
  setupDropdown('#profileBtn', '#profileDropdown');

  // Notifications clear
  $('#notifClear')?.addEventListener('click', () => {
    $$('.notif-item.unread').forEach(el => el.classList.remove('unread'));
    $('.notif-dot')?.remove();
  });

  // Logout buttons
  $$('#btnLogout, #profileLogout').forEach(btn => {
    btn?.addEventListener('click', (e) => { e.preventDefault(); logout(); });
  });

  // Profile settings links in dropdown
  $$('.profile-item[data-module]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const mod = link.dataset.module;
      const navLink = $(`.nav-link[data-module="${mod}"]`);
      if (navLink) switchModule(mod, navLink);
      closeAllDropdowns();
    });
  });

  // Load home module first
  initHomeModule();
  loadUsersTable();
  loadProductsTable();

  // Save profile settings
  $('#saveProfile')?.addEventListener('click', () => {
    const btn = $('#saveProfile');
    btn.innerHTML = '<i class="fa-solid fa-check"></i> Guardado';
    setTimeout(() => {
      btn.innerHTML = '<i class="fa-solid fa-floppy-disk"></i> Guardar cambios';
    }, 2000);
  });

  // Dark mode toggle
  $('#darkModeToggle')?.addEventListener('change', (e) => {
    document.body.classList.toggle('dark', e.target.checked);
  });
}

/* ─ Date ─ */
function updateDate() {
  const el = $('#topbarDate');
  if (!el) return;
  const now = new Date();
  const opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  el.textContent = now.toLocaleDateString('es-ES', opts);
}

/* ─ Dropdown helper ─ */
function setupDropdown(triggerSel, dropdownSel) {
  const trigger  = $(triggerSel);
  const dropdown = $(dropdownSel);
  if (!trigger || !dropdown) return;

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isHidden = dropdown.classList.contains('hidden');
    closeAllDropdowns();
    if (isHidden) dropdown.classList.remove('hidden');
  });
}
function closeAllDropdowns() {
  $$('#notifDropdown, #profileDropdown').forEach(el => el?.classList.add('hidden'));
}
document.addEventListener('click', closeAllDropdowns);

/* ─ Module switching ─ */
function switchModule(mod, activeLink) {
  // Update nav
  $$('.nav-link').forEach(l => l.classList.remove('active'));
  activeLink.classList.add('active');

  // Show module
  $$('.module').forEach(m => m.classList.add('hidden'));
  const target = $(`#mod-${mod}`);
  if (target) target.classList.remove('hidden');

  // Breadcrumb
  const labels = { home: 'Inicio', users: 'Usuarios', reports: 'Reportes', products: 'Productos', settings: 'Configuración' };
  const bc = $('#breadcrumbModule');
  if (bc) bc.textContent = labels[mod] || mod;

  // Init charts on demand
  if (mod === 'home') initHomeCharts();
  if (mod === 'reports') initReportCharts();
}

/* ─────────────────────────────────────
   7. STAT COUNTER ANIMATION
   ───────────────────────────────────── */
function animateCounters() {
  $$('[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target);
    const prefix = el.dataset.prefix || '';
    const duration = 1200;
    const step = 30;
    const increment = target / (duration / step);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = prefix + Math.floor(current).toLocaleString('es');
    }, step);
  });
}

/* ─────────────────────────────────────
   8. HOME MODULE
   ───────────────────────────────────── */
let homeChartsInit = false;
function initHomeModule() {
  animateCounters();
  initHomeCharts();
}

function initHomeCharts() {
  if (homeChartsInit) return;
  homeChartsInit = true;

  // Sales bar chart
  const salesCtx = $('#salesChart');
  if (salesCtx) {
    new Chart(salesCtx, {
      type: 'bar',
      data: {
        labels: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        datasets: [{
          label: 'Ventas ($)',
          data: [9200,10500,8800,12000,11500,15800,13200,14600,16000,15200,17800,19400],
          backgroundColor: 'rgba(59,130,246,.7)',
          borderColor: '#3B82F6',
          borderWidth: 1,
          borderRadius: 6,
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,.04)' }, ticks: { callback: v => '$'+v.toLocaleString() } },
          x: { grid: { display: false } }
        }
      }
    });
  }

  // Roles doughnut
  const rolesCtx = $('#rolesChart');
  if (rolesCtx) {
    new Chart(rolesCtx, {
      type: 'doughnut',
      data: {
        labels: ['Administradores','Operadores','Supervisores','Consulta'],
        datasets: [{
          data: [45, 380, 150, 675],
          backgroundColor: ['#3B82F6','#10B981','#F59E0B','#8B5CF6'],
          borderWidth: 2,
          borderColor: '#fff',
        }]
      },
      options: {
        responsive: true,
        cutout: '65%',
        plugins: {
          legend: { position: 'bottom', labels: { font: { size: 11 }, padding: 10 } }
        }
      }
    });
  }
}

/* ─────────────────────────────────────
   9. REPORT CHARTS
   ───────────────────────────────────── */
let reportChartsInit = false;
function initReportCharts() {
  if (reportChartsInit) return;
  reportChartsInit = true;

  // Income vs Expense
  const ieCtx = $('#incomeExpenseChart');
  if (ieCtx) {
    new Chart(ieCtx, {
      type: 'line',
      data: {
        labels: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        datasets: [
          {
            label: 'Ingresos',
            data: [12000,14500,13200,16000,15500,18800,17200,19600,21000,20200,22800,24400],
            borderColor: '#10B981',
            backgroundColor: 'rgba(16,185,129,.08)',
            tension: 0.4,
            fill: true,
            pointRadius: 4,
          },
          {
            label: 'Gastos',
            data: [8000,9000,9500,10500,10000,12000,11500,13000,13500,13000,14000,15000],
            borderColor: '#EF4444',
            backgroundColor: 'rgba(239,68,68,.06)',
            tension: 0.4,
            fill: true,
            pointRadius: 4,
          }
        ]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'top' } },
        scales: {
          y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,.04)' }, ticks: { callback: v => '$'+v.toLocaleString() } },
          x: { grid: { display: false } }
        }
      }
    });
  }

  // Category doughnut
  const catCtx = $('#categoryChart');
  if (catCtx) {
    new Chart(catCtx, {
      type: 'pie',
      data: {
        labels: ['Electrónica','Periféricos','Software','Mobiliario'],
        datasets: [{
          data: [42, 28, 18, 12],
          backgroundColor: ['#3B82F6','#10B981','#F59E0B','#8B5CF6'],
          borderWidth: 2,
          borderColor: '#fff',
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom', labels: { font: { size: 11 }, padding: 8 } } }
      }
    });
  }

  // New users bar
  const nuCtx = $('#newUsersChart');
  if (nuCtx) {
    new Chart(nuCtx, {
      type: 'bar',
      data: {
        labels: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        datasets: [{
          label: 'Nuevos usuarios',
          data: [65,80,72,95,88,142,110,130,155,140,168,185],
          backgroundColor: 'rgba(139,92,246,.7)',
          borderColor: '#8B5CF6',
          borderWidth: 1,
          borderRadius: 5,
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,.04)' } },
          x: { grid: { display: false } }
        }
      }
    });
  }
}

/* ─────────────────────────────────────
   10. USERS TABLE
   ───────────────────────────────────── */
let usersArr = [...usersData];
let editingUserId = null;
let deletingUserId = null;
let nextId = usersArr.length + 1;

function loadUsersTable(filter = '') {
  const tbody = $('#usersBody');
  if (!tbody) return;

  const filtered = usersArr.filter(u =>
    u.name.toLowerCase().includes(filter.toLowerCase()) ||
    u.email.toLowerCase().includes(filter.toLowerCase()) ||
    u.role.toLowerCase().includes(filter.toLowerCase())
  );

  tbody.innerHTML = filtered.map(u => `
    <tr>
      <td><code style="color:var(--accent);font-size:.78rem">${u.id}</code></td>
      <td>
        <div style="display:flex;align-items:center;gap:8px">
          <div style="width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,#3B82F6,#8B5CF6);display:flex;align-items:center;justify-content:center;color:white;font-size:.72rem;font-weight:700;flex-shrink:0">${u.name.charAt(0)}</div>
          <span style="font-weight:500">${u.name}</span>
        </div>
      </td>
      <td style="color:var(--text2)">${u.email}</td>
      <td>${roleBadge(u.role)}</td>
      <td>${statusBadge(u.status)}</td>
      <td>
        <div class="action-btns">
          <button class="btn-action btn-edit" onclick="openEditUser('${u.id}')" title="Editar"><i class="fa-solid fa-pen"></i></button>
          <button class="btn-action btn-delete" onclick="openDeleteUser('${u.id}')" title="Eliminar"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('') || `<tr><td colspan="6" style="text-align:center;color:var(--text2);padding:30px">No se encontraron usuarios</td></tr>`;

  const count = $('#userCount');
  if (count) count.textContent = `Mostrando ${filtered.length} de ${usersArr.length} usuarios`;
}

// Search
document.addEventListener('input', (e) => {
  if (e.target.id === 'userSearch') loadUsersTable(e.target.value);
  if (e.target.id === 'productSearch') filterProducts();
});
document.addEventListener('change', (e) => {
  if (e.target.id === 'productCatFilter' || e.target.id === 'productStatusFilter') filterProducts();
});

// Add user button
document.addEventListener('click', (e) => {
  if (e.target.closest('#btnAddUser')) openAddUser();
  if (e.target.closest('#closeUserModal') || e.target.closest('#cancelUserModal')) closeUserModal();
  if (e.target.closest('#saveUserModal')) saveUser();
  if (e.target.closest('#closeDeleteModal') || e.target.closest('#cancelDelete')) closeDeleteModal();
  if (e.target.closest('#confirmDelete')) confirmDeleteUser();
});

function openAddUser() {
  editingUserId = null;
  $('#modalUserTitle').textContent = 'Agregar Usuario';
  $('#mUserName').value = '';
  $('#mUserEmail').value = '';
  $('#mUserRole').value = 'Operador';
  $('#mUserStatus').value = 'Activo';
  $('#userModal').classList.remove('hidden');
}

window.openEditUser = function(id) {
  const u = usersArr.find(x => x.id === id);
  if (!u) return;
  editingUserId = id;
  $('#modalUserTitle').textContent = 'Editar Usuario';
  $('#mUserName').value  = u.name;
  $('#mUserEmail').value = u.email;
  $('#mUserRole').value  = u.role;
  $('#mUserStatus').value = u.status;
  $('#userModal').classList.remove('hidden');
};

function closeUserModal() {
  $('#userModal')?.classList.add('hidden');
}

function saveUser() {
  const name   = $('#mUserName').value.trim();
  const email  = $('#mUserEmail').value.trim();
  const role   = $('#mUserRole').value;
  const status = $('#mUserStatus').value;

  if (!name || !email) { alert('Por favor completa todos los campos.'); return; }

  if (editingUserId) {
    const idx = usersArr.findIndex(u => u.id === editingUserId);
    if (idx > -1) { usersArr[idx] = { ...usersArr[idx], name, email, role, status }; }
  } else {
    const id = `USR-${String(nextId++).padStart(3,'0')}`;
    usersArr.push({ id, name, email, role, status });
  }
  closeUserModal();
  loadUsersTable($('#userSearch')?.value || '');
}

window.openDeleteUser = function(id) {
  deletingUserId = id;
  const u = usersArr.find(x => x.id === id);
  if (u) $('#deleteUserName').textContent = u.name;
  $('#deleteModal').classList.remove('hidden');
};

function closeDeleteModal() {
  $('#deleteModal')?.classList.add('hidden');
  deletingUserId = null;
}

function confirmDeleteUser() {
  if (!deletingUserId) return;
  usersArr = usersArr.filter(u => u.id !== deletingUserId);
  closeDeleteModal();
  loadUsersTable($('#userSearch')?.value || '');
}

/* ─────────────────────────────────────
   11. PRODUCTS TABLE
   ───────────────────────────────────── */
let productsArr = [...productsData];

function loadProductsTable(filtered) {
  const tbody = $('#productsBody');
  if (!tbody) return;

  const list = filtered || productsArr;
  tbody.innerHTML = list.map(p => `
    <tr>
      <td><code style="color:var(--accent);font-size:.78rem">${p.code}</code></td>
      <td style="font-weight:500">${p.name}</td>
      <td><span class="badge badge-blue">${p.category}</span></td>
      <td>
        <span style="font-weight:600;color:${p.stock === 0 ? 'var(--red)' : p.stock < 10 ? 'var(--orange)' : 'var(--green)'}">${p.stock}</span>
      </td>
      <td style="font-weight:600">${p.price}</td>
      <td>${statusBadge(p.status)}</td>
      <td>
        <div class="action-btns">
          <button class="btn-action btn-edit" title="Editar"><i class="fa-solid fa-pen"></i></button>
          <button class="btn-action btn-delete" title="Eliminar"><i class="fa-solid fa-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('') || `<tr><td colspan="7" style="text-align:center;color:var(--text2);padding:30px">No se encontraron productos</td></tr>`;

  const count = $('#productCount');
  if (count) count.textContent = `Mostrando ${list.length} de ${productsArr.length} productos`;
}

function filterProducts() {
  const search = ($('#productSearch')?.value || '').toLowerCase();
  const cat    = $('#productCatFilter')?.value || '';
  const status = $('#productStatusFilter')?.value || '';

  const filtered = productsArr.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search) || p.code.toLowerCase().includes(search);
    const matchCat    = !cat    || p.category === cat;
    const matchStatus = !status || p.status   === status;
    return matchSearch && matchCat && matchStatus;
  });

  loadProductsTable(filtered);
}

/* ─────────────────────────────────────
   12. INIT
   ───────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Determine which page we're on
  if (document.getElementById('loginForm')) {
    initLogin();
  } else if (document.getElementById('sidebar')) {
    initDashboard();
  }
});
