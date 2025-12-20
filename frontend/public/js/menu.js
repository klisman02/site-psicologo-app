const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');

toggle.addEventListener('click', () => {
  nav.classList.toggle('active');
});

/* Fecha ao clicar em um link */
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
  });
});

/* Fecha ao clicar fora */
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && !toggle.contains(e.target)) {
    nav.classList.remove('active');
  }
});

/* Reseta ao voltar para desktop */
window.addEventListener('resize', () => {
  if (window.innerWidth > 900) {
    nav.classList.remove('active');
  }
});
