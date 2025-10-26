// small but polished client-side UX
const form = document.getElementById('regForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const pwdInput = document.getElementById('password');
const toggle = document.getElementById('togglePwd');
const fillDemo = document.getElementById('fillDemo');
const strengthBar = document.getElementById('strengthBar');

// helper validators
function validEmail(e){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

function scorePassword(p){
  let score = 0;
  if(p.length >= 8) score += 1;
  if(/[A-Z]/.test(p)) score += 1;
  if(/[0-9]/.test(p)) score += 1;
  if(/[^A-Za-z0-9]/.test(p)) score += 1;
  if(p.length >= 12) score += 1;
  return score; // 0..5
}

function updateStrength(){
  const s = scorePassword(pwdInput.value);
  const pct = (s/5)*100;
  strengthBar.style.width = pct + '%';
  pwdInput.setAttribute('aria-valuenow', s);
}

// show/hide password
toggle.addEventListener('click', ()=>{
  const shown = pwdInput.type === 'text';
  pwdInput.type = shown ? 'password' : 'text';
  toggle.textContent = shown ? 'Tampilkan' : 'Sembunyikan';
  toggle.setAttribute('aria-pressed', (!shown).toString());
  pwdInput.focus();
});

// demo fill
fillDemo.addEventListener('click', ()=>{
  nameInput.value = 'Budi Santoso';
  emailInput.value = 'budi@example.com';
  pwdInput.value = 'Str0ng!Pass12';
  updateStrength();
});

// inline validation
emailInput.addEventListener('input', ()=>{
  const help = document.getElementById('emailHelp');
  if(emailInput.value.trim()===''){ help.textContent = ''; return }
  help.textContent = validEmail(emailInput.value) ? 'Email terlihat valid' : 'Format email tidak valid';
});

nameInput.addEventListener('input', ()=>{
  const help = document.getElementById('nameHelp');
  help.textContent = nameInput.value.trim().length >= 2 ? '' : 'Masukkan nama lengkap (min. 2 huruf)';
});

pwdInput.addEventListener('input', ()=>{
  updateStrength();
});

// submit handler (demo)
form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const pwd = pwdInput.value;

  if(name.length < 2){ alert('Nama minimal 2 karakter'); nameInput.focus(); return }
  if(!validEmail(email)){ alert('Mohon masukkan email yang valid'); emailInput.focus(); return }
  if(scorePassword(pwd) < 3){ alert('Password terlalu lemah — gunakan lebih banyak karakter, huruf besar, angka, dan simbol.'); pwdInput.focus(); return }

  const payload = {name, email};
  console.log('User registered (demo):', payload);
  alert('Registrasi berhasil — ini demo (tidak benar-benar mengirim data)');
  form.reset();
  strengthBar.style.width = '0%';
});

// accessibility: allow Enter on Toggle
toggle.addEventListener('keydown', (ev)=>{
  if(ev.key === 'Enter' || ev.key === ' ') {
    ev.preventDefault();
    toggle.click();
  }
});
