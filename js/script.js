
// ----------  FUNÇÕES DO MENU HAMBURGER  ----------
const nav = document.querySelector('.nav');
const hamburger = document.querySelector('.hamburger');

function toggleMenu() {
  nav.classList.toggle('open');
}

// ----------  FUNÇÕES DO MODAL  ----------
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const authForm = document.getElementById('authForm');
const swapText = document.getElementById('swapText');
const swapLink = document.getElementById('swapLink');
let isLoginMode = true;

function openModal(mode, plan = '') {
  modal.style.display = 'grid';
  isLoginMode = mode === 'login';
  updateModalContent();
  if (plan) {
    console.log(`Plano selecionado: ${plan}`);
    // Aqui você pode adicionar um campo hidden no formulário com o plano, etc.
  }
}

function closeModal() {
  modal.style.display = 'none';
}

function swapMode(event) {
  event.preventDefault();
  isLoginMode = !isLoginMode;
  updateModalContent();
}

function updateModalContent() {
  if (isLoginMode) {
    modalTitle.textContent = 'Entrar';
    authForm.querySelector('button[type="submit"]').textContent = 'Entrar';
    swapText.textContent = 'Ainda não tem conta?';
    swapLink.textContent = 'Crie agora';
  } else {
    modalTitle.textContent = 'Crie sua conta grátis';
    authForm.querySelector('button[type="submit"]').textContent = 'Testar grátis';
    swapText.textContent = 'Já tem uma conta?';
    swapLink.textContent = 'Faça login';
  }
}

function handleAuth(event) {
  event.preventDefault();
  const email = authForm.querySelector('input[type="email"]').value;
  if (isLoginMode) {
    console.log(`Tentativa de login com o e-mail: ${email}`);
    // Lógica de login aqui
  } else {
    console.log(`Tentativa de cadastro com o e-mail: ${email}`);
    // Lógica de cadastro aqui
  }
  closeModal();
}

// Fecha o modal se o usuário clicar fora do conteúdo
window.onclick = function(event) {
  if (event.target == modal) {
    closeModal();
  }
}

// ----------  ATUALIZAÇÃO DINÂMICA DO ANO NO RODAPÉ  ----------
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
