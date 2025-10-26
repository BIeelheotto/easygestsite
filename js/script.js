document.addEventListener("DOMContentLoaded", () => {
    const yearElement = document.getElementById("year");
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    if (typeof GLightbox !== "undefined") {
        GLightbox({
            selector: ".glightbox",
            touchNavigation: true,
            loop: true,
            autoplayVideos: true,
        });
    }

    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modalTitle");
    const authForm = document.getElementById("authForm");
    const swapText = document.getElementById("swapText");
    const swapLink = document.getElementById("swapLink");
    const hamburger = document.querySelector(".hamburger");
    const nav = document.querySelector(".nav");
    const closeModalButton = document.querySelector(".close");

    let isLoginMode = true;

    function openModal(mode = "login", plan = "") {
        isLoginMode = (mode === "login");
        updateModalUI();
        if (plan) {
            // console.log(`Plano selecionado: ${plan}`);
        }
        if (modal) {
            modal.style.display = "grid";
        }
    }

    function closeModal() {
        if (modal) {
            modal.style.display = "none";
        }
    }

    function swapMode(event) {
        event.preventDefault();
        isLoginMode = !isLoginMode;
        updateModalUI();
    }

    function updateModalUI() {
        if (modalTitle && authForm && swapText && swapLink) {
            if (isLoginMode) {
                modalTitle.textContent = "Entrar";
                authForm.querySelector('button[type="submit"]').textContent = "Entrar";
                swapText.textContent = "Ainda não tem conta?";
                swapLink.textContent = "Crie agora";
            } else {
                modalTitle.textContent = "Criar conta grátis";
                authForm.querySelector('button[type="submit"]').textContent = "Criar conta";
                swapText.textContent = "Já tem uma conta?";
                swapLink.textContent = "Faça login";
            }
        }
    }

    function handleAuth(event) {
        event.preventDefault();
        const email = authForm.querySelector('input[type="email"]').value;
        alert(`${isLoginMode ? "Login" : "Cadastro"} com o e-mail: ${email}`);
        closeModal();
    }

    document.querySelectorAll("[data-modal-mode]").forEach(button => {
        button.addEventListener("click", () => {
            const mode = button.getAttribute("data-modal-mode");
            const plan = button.getAttribute("data-plan");
            openModal(mode, plan);
        });
    });

    if (hamburger) {
        hamburger.addEventListener("click", () => {
            nav.classList.toggle("open");
        });
    }

    if (closeModalButton) {
        closeModalButton.addEventListener("click", closeModal);
    }

    if (swapLink) {
        swapLink.addEventListener("click", swapMode);
    }

    if (authForm) {
        authForm.addEventListener("submit", handleAuth);
    }

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
});