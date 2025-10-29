// Variabel Elemen
const form = document.getElementById('regForm');
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const emailInput = document.getElementById('email');
const pwdInput = document.getElementById('password');
const toggle = document.getElementById('togglePwd');
const fillDemo = document.getElementById('fillDemo');
const strengthBar = document.getElementById('strengthBar');
const logNameBtn = document.getElementById('logNameBtn');

// Helper Functions
function validEmail(e) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

function scorePassword(p) {
  let score = 0;
  if (p.length >= 8) score++;
  if (/[A-Z]/.test(p)) score++;
  if (/[0-9]/.test(p)) score++;
  if (/[^A-Za-z0-9]/.test(p)) score++;
  if (p.length >= 12) score++;
  return score;
}

function updateStrength() {
  const s = scorePassword(pwdInput.value);
  const pct = (s / 5) * 100;
  strengthBar.style.width = pct + '%';
  pwdInput.setAttribute('aria-valuenow', s);
}

// Toggle Show/Hide Password
toggle.addEventListener('click', () => {
  const shown = pwdInput.type === 'text';
  pwdInput.type = shown ? 'password' : 'text';
  toggle.textContent = shown ? 'Tampilkan' : 'Sembunyikan';
  toggle.setAttribute('aria-pressed', (!shown).toString());
  pwdInput.focus();
});

// Demo Fill Button
fillDemo.addEventListener('click', () => {
  firstNameInput.value = 'Budi';
  lastNameInput.value = 'Santoso';
  emailInput.value = 'budi@example.com';
  pwdInput.value = 'Str0ng!Pass12';
  updateStrength();
});

// Inline Validation
emailInput.addEventListener('input', () => {
  const help = document.getElementById('emailHelp');
  if (emailInput.value.trim() === '') {
    help.textContent = '';
    return;
  }
  help.textContent = validEmail(emailInput.value)
    ? 'Email terlihat valid'
    : 'Format email tidak valid';
});

firstNameInput.addEventListener('input', () => {
  const help = document.getElementById('firstNameHelp');
  help.textContent =
    firstNameInput.value.trim().length >= 2 ? '' : 'Masukkan nama lengkap (min. 2 huruf)';
});

lastNameInput.addEventListener('input', () => {
  const help = document.getElementById('lastNameHelp');
  help.textContent =
    lastNameInput.value.trim().length >= 2 ? '' : 'Masukkan nama lengkap (min. 2 huruf)';
});

pwdInput.addEventListener('input', updateStrength);

// Form Submit Handler (Demo)
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const email = emailInput.value.trim();
  const pwd = pwdInput.value;

  if (firstName.length < 2) {
    alert('Nama Depan minimal 2 karakter');
    firstNameInput.focus();
    return;
  }

  if (lastName.length < 2) {
    alert('Nama Belakang minimal 2 karakter');
    lastNameInput.focus();
    return;
  }

  if (!validEmail(email)) {
    alert('Mohon masukkan email yang valid');
    emailInput.focus();
    return;
  }

  if (scorePassword(pwd) < 3) {
    alert('Password terlalu lemah — gunakan lebih banyak karakter, huruf besar, angka, dan simbol.');
    pwdInput.focus();
    return;
  }

  const payload = { firstName, lastName, email };
  console.log('User registered (demo):', payload);

  alert('Registrasi berhasil — ini demo (tidak benar-benar mengirim data)');
  form.reset();
  strengthBar.style.width = '0%';
});

// Accessibility (Keyboard Support)
toggle.addEventListener('keydown', (ev) => {
  if (ev.key === 'Enter' || ev.key === ' ') {
    ev.preventDefault();
    toggle.click();
  }
});

// Log Nama Lengkap Button
logNameBtn.addEventListener('click', () => {
  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();

  if (!firstName && !lastName) {
    console.log('Nama Lengkap : (belum diisi)');
    alert('Isi dulu Nama Depan dan Nama Belakang');
    return;
  }

  console.log(`Nama Lengkap : ${firstName} ${lastName}`);
  alert(`Nama Lengkap : ${firstName} ${lastName}`);
});
