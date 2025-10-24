// --- Funções do Menu ---
function toggleMenu() {
  const nav = document.querySelector('.nav');
  nav.classList.toggle('open');
}

// --- Funções do Modal ---
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const authForm = document.getElementById('authForm');
const swapText = document.getElementById('swapText');
const swapLink = document.getElementById('swapLink');
let isLoginMode = true;

function openModal(mode = 'login', plan = '') {
  isLoginMode = (mode === 'login');
  updateModalUI();
  if (plan) {
    // Você pode usar essa informação para pré-selecionar um plano no formulário de cadastro
    console.log(`Plano selecionado: ${plan}`);
  }
  if (modal) {
    modal.style.display = 'grid';
  }
}

function closeModal() {
  if (modal) {
    modal.style.display = 'none';
  }
}

function swapMode(event) {
  event.preventDefault();
  isLoginMode = !isLoginMode;
  updateModalUI();
}

function updateModalUI() {
  if (!modalTitle || !authForm || !swapText || !swapLink) return;

  if (isLoginMode) {
    modalTitle.textContent = 'Entrar';
    authForm.querySelector('button[type="submit"]').textContent = 'Entrar';
    swapText.textContent = 'Ainda não tem conta?';
    swapLink.textContent = 'Crie agora';
  } else {
    modalTitle.textContent = 'Criar conta grátis';
    authForm.querySelector('button[type="submit"]').textContent = 'Criar conta';
    swapText.textContent = 'Já tem uma conta?';
    swapLink.textContent = 'Faça login';
  }
}

function handleAuth(event) {
  event.preventDefault();
  const email = authForm.querySelector('input[type="email"]').value;
  alert(`${isLoginMode ? 'Login' : 'Cadastro'} com o e-mail: ${email}`);
  closeModal();
}

// --- Outras Funções ---

// Atualiza o ano no rodapé e inicializa a galeria
document.addEventListener('DOMContentLoaded', () => {
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Inicializa a galeria de imagens
  if (typeof GLightbox !== 'undefined') {
    const lightbox = GLightbox({
      selector: '.glightbox',
      touchNavigation: true,
      loop: true,
      autoplayVideos: true
    });
  }
});

// Fecha o modal se o usuário clicar fora dele
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    closeModal();
  }
});